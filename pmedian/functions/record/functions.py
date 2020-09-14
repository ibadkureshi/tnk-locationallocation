from datetime import datetime, timezone
import pmedian.functions.p_median as p_median


def time(f, t):
    f["time"][t] = datetime.now(timezone.utc).strftime("%d-%m-%Y %H:%M:%S.%f")
    return f


def demand(f, coordinates, oob):
    f["properties"]["demand_pts"]["initial"] = len(coordinates)
    f["properties"]["demand_pts"]["out_of_bounds"] = oob
    f["properties"]["demand_pts"]["final"] = f["properties"]["demand_pts"]["initial"] - oob
    return f


def grid_size(f, g):
    f["properties"]["box"]["grid_height"] = len(g)
    f["properties"]["box"]["grid_length"] = len(g[0])
    return f


def features(f, gd, d, m):
    # Get minimum and maximum p values
    p_min = f["properties"]["p_val"]["min"]
    p_max = f["properties"]["p_val"]["max"]
    f["features"] = list()
    # For each p_val
    for p in range(p_min, p_max + 1):
        # Run algorithm
        pop = p_median.run_algorithm(gd, d, p)
        # Record solution details
        f["features"].append({"type": "Feature",
                              "id": p - p_min + 1,
                              "properties": {
                                  "p": p,
                                  "avg_distance": "None",
                                  "max_distance": "None",
                                  "avg_time": "None",
                                  "max_time": "None"},
                              "locations": list()})
        max_metric, avg_metric = p_median.solution_stats(pop, gd, d)
        f["features"][-1]["properties"].update({"avg_" + m: avg_metric, "max_" + m: max_metric})
        sol_coordinates = p_median.solution_coordinates(pop, gd)
        sol_demand_weights = p_median.solution_demand(pop, gd, d, p)
        for c, w in zip(sol_coordinates, sol_demand_weights):
            f["features"][-1]["locations"].append(
                {"location": {
                    "type": "Point",
                    "coordinates": str(c[1]) + "," + str(c[0]),
                    "demand_weight": w,
                    "name": "demand-based location"}})
    return f
