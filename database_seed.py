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

fileHandle = open('data/plants.csv', 'r')

for line in fileHandle:
    fields = line.split('|')

    plant_name, filters_air, is_toxic, sun_lvl, beginner_friendly, watering_schedule, plant_tip, plant_details, water_tip = fields
    is_toxic = (is_toxic == 'True')
    beginner_friendly = (beginner_friendly == 'True')
    filters_air = (filters_air == 'True')

    plant = create_plant(plant_name, filters_air, is_toxic, sun_lvl, beginner_friendly, watering_schedule, plant_tip, plant_details, water_tip)

fileHandle.close()


