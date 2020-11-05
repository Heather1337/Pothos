"""Script to seed database."""

import os
from datetime import datetime
from crud import create_plant

import model
import server

os.system('dropdb pothos')
os.system('createdb pothos')

model.connect_to_db(server.app)
model.db.create_all()

# with open('data/plants.csv', 'r') as read_obj:
#     #pass the file object to reader to get the reader obj
#     csv_dict_reader = DictReader(read_obj)
#     #iterate over each row in the csv useing the reader obj
#     for row in csv_dict_reader:
#         #row variable is a list that represents a row in csv
#         print(row)

fileHandle = open('data/plants.csv', 'r')

for line in fileHandle:
    fields = line.split('|')

    #plant_name|filters_air|is_toxic|sun_exposure|beginner_friendly|watering_schedule|plant_tip|plant_details|plant_img|water_tip
    plant_name, filters_air, is_toxic, sun_lvl, beginner_friendly, watering_schedule, plant_tip, plant_details, water_tip = fields
    is_toxic = (is_toxic == 'True')
    beginner_friendly = (beginner_friendly == 'True')
    filters_air = (filters_air == 'True')

    plant = create_plant(plant_name, filters_air, is_toxic, sun_lvl, beginner_friendly, watering_schedule, plant_tip, plant_details, water_tip)
    print(plant) # prints the first fields value

fileHandle.close()


