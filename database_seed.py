"""Script to seed database."""

import os
from csv import DictReader
from datetime import datetime

import model
import server

os.system('dropdb pothos')
os.system('createdb pothos')

model.connect_to_db(server.app)
model.db.create_all()

with open('data/plants.csv', 'r') as read_obj:
    #pass the file object to reader to get the reader obj
    csv_dict_reader = DictReader(read_obj)
    #iterate over each row in the csv useing the reader obj
    for row in csv_dict_reader:
        #row variable is a list that represents a row in csv
        print(row)



