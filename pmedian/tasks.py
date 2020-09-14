from celery import shared_task
import json
from pmedian.functions import record
from pmedian.functions import p_median

@shared_task
def p_median_calculation_task():
    # Load input from disk
    with open("pmedian/functions/data/input.json", "r") as f:
        output = json.load(f)
    # Record start time
    output = record.time(output, "start")
    # Get coordinates
    demand_coordinates = p_median.import_data(output["input"]["demand"]["file"],
                                              latitude_col=output["input"]["demand"]["lat_column"],
                                              longitude_col=output["input"]["demand"]["long_column"])
    # Get grid and out of bounds
    v = None if output["properties"]["box"]["grid_height"] == "None" \
        else output["properties"]["box"]["grid_height"]
    h = None if output["properties"]["box"]["grid_length"] == "None" \
        else output["properties"]["box"]["grid_length"]
    if_oob = output["properties"]["demand_pts"]["if_out_of_bounds"]
    sw = [float(i) for i in output["properties"]["box"]["sw"].split(",")]
    ne = [float(i) for i in output["properties"]["box"]["ne"].split(",")]
    grid, oob = p_median.get_grid(demand_coordinates, h_size=h, v_size=v, box_sw=sw, box_ne=ne,
                                  demand_out_of_bounds=if_oob)
    # Record demand
    output = record.demand(output, demand_coordinates, oob)
    # Record grid height and length
    output = record.grid_size(output, grid)
    # Get distances
    metric = output["properties"]["cost_type"]
    distances = p_median.get_distance_matrix(grid, cost_metric=metric)
    # Remove grid-squares not on land, modify distances accordingly
    grid, distances = p_median.clean(grid, distances)
    # Record features
    output = record.features(output, grid, distances, metric)
    # Record end time
    output = record.time(output, "end")
    # Return results
    return output
