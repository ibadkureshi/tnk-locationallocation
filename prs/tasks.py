from celery import shared_task
import pandas as pd 
import json
import openrouteservice as ors

@shared_task
def prs_task(postcode, userid=None, ignore_result=False, task_track_started=True):
    return "This is the celery response"
    # postcodes = pd.read_csv('./input/ukpostcodes.csv')
    # postcodes['postcode'] = postcodes['postcode'].str.replace(' ','')
    #
    # geocode = postcodes.loc[postcodes['postcode'] == postcode]
    # sourceLat=geocode.iloc[0]['latitude']
    # sourceLon=geocode.iloc[0]['longitude']
    #
    # print(sourceLat, sourceLon)
    #
    # client = ors.Client(base_url='http://192.168.1.99:8080/ors')
    #
    # coords =((sourceLon,sourceLat),('0.137740','52.173302'))
    # routes = client.directions(coords)
    # travelTime = str(routes["routes"][0]["summary"]["duration"])
    # travelDistance = str(routes["routes"][0]["summary"]["distance"])
    #
    # return (travelDistance+' '+travelTime)
