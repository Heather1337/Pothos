"""Pothos CRUD operations."""

from model import db, User, Plant, User_Plant, User_Plant_Wishlist, connect_to_db

if __name__=='__main__':
    from server import app
    connect_to_db(app)


def create_plant(plant_name, is_toxic, filters_air,
                sun_lvl, beginner_friendly, water_schedule,
                water_tip, plant_tip, plant_details):
    """Create and return a new plant."""

    plant = Plant(plant_name=plant_name, is_toxic=is_toxic, filters_air=filters_air,
                 sun_lvl=sun_lvl, beginner_friendly=beginner_friendly, water_schedule=water_schedule, water_tip=water_tip,
                 plant_tip=plant_tip, plant_details=plant_details)

    db.session.add(plant)
    db.session.commit()

    return plant
"""
plant_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    plant_name = db.Column(db.String(40))
    plant_image = db.Column(db.String)
    is_toxic = db.Column(db.Boolean)
    filters_air = db.Column(db.Boolean)
    sun_lvl = db.Column(db.String)
    beginner_friendly = db.Column(db.Boolean)
    water_schedule = db.Column(db.Integer)
    water_tip = db.Column(db.String)
    plant_tip = db.Column(db.String)
    plant_details = db.Column(db.String)
LIST OF FUNCTIONS

def create_user()



def get_user_by_email()

def get_plant_by_id()

def add_plant_to_wishlist()

def add_plant_to_user_profile()

def delete_plant_from_user_profile()

def update_plant_name_on_user_profile()

def update_plant_img_on_user_profile()

def get_user_plants()

def get_user_wishlist()




"""