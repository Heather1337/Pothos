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
                water_tip, plant_tip, plant_details, plant_image):

    """Create and return a new plant."""

    plant = Plant(plant_name=plant_name, filters_air=filters_air, is_toxic=is_toxic,
                 sun_lvl=sun_lvl, beginner_friendly=beginner_friendly, water_schedule=water_schedule,
                plant_tip=plant_tip, plant_details=plant_details, water_tip=water_tip, plant_image=plant_image)

    db.session.add(plant)
    db.session.commit()

    return plant

def get_all_plants():
    """Get all plants in db and return."""

    plants = Plant.query.all()

    print('Getting all plants from CRUD---->', plants[1])
    return plants

def add_plant_to_user_profile(user_id, plant_id):
    """Add a plant to a users profile."""
    # TODO: Add field for days_to_water to keep track of count 
    added_plant = User_Plant(user_id=user_id, plant_id=plant_id)

    db.session.add(added_plant)
    db.session.commit()

    return added_plant

def add_plant_to_user_wishlist(user_id, plant_id):
    """Add a plant to a users profile wishlist."""

    added_plant = User_Plant_Wishlist(user_id=user_id, plant_id=plant_id)

    db.session.add(added_plant)
    db.session.commit()

    return added_plant

#=====================================================================================================#
# USER CRUD FUNCTIONS
#=====================================================================================================#
def register_user(password, email, fname, lname):
    """Gets the plants that belong to a user."""

    registered_user = User(password=password, email=email, fname=fname, lname=lname)

    db.session.add(registered_user)
    db.session.commit()

    print('You have registered a user!')
    return registered_user


def get_user_plants(id):
    """Gets the plants that belong to a user."""

    print('In CRUD get user plants ====>')
    # user_plants = User_Plant.query.filter(User_Plant.user_id == 1)
    # print('USER PLANTS IN DB CRUD FILE', user_plants)
    #Get all of the plants that belong to a single user
    #Reference the association table User_Plant ?
    #User_Plant.query.options(db.joinedLoad('user_id')).all()
    #
    # plant = User_Plant.query.filter(User_Plant.user_id == 1).first()
    # user_plant = Plant.query.get(plant.plant_id)
    user = User.query.get(id)
    user_plants = user.plants
    print(user_plants[0].user_plant_id)

    return user_plants

def get_user_wishlist(id):
    """Gets the plants that belong to a user."""

    print('In CRUD get user wishlist ====>')
    # user_plants = User_Plant.query.filter(User_Plant.user_id == 1)
    # print('USER PLANTS IN DB CRUD FILE', user_plants)
    #Get all of the plants that belong to a single user
    #Reference the association table User_Plant ?
    #User_Plant.query.options(db.joinedLoad('user_id')).all()
    #
    # plant = User_Plant.query.filter(User_Plant.user_id == 1).first()
    # user_plant = Plant.query.get(plant.plant_id)
    user = User.query.get(id)
    user_wishlist = user.wishlist
    print("USER WISHLIST INFO: ==================", user_wishlist)

    return user_wishlist


def get_user_with_email(user_email):
    """Return a user_id from provided email."""

    user_info = User.query.filter(User.email == user_email).first()

    return user_info

def remove_user_plant(user_plant_id):
    """Remove a user's plant."""

    user_plant = User_Plant.query.get(user_plant_id)
    db.session.delete(user_plant)
    db.session.commit()

def remove_wishlist_plant(plant_id, user_id):
    """Remove a plant on a User's wishlist."""

    plant = User_Plant_Wishlist.query.filter(User_Plant_Wishlist.user_id == user_id and User_Plant_Wishlist.plant_id == plant_id).first()

    db.session.delete(plant)
    db.session.commit()





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