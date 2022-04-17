import pandas as pd

# Read in city data
city_data = pd.read_csv('intro-to-apis/src/assets/uscities.csv')

# Create new dataframe with only capital cities
capital_city_names = ['Montgomery', 'Juneau', 'Phoenix', 'Little Rock', 'Sacramento',
'Denver', 'Hartford', 'Dover', 'Washington', 'Tallahassee', 'Atlanta', 'Honolulu', 'Boise', 'Springfield', 'Indianapolis',
'Des Moines', 'Topeka', 'Frankfort', 'Baton Rouge', 'Augusta', 'Annapolis', 'Boston', 'Lansing', 'St. Paul', 'Jackson', 'Jefferson City', 
'Helena', 'Lincoln', 'Carson City', 'Concord', 'Trenton', 'Santa Fe', 'Albany', 'Raleigh', 'Bismarck', 'Columbus', 'Oklahoma City', 'Salem', 'Harrisburg',
'San Juan', 'Providence', 'Columbia', 'Pierre', 'Nashville', 'Austin', 'Salt Lake City', 'Montpelier',
'Richmond', 'Olympia', 'Charleston', 'Madison', 'Cheyenne']
all_states = city_data['state_name'].drop_duplicates().sort_values().tolist()
capital_cities = pd.DataFrame(data = {'city': capital_city_names, 'state_name': all_states}).set_index(['city', 'state_name'])

# Use a join to filter out all non-capital cities
trimmed_city_data = city_data.join(other=capital_cities, on=['city', 'state_name'], how='right').set_index("city")

# Write to new CSV file
trimmed_city_data.to_csv('intro-to-apis/src/assets/tidy-citydata.csv')
