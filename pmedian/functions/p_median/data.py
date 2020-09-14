import pandas


class Error(Exception):
    pass


def file_read(path):

    with open(path) as f:
        contents = f.readlines()

    return contents


def create_df(data):
    df = pandas.DataFrame(data)
    return df


def parse_csv(contents, separator=","):

    contents = [c.replace("\n", "") for c in contents]
    parsed_contents = []
    for line in contents:
        line_contents = [float(item) for item in line.split(separator)]
        parsed_contents.append(line_contents)

    return parsed_contents


def get_coordinates(df, latitude_column, longitude_column):
    latitudes = df.iloc[:, latitude_column]
    longitudes = df.iloc[:, longitude_column]
    return latitudes, longitudes
