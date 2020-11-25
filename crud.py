"""Pothos CRUD operations."""

from model import db, User, Plant, User_Plant, User_Plant_Wishlist, Plant_Comment, User_Room, User_Plant_Room, connect_to_db

if __name__=='__main__':
    from server import app
    connect_to_db(app)


#=====================================================================================================#
# PLANT CRUD FUNCTIONS
#=====================================================================================================#

def create_plant(plant_name, filters_air, is_toxic,
                sun_lvl, beginner_friendly, water_schedule,
                plant_tip, plant_details, water_tip,  plant_image):

    """Create and return a new plant."""

    plant = Plant(plant_name=plant_name, filters_air=filters_air, is_toxic=is_toxic,
                 sun_lvl=sun_lvl, beginner_friendly=beginner_friendly, water_schedule=water_schedule,
                plant_tip=plant_tip, plant_details=plant_details, water_tip=water_tip, plant_image=plant_image)

    db.session.add(plant)
    db.session.commit()

    return plant

def create_plant_comment(plant_id, user_id, comment):
    """Create a comment belonging to a Plant created by a User."""

    comment = Plant_Comment(plant_id=plant_id, user_id=user_id, comment=comment)

    db.session.add(comment)
    db.session.commit()

def get_plant_comments(plant_id):
    """Get comments belonging to a given plant."""

    plant = Plant.query.get(plant_id)
    comments = []
    if len(plant.comments):
        comments = plant.comments


    return comments

def get_all_plants():
    """Get all plants in db and return."""

    plants = Plant.query.all()

    return plants

def get_all_user_rooms(user_id):
    """Get all user rooms in db and return."""

    user = User.query.get(user_id)
    user_rooms = user.rooms

    return user_rooms

def add_user_room(user_id, room_name):
    """Add a room to a user's profile."""

    user_room = User_Room(user_id=user_id, room_name=room_name)
    db.session.add(user_room)
    db.session.commit()

    return user_room

def add_room_to_user_plant(user_plant_id, user_room_id):

    user_plant_room = User_Plant_Room(user_plant_id=user_plant_id, user_room_id=user_room_id)

    db.session.add(user_plant_room)
    db.session.commit()

def get_plant(plant_id):
    """Get information for a single plant."""

    plant = Plant.query.get(plant_id)

    return plant

def filter_by_is_toxic():
    """Get all plants filtered by given conditional."""

    plants = Plant.query.filter(Plant.is_toxic == False)

    return plants

def filter_by_beginner_friendly():
    """Get all plants filtered by given conditional."""

    plants = Plant.query.filter(Plant.beginner_friendly == True)

    return plants

def filter_by_filters_air():
    """Get all plants filtered by given conditional."""

    plants = Plant.query.filter(Plant.filters_air == True)

    return plants


def filter_by_bright_light():
    """Get all plants filtered by given conditional."""

    plants = Plant.query.filter((Plant.sun_lvl == 'Bright indirect to low light') |
                                (Plant.sun_lvl == 'Bright direct to indirect light') |
                                (Plant.sun_lvl == 'Low to bright indirect light') |
                                (Plant.sun_lvl == 'Bright indirect to medium light') |
                                (Plant.sun_lvl == 'Bright indirect')).all()

    return plants

def filter_by_medium_light():
    """Get all plants filtered by given conditional."""

    plants = Plant.query.filter((Plant.sun_lvl == 'Bright indirect to low light') |
                                (Plant.sun_lvl == 'Low to bright indirect light') |
                                (Plant.sun_lvl == 'Bright indirect to medium light') |
                                (Plant.sun_lvl == 'Bright indirect to low light') |
                                (Plant.sun_lvl == 'Bright indirect')).all()

    return plants

def filter_by_low_light():
    """Get all plants filtered by given conditional."""

    plants = Plant.query.filter((Plant.sun_lvl == 'Bright indirect to low light') |
                                (Plant.sun_lvl == 'Low to bright indirect light') |
                                (Plant.sun_lvl == 'Bright indirect to low light')).all()

    return plants

