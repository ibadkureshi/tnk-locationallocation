import pmedian.functions.p_median.data as d
import pmedian.functions.p_median.grid as g
import pmedian.functions.p_median.distance as dist
from pmedian.functions.p_median.Population import Population
from progress.bar import Bar
import openrouteservice
import numpy


def import_data(csv_filepath, latitude_col, longitude_col):
    contents = d.file_read(csv_filepath)
    data = d.parse_csv(contents)
    df = d.create_df(data)
    latitudes, longitudes = d.get_coordinates(df, latitude_col, longitude_col)
    coordinates = tuple(zip(latitudes, longitudes))
    return coordinates


def get_grid(coordinates, box_sw, box_ne, demand_out_of_bounds,
             supply_coordinates=None, h_size=None, v_size=None):
    extremes = g.get_extremes(box_sw, box_ne)
    new_coordinates, treated = g.treat_oob(coordinates, extremes, demand_out_of_bounds)

    h_size, v_size = g.size(h_size, v_size, extremes)
    print("Grid size of {0} by {1}".format(h_size, v_size))
    grid = g.create(new_coordinates, h_size, v_size, extremes)
    return grid, treated


def get_distance_matrix(grid, supply_coordinates=None, cost_metric="duration", only_supply_locations=False):
    # Change name of metric for ORS to be happy
    if cost_metric == "time":
        cost_metric = "duration"
    # Need to reverse order of supply coordinates for distances to be calculated
    if supply_coordinates:
        supply_coordinates = [(t[1], t[0]) for t in supply_coordinates]
    # Initialize
    client = openrouteservice.Client(base_url='http://kubernetes.ibadkureshi.com:8080/ors')
    print("kubernetes")
    d_length = len(grid) * len(grid[0])
    grid_box, grid_centre = dist.bound_box(grid)
    # Get basemap and check which grid-squares lie on water
    bm = dist.basemap(grid_box)
    dist.check_land(grid, bm)
    # Initiate distance matrix
    dist_mx = dist.initiate_matrix(d_length, supply_coordinates)
    # Map distance-matrix locations to grid/supply_coordinates
    d2g = dist.dist_2_grid(grid)
    d2s = dist.dist_2_supply(supply_coordinates, grid) if supply_coordinates else None
    # Get distances
    search_radius = round(dist.radius(grid[0][0])) * 1.05  # Distance between box-centre and furthest box-corner + 5%
    # Progress bar
    if only_supply_locations:
        max_bar = d_length * len(supply_coordinates)
    else:
        max_bar = d_length * (d_length + len(supply_coordinates)) if supply_coordinates else d_length * d_length
    bar = Bar('Calculating Distances', max=max_bar)
    # Only choose between supply locations
    if only_supply_locations:
        for x in range(d_length):
            box_x = grid[d2g[x][0]][d2g[x][1]]
            for y in range(len(supply_coordinates)):
                point_y = supply_coordinates[d2s[d_length + y]]
                dist_mx[d_length + y][x] = dist.distance(box_x, point_y, x, y, client,
                                                         search_radius, grid_centre, cost_metric)
                bar.next()
    # Choose from supply locations (if any) and grid
    else:
        for x in range(d_length):
            box_x = grid[d2g[x][0]][d2g[x][1]]
            # Distance to other squares
            for y in range(d_length):
                box_y = grid[d2g[y][0]][d2g[y][1]]
                dist_mx[y][x] = dist.distance(box_x, box_y, x, y, client,
                                              search_radius, grid_centre, cost_metric)
                bar.next()
            # Distance to supply_locations, if any
            if supply_coordinates:
                for y in range(len(supply_coordinates)):
                    point_y = supply_coordinates[d2s[d_length + y]]
                    dist_mx[d_length + y][x] = dist.distance(box_x, point_y, x, y, client,
                                                             search_radius, grid_centre, cost_metric)
                    bar.next()
        bar.finish()

    dist_mx = dist.fill_other_diagonal(dist_mx)

    return dist_mx


def clean(grid, distances):
    """
    Given a list of boxes and the distances between each pair, returns a new list of boxes and distances, by removing
    the boxes that are not on land, as well as the -empty- distances referring to these boxes.

    Args:
        grid: A m*n list of boxes
        distances: A (m*n)*(m*n) NumPy array

    Returns: A 1-D list of boxes and a (m*n - boxes not on land) * (m*n - boxes not on land) NumPy array.

    """
    g2d = dist.grid_2_dist(grid)
    new_grid = []
    ng2g = {}

    for y, row in enumerate(grid[:len(grid)]):
        for x, sq in enumerate(row):
            if sq.on_land["square"]:
                new_grid.append(sq)
                ng2g[len(new_grid) - 1] = (y, x)

    number_of_dropped_squares = len(grid) * len(grid[0]) - len(new_grid)

    new_distances = numpy.empty((distances.shape[0] - number_of_dropped_squares, len(new_grid)))

    for i in range(len(new_grid)):
        for j in range(len(new_grid)):
            old_grid = (ng2g[i], ng2g[j])
            old_distance_rows = g2d[old_grid[0]], g2d[old_grid[1]]
            old_distance = distances[old_distance_rows[0]][old_distance_rows[1]]
            new_distances[i][j] = old_distance

    for i in range(len(new_grid), new_distances.shape[0]):
        for j in range(len(new_grid)):
            old_grid = ng2g[j]
            old_distance_column = g2d[old_grid]
            old_distance = distances[i + number_of_dropped_squares][old_distance_column]
            new_distances[i][j] = old_distance

    return new_grid, new_distances


def run_algorithm(grid, distances, p_value):
    # Initialize
    pop = Population(p_value, grid, distances)
    pop.initialize()
    a_best = pop.costs[pop.best].copy()
    a_worst = pop.costs[pop.worst].copy()
    best_imp, worst_imp = None, None
    print("\nP-Value {0}\nStarting cost {1}".format(p_value, round(a_best, 1)))

    # Run algorithm
    counter = 0  # Print record counter
    while pop.stop > 0:  # While less than pop.stop iterations since last time best solution improved
        parents = pop.get_parents()  # Get parents
        child = pop.get_child(parents)  # Using them, get child

        pop.update_candidates(child)  # Update population
        best_imp = str(round(100 * (pop.costs[pop.best] - a_best) / a_best, 1)) + "%"

    # Print record
    print("Final cost {0}. Improved by {1}.".format(round(pop.costs[pop.best], 1), best_imp, flush=True))

    # Return final population
    return pop


def solution_coordinates(final_population, grid):
    result = []
    for c in final_population.best:
        result.append(grid[c].centre)
    return result


def solution_demand(final_population, grid, distances, p_value):
    sol_demand = [0] * p_value

    c = sorted(final_population.best)
    for i, sq in enumerate(grid):
        j = distances[c, i].argmin()
        sol_demand[j] += sq.demand
    sol_demand_weights = [round(demand/(sum(sol_demand)), 2) for demand in sol_demand]

    return sol_demand_weights


def solution_stats(final_population, grid, distances):
    c = sorted(final_population.best)
    metrics = []
    weights = []
    for i, sq in enumerate(grid):
        if sq.demand:  # Make sure that only grid-squares with patients are counted towards average distnaces etc.
            weights.append(sq.demand)
            metric = distances[c, i].min()
            metrics.append(metric)

    max_metric = max(metrics)

    average_metric = 0
    for w, m in zip(weights, metrics):
        average_metric += (w * m) / sum(weights)

    return round(max_metric), round(average_metric)


