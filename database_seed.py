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

    plant_name, filters_air, is_toxic, sun_lvl, beginner_friendly, water_schedule, plant_tip, plant_details, water_tip = fields
    is_toxic = (is_toxic == 'True')
    beginner_friendly = (beginner_friendly == 'True')
    filters_air = (filters_air == 'True')
    plant_image = 'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_large-zz-plant_variant_large_hyde_black.jpg?v=1600813826'

    plant = create_plant(plant_name, filters_air, is_toxic, sun_lvl, beginner_friendly, water_schedule, plant_tip, plant_details, water_tip, plant_image)

fileHandle.close()


