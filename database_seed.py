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

    plant_name, filters_air, is_toxic, sun_lvl, beginner_friendly, water_schedule, plant_tip, plant_details, water_tip, plant_image = fields
    is_toxic = (is_toxic == 'True')
    beginner_friendly = (beginner_friendly == 'True')
    filters_air = (filters_air == 'True')
    if not (plant_image):
        plant_image = "https://s7d1.scene7.com/is/image/terrain/56923436_000_a?$zoom2$"

    plant = create_plant(plant_name, filters_air, is_toxic, sun_lvl, beginner_friendly, water_schedule, plant_tip, plant_details, water_tip, plant_image)

fileHandle.close()


