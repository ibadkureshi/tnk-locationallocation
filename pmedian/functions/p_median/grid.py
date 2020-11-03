from geopy.distance import geodesic
from itertools import chain


class GridSquare:

    def __init__(self, min_lon, min_lat, lon_step, lat_step):
        self.extremes = {"W": min_lon, "E": min_lon + lon_step, "S": min_lat, "N": min_lat + lat_step}
        self.centre = (min_lon + lon_step / 2, min_lat + lat_step / 2)
        self.demand = None
        self.on_land = None

    def __repr__(self):
        return "<GridSquare with centre {0} and demand {1}>" \
            .format(self.centre, self.demand)

    def get_demand(self, latitudes, longitudes):
        demand = 0
        for lon, lat in zip(longitudes, latitudes):
            if self.extremes["W"] <= lon < self.extremes["E"] and self.extremes["S"] <= lat < self.extremes["N"]:
                demand += 1
        self.demand = demand


def create(demand_coordinates, h_size, v_size, extremes, e=10e-5):

    # Get demand latitudes/longitudes
    latitudes, longitudes = zip(*demand_coordinates)
    # Get grid size and min/max points
    min_lat, max_lat = extremes[0] - e, extremes[1] + e
    min_lon, max_lon = extremes[2] - e, extremes[3] + e
    # Get grid's cutoff points
    lon_step = (max_lon - min_lon) / h_size
    lat_step = (max_lat - min_lat) / v_size
    lon_cuts = [min_lon + i * lon_step for i in range(0, h_size)]
    lat_cuts = [min_lat + i * lat_step for i in range(0, v_size)]
    # Create grid squares
    grid = [[GridSquare(lon, lat, lon_step, lat_step) for lon in lon_cuts] for lat in lat_cuts]
    counter = 0
    for row in grid:
        for item in row:
            item.get_demand(latitudes, longitudes)
            counter += item.demand
    return grid


def get_extremes(box_sw, box_ne):
    return box_sw[0], box_ne[0], box_sw[1], box_ne[1]


def treat_oob(coordinates, extremes, out_of_bounds_setting):
    initial_length = len(coordinates)
    new_coordinates = list()
    if out_of_bounds_setting == "exclude":
        for c in coordinates:
            if extremes[0] <= c[0] <= extremes[1] and extremes[2] <= c[1] <= extremes[3]:
                new_coordinates.append(c)
    elif out_of_bounds_setting == "include":
        for c in coordinates:
            if c[0] < extremes[0]: c[0] = extremes[0]  # Fix points south of box
            if c[0] > extremes[1]: c[0] = extremes[1]  # north
            if c[1] < extremes[2]: c[1] = extremes[2]  # west
            if c[1] > extremes[3]: c[1] = extremes[3]  # east
            new_coordinates.append(c)
    final_length = len(new_coordinates)
    treated = initial_length - final_length
    return new_coordinates, treated


def size(h_size, v_size, extremes):

    # Treat extremes
    south, north, west, east = extremes
    # Create extreme points (assuming north hemisphere, but algorithm's result won't change if in the south hemisphere)
    sw, se, nw, ne = (south, west), (south, east), (north, west), (north, east)
    # Get ratio of vertical/horizontal
    d_horizontal = geodesic(sw, se).m + geodesic(nw, ne).m
    d_vertical = geodesic(sw, nw).m + geodesic(se, ne).m
    ratio = d_vertical / d_horizontal
    # If both sizes are given, nothing further to do
    if v_size and h_size:
        pass
    # If only h_size, find v_size
    elif h_size:
        v_size = max(round(h_size * ratio), 1)
    # Vice-versa
    else:
        h_size = max(round(v_size / ratio), 1)

    return h_size, v_size