def get_filtered_user_plants(user_room_id):
    """Get plants in a given room with user_id."""

    # filtered_plants = User_Plant.query.filter(user_id == user_id & room_id == room_id)
    # filtered_plants = db.session.query(User_Plant_Room.room).select_from(UserPlantRoom)
    # .join(User, User.user_id == UserPlantRoom.user_id).filter(User.userid == user_id, User.room == room_id).all()
    user_room = User_Room.query.get(user_room_id)
    user_room_plants = user_room.plants
    # user_room_plants_info = [plant.user_plant for plant in user_room_plants]

    return user_room_plants



def add_plant_to_user_profile(user_id, plant_id):
    """Add a plant to a users profile."""
    # TODO: Add field for days_to_water to keep track of count
    added_plant = User_Plant(user_id=user_id, plant_id=plant_id, last_watered=0)

    db.session.add(added_plant)
    db.session.commit()

    return added_plant

def add_plant_to_user_wishlist(user_id, plant_id):
    """Add a plant to a users profile wishlist."""

    added_plant = User_Plant_Wishlist(user_id=user_id, plant_id=plant_id)

    db.session.add(added_plant)
    db.session.commit()

    return added_plant

def update_plant_nickname(plant_id, nickname):
    """Add or update a nickname for a User's plant."""

    plant = User_Plant.query.get(plant_id)
    plant.plant_nickname = nickname
    db.session.commit()

    return plant

def update_plant_days_to_water(plant_id, days_to_water):

    plant = User_Plant.query.get(plant_id)
    plant.last_watered = days_to_water
    db.session.commit()

    return plant

def get_user_plants_for_sms():
    """Get all user_plants saved"""

    users = User.query.filter(User.text_service == True)

    return users

def increment_plant_last_watered(user_plant_id):
    """Updates a user_plants laster_watered attribute."""

    plant = User_Plant.query.get(user_plant_id)
    plant.last_watered = plant.last_watered + 1
    db.session.commit()

    return plant

def reset_plant_last_watered(user_plant_id):
    """Resets a user_plants laster_watered attribute to 0."""

    plant = User_Plant.query.get(user_plant_id)
    plant.last_watered = 0
    db.session.commit()

    return plant

def get_most_wished_for_plant():
    """Returns most wished for plant."""

    wished_for_plants = User_Plant_Wishlist.query.all()

    wished_for_plants_count = {}

    for plant in wished_for_plants:
        if plant.plant_info.plant_name in wished_for_plants_count:
            wished_for_plants_count[plant.plant_info.plant_name] += 1
        else:
            wished_for_plants_count[plant.plant_info.plant_name] = 1
    print('PLANT OBJECT COUNT=============', wished_for_plants_count)
    plant = max(wished_for_plants_count, key=wished_for_plants_count.get)
    print('PLANT MOST POPULAR========================================', plant)



#=====================================================================================================#
# USER CRUD FUNCTIONS
#=====================================================================================================#
def get_all_users():
    """Returns a list of all Users."""

    users = User.query.all()

    return users

def register_user(password, email, fname, lname):
    """Gets the plants that belong to a user."""

    registered_user = User(password=password, email=email, fname=fname, lname=lname)

    db.session.add(registered_user)
    db.session.commit()

    print('You have registered a user!')
    return registered_user


def get_user_plants(id):
    """Gets the plants that belong to a user."""

    user = User.query.get(id)
    user_plants = user.plants
    print(user_plants[0].user_plant_id)

    return user_plants

def get_user_wishlist(id):
    """Gets the plants that belong to a user."""

    user = User.query.get(id)
    user_wishlist = user.wishlist

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

def remove_wishlist_plant(plant_id):
    """Remove a plant on a User's wishlist."""

    plant = User_Plant_Wishlist.query.get(plant_id)

    db.session.delete(plant)
    db.session.commit()

def register_user_for_texts(phone_number, wants_texts, user_id):
    """Updates a user with number and if they would like text reminders."""

    user = User.query.get(user_id)
    print('user in register:')
    user.phone_number = phone_number
    user.text_service = wants_texts
    db.session.commit()

    return user

def unregister_user_for_texts(wants_texts, user_id):
    """Updates a user with number and if they would like text reminders."""

    user = User.query.get(user_id)
    user.text_service = wants_texts
    db.session.commit()

    return user



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