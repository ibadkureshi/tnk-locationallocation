import numpy
from geopy.distance import geodesic
from openrouteservice.directions import directions
from mpl_toolkits.basemap import Basemap
from time import sleep


def initiate_matrix(d_length, s_coordinates):
    if s_coordinates:
        return numpy.zeros((d_length + len(s_coordinates), d_length))
    else:
        return numpy.zeros((d_length, d_length))


def distance(grid_sq_x, grid_sq_y, x, y, client, search_radius, grid_centre, distance_metric):
    """
    Retrieve the distance between two MapBox objects, in seconds, given the fastest car-driving route.

    Args:
        grid_sq_x: MapBox object.
        grid_sq_y: MapBox object.
        x: The row-position of the first MapBox in the distance matrix.
        y: The row-position of the second MapBox in the distance matrix.
        client: The openroutservice client.
        search_radius: The radius to use when searching for the distance IF the coordinate used is the MapBox centre.
        grid_centre: The geographic centre of the bounding-box (extreme S, E, W, N, points in the data).
        distance_metric:

    Returns:

    """
    if type(grid_sq_y) is not tuple:
        if x > y:  # Only want to fill lower diagonal between demand points
            return -1
        elif not grid_sq_x.on_land["square"] or not grid_sq_y.on_land["square"]:  # Box not on land
            return -1
        elif x == y:  # Same boxes
            return 0
    else:
        if not grid_sq_x.on_land["square"]:
            return -1
    try:  # If centre not on land, use a corner that is on land
        coordinates, radii = coordinates_and_radii(grid_sq_x, grid_sq_y, grid_centre, search_radius)
        # Sometimes you get same corners for different (adjacent) boxes (happens if centre is not on land).
        # These are adjacent edge boxes, whose centre is not on land and for both a corner is used when
        # calculating distances. Moreover, for at least one of them (at least) one corner is also not on land.
        # In these cases both boxes end up using the same coordinate (i.e. corner) to calculate distances and
        # the distance between the two is zero (actually openrouteservice returns a "distance" error) and in
        # addition, the distance between the boxes and all other boxes is the same for both boxes. This essentially
        # implies that as far as the algorithm is concerned, the two boxes are merged in one. However, since one of
        # the boxes has both each centre and at least a corner off-land, probably implies that most of its (little)
        # land is very close to the other box.
        if (round(coordinates[0][0], 6), round(coordinates[0][1], 6)) \
                == (round(coordinates[1][0], 6), round(coordinates[1][1], 6)):
            return 0
        routes = directions(client, coordinates, radiuses=radii, geometry=False)
        # Choose either duration or distance
        return float(routes["routes"][0]["summary"][distance_metric])
    except Exception as e:  # Failed to get distance
        print(f"Failed to retrieve distance from ORS server between coordinates: {coordinates}.")
        print("Waiting 5 seconds.")
        sleep(5)
        try:
            routes = directions(client, coordinates, radiuses=radii, geometry=False)
            print("Success")
            return float(routes["routes"][0]["summary"][distance_metric])
        except:
            try:
                print(f"Failed to retrieve distance from ORS server between coordinates: {coordinates}.")
                print("Waiting 10 seconds.")
                sleep(10)
                routes = directions(client, coordinates, radiuses=radii, geometry=False)
                print("Success")
                return float(routes["routes"][0]["summary"][distance_metric])
            except:
                print(f"Failed to retrieve distance from ORS server between coordinates: {coordinates}. Can't create distance matrix. Aborting.Are all needed maps loaded?")
                raise

def corner_to_use(grid_sq, grid_centre):
    """
    Chooses which corner (that lies on land) to use for distance calculation, when the centre point of the MapBox object
     is itself not on land. The choice depend on the quarter of the bounding-box that the MapBox object lies in, in an
     effort to choose corner points further away from the bounding-box's centre and hence result in "larger" reported
      distances (on average). This is done since solutions are more likely to be nearer the centre than the edges of the
      bounding box, and hence this might have a minor effect in "pulling" these solutions outwards.
    Args:
        grid_sq: MapBox object
        grid_centre: The geographic centre of the bounding-box (extreme S, E, W, N, points in the data).

    Returns: The coordinates to use.

    """
    if grid_centre[0] > grid_sq.extremes["W"] and grid_centre[1] > grid_sq.extremes["S"]:
        for corner in ["SW", "NW", "SE", "NE"]:
            if grid_sq.on_land[corner]:
                return grid_sq.extremes[corner[1]], grid_sq.extremes[corner[0]]
    elif grid_centre[0] > grid_sq.extremes["W"]:
        for corner in ["NW", "SW", "NE", "SE"]:
            if grid_sq.on_land[corner]:
                return grid_sq.extremes[corner[1]], grid_sq.extremes[corner[0]]
    elif grid_centre[1] > grid_sq.extremes["S"]:
        for corner in ["SE", "NE", "SW", "NW"]:
            if grid_sq.on_land[corner]:
                return grid_sq.extremes[corner[1]], grid_sq.extremes[corner[0]]
    else:
        for corner in ["NE", "SE", "NW", "SW"]:
            if grid_sq.on_land[corner]:
                return grid_sq.extremes[corner[1]], grid_sq.extremes[corner[0]]


