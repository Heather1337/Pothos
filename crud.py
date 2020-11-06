"""Pothos CRUD operations."""

from model import db, User, Plant, User_Plant, User_Plant_Wishlist, connect_to_db

if __name__=='__main__':
    from server import app
    connect_to_db(app)


#=====================================================================================================#
# PLANT CRUD FUNCTIONS
#=====================================================================================================#

def create_plant(plant_name, is_toxic, filters_air,
                sun_lvl, beginner_friendly, water_schedule,
                water_tip, plant_tip, plant_details):

    """Create and return a new plant."""

    plant = Plant(plant_name=plant_name, is_toxic=is_toxic, filters_air=filters_air,
                 sun_lvl=sun_lvl, beginner_friendly=beginner_friendly, water_schedule=water_schedule,
                 water_tip=water_tip, plant_tip=plant_tip, plant_details=plant_details)

    db.session.add(plant)
    db.session.commit()

    return plant

#=====================================================================================================#
# USER CRUD FUNCTIONS
#=====================================================================================================#

def get_user_plants(user_email):
    """Gets the plants that belong to a user."""

    user_plants = User_Plant.query.filter(user_id==user_id).all()

    return user_plants


def get_user_id_with_email(user_email):
    """Return a user_id from provided email."""

    user = User.query.filter(email==user_email)

    return user.email




"""
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