import pandas as pd 

postcode = 'DL166TN'

postcodes = pd.read_csv('./input/ukpostcodes.csv')

postcodes['postcode'] = postcodes['postcode'].str.replace(' ','')

geocode = postcodes.loc[postcodes['postcode'] == postcode] 

sourceLat=geocode.iloc[0]['latitude'])
sourceLon=geocode.iloc[0]['longitude'])

