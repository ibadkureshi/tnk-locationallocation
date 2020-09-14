def sol_details(final_population, grid, distances, p_value, supply_coordinates=None):
    sol_coordinates = []
    sol_types = []
    sol_demand = [0] * p_value

    # Reverse supply coordinates, if any
    if supply_coordinates:
        supply_coordinates = [(t[1], t[0]) for t in supply_coordinates]

    for c in final_population.best:
        if c < len(grid):
            sol_coordinates.append(grid[c].centre)
            sol_types.append("GridSquare")
        else:
            sol_coordinates.append(supply_coordinates[c - len(grid)][::-1])
            sol_types.append("Supply Point")

    c = sorted(final_population.best)
    for i, sq in enumerate(grid):
        j = distances[c, i].argmin()
        sol_demand[j] += sq.demand

    return sol_coordinates, sol_types, sol_demand


def save_geojson_output(solution_details, p_value):
    coordinates, types, demand = solution_details
    filename = "test_" + str(p_value)
    path = "./output/geojson/" + filename

    output = {"type": "FeatureCollection",
              "name": filename,
              "crs": {"type": "name", "properties": {"name": "urn:ogc:def:crs:OGC:1.3:CRS84"}},
              "features": []}
    for i, (x, y, z) in enumerate(zip(coordinates, types, demand)):
        item = {"type": "Feature",
                "id": i + 1,
                "properties": {
                    "P": p_value,
                    "Name": "???",
                    "DemandWeig": z,
                    "Curr": 0.0,
                    "OrgnstT": y,
                    "Oximetr": None,
                    "AllRPH": 0.0,
                    "AllEACl": 0.0,
                    "CodeRPH": None,
                    "d": None,
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [format(x[0], ".15f"), format(x[1], ".15f")]
                }
                }

        output["features"].append(item)

        with open(path, "w") as json_file:
            json.dump(output, json_file)