def coordinates_and_radii(grid_sq_x, grid_sq_y, grid_centre, centre_radius):
    """
    Choose which coordinates and which radius to use for a MapBox object when searching for the distance of it with
    another such object.

    Args:
        grid_sq_x: MapBox object
        grid_sq_y: MapBox object
        grid_centre: The geographic centre of the bounding-box (extreme S, E, W, N, points in the data).
        centre_radius: The radius to use, when the centre point is chosen.

    Returns: The coordinate points and radii to use.

    """
    coordinates = []
    radii = []
    if type(grid_sq_y) is tuple:
        squares = [grid_sq_x]
    else:
        squares = [grid_sq_x, grid_sq_y]
    for sq in squares:
        if sq.on_land["c"]:
            coordinates.append(sq.centre)
            radii.append(centre_radius)
        else:
            coordinates.append(tuple(corner_to_use(sq, grid_centre)))
            radii.append(centre_radius * 0.3)
    if type(grid_sq_y) is tuple:
        coordinates.append(grid_sq_y)
        radii.append(2500)

    return tuple(coordinates), radii


def bound_box(grid):
    """
    Compute the bounding-box of the data (extreme S, E, W, N, points in the data)

    Args:
        grid: A list of lists of GridBox objects

    Returns: A BaseMap object

    """
    bbox = (grid[0][0].extremes["S"], grid[0][0].extremes["W"],
            grid[-1][-1].extremes["N"], grid[-1][-1].extremes["E"])
    bbox_centre = ((bbox[1] + bbox[3]) / 2, (bbox[0] + bbox[2]) / 2)
    print("Creating BaseMap with bounding box [SW, NE]: [({0}, {1}), ({2}, {3})]"
          .format(bbox[1], bbox[0], bbox[3], bbox[2]))

    return bbox, bbox_centre


def basemap(grid_box):
    bm = Basemap(projection='merc', llcrnrlat=grid_box[0], llcrnrlon=grid_box[1], urcrnrlat=grid_box[2],
                 urcrnrlon=grid_box[3], resolution='f')

    return bm


def check_land(grid_sq, basemap):
    for row in grid_sq:
        for sq in row:
            on_land(sq, basemap)


def on_land(grid_sq, bm):
    # Get basemap coordinates for four corners and centre
    c = bm(grid_sq.centre[0], grid_sq.centre[1])
    sw = bm(grid_sq.extremes["W"], grid_sq.extremes["S"])
    se = bm(grid_sq.extremes["E"], grid_sq.extremes["S"])
    nw = bm(grid_sq.extremes["W"], grid_sq.extremes["N"])
    ne = bm(grid_sq.extremes["E"], grid_sq.extremes["N"])

    # Find which of these points are on land
    points = [bm.is_land(point[0], point[1]) for point in [c, sw, se, nw, ne]]
    if sum(points) > 0:
        grid_sq.on_land = {"square": True,
                           "c": points[0],
                           "SW": points[1],
                           "SE": points[2],
                           "NW": points[3],
                           "NE": points[4]}
    else:
        grid_sq.on_land = {"square": False,
                           "c": points[0],
                           "SW": points[1],
                           "SE": points[2],
                           "NW": points[3],
                           "NE": points[4]}


def radius(grid_sq):
    sw = (grid_sq.extremes["S"], grid_sq.extremes["W"])
    se = (grid_sq.extremes["S"], grid_sq.extremes["E"])
    nw = (grid_sq.extremes["N"], grid_sq.extremes["W"])
    ne = (grid_sq.extremes["N"], grid_sq.extremes["E"])
    centre = (grid_sq.centre[1], grid_sq.centre[0])

    distances = []

    for pt in [sw, se, nw, ne]:
        distances.append(geodesic(centre, pt).m)
    return max(distances)


def grid_2_dist(grid):
    grid_columns = len(grid)
    grid_rows = len(grid[0])
    dist_size = grid_rows * grid_columns

    temp = {(c, r): None for c in range(grid_columns) for r in range(grid_rows)}
    for key, i in zip(temp.keys(), range(dist_size)):
        temp[key] = i

    return temp


def dist_2_grid(grid):
    temp = grid_2_dist(grid)
    distances_to_grid = {value: key for key, value in temp.items()}

    return distances_to_grid


def supply_2_dist(s_coordinates, grid):
    grid_columns = len(grid)
    grid_rows = len(grid[0])
    size_1 = grid_rows * grid_columns

    size_2 = len(s_coordinates)

    temp = {i: None for i in range(size_2)}
    for key, j in zip(temp.keys(), range(size_2)):
        temp[key] = size_1 + j

    return temp


def dist_2_supply(s_coordinates, grid):
    temp = supply_2_dist(s_coordinates, grid)
    distances_to_supply = {value: key for key, value in temp.items()}

    return distances_to_supply


def fill_other_diagonal(dist_mx):

    for x in range(len(dist_mx[0])):
        for y in range(len(dist_mx[0])):
            if dist_mx[x][y] == -1:
                dist_mx[x][y] = dist_mx[y][x]

    return dist_mx
