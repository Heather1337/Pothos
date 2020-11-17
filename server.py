"""Server for pothos app."""

from flask import (Flask, render_template, request, session, jsonify)
from model import connect_to_db
import crud




app = Flask(__name__)
# app.secret_key = 'dev'

#===============================*    PAGE ROUTES   *========================================#

@app.route('/')
def my_index():
    """ Show homepage with form to register."""

    return render_template('base.html')

@app.route('/profile')
def profile_page():

    return render_template('base.html')

#===============================*    USER ROUTES   *========================================#


@app.route('/register_user', methods=["POST"])
def register_user():
    """Add a user to the db."""

    data = request.get_json()

    email = data['email']
    password = data['password']
    fname = data['fname']
    lname = data['lname']
    print(f'Registering user with email: {email}, fname: {fname} lname: {lname}')

    crud.register_user(password, email, fname, lname)

    return jsonify('hi')


@app.route('/login_user', methods=["POST"])
def user_login():
    """Handle a user logging in."""

    print('Logging in a user in server.py....')

    #Parse the request user data
    user_data = request.get_json()
    print(user_data["email"])

    #Get user object from database
    user = crud.get_user_with_email(user_data["email"])
    #Check provided password matches password stored in db
    if (user_data["password"] == user.password):
        return jsonify({'user_email': user.email, 'user_ID': user.user_id, 'fname': user.fname})
    else:
        return jsonify('Invalid')


#===============================*   PLANT DATA ROUTES   *========================================#

@app.route('/get_plants.json')
def get_plants():
    """Return a JSON response with all plants in DB."""

    plants = crud.get_all_plants()
    plants_list = []


    for p in plants:
        plants_list.append({"plant_tip": p.plant_tip, "plant_name": p.plant_name, "plant_image": p.plant_image, "plant_id": p.plant_id})

    print(plants_list)


    return jsonify(plants_list)


#===============================*   WISHLIST PLANT  ROUTES   *========================================#

@app.route('/add_plant_to_wishlist', methods=["POST"])
def add_plant_to_wl():
    """Add plant to a user's profile."""

    data = request.get_json()
    user_id = data['user_id']
    plant_id = data['plant_id']
    added_plant = crud.add_plant_to_user_wishlist(user_id, plant_id)
    print('Added plant to wishlist: ', added_plant)

    return jsonify('Added plant to user wishlist.')


@app.route('/delete_plant_from_wishlist/<plant_id>/<user_id>', methods=["DELETE"])
def delete_wishlist_plant(plant_id, user_id):
    """Delete a user's plant."""
    print('trying to remove plant from wishlist in server...', plant_id, user_id)
    crud.remove_wishlist_plant(int(plant_id), int(user_id))

    return jsonify('Deleted users wishlist plant.')


@app.route('/get_user_wishlist.json/<user_id>')
def user_wishlist(user_id):
    """Get plants for a given user."""

    user_wishlist = crud.get_user_wishlist(user_id)
    wishlist_arr = []

    for p in user_wishlist:
        print('In USER plants data on server --->', p)
        wishlist_arr.append({"plant_name": p.plant_name, "plant_image": p.plant_image, "water_tip": p.water_tip, "plant_id": p.plant_id})

    # user_plants_list.append({"plant_name": user_plants[0].plant_info.plant_name, "plant_id": user_plants[0].plant_info.plant_id})

    return jsonify(wishlist_arr)

#===============================*   USER PLANT ROUTES   *========================================#

@app.route('/delete_plant_from_profile/<plant_id>', methods=["DELETE"])
def delete_user_plant(plant_id):
    """Delete a user's plant."""
    print('trying to remove plant in server...', plant_id)
    crud.remove_user_plant(int(plant_id))

    return jsonify('Deleted users plant.')


@app.route('/add_nickname_to_plant', methods=["PATCH"])
def add_nickname_to_plant():
    """Add or update a User's plant nickname."""

    print('trying to update a name on a plant', )
    data = request.get_json()
    plant_id = data['plant_id']
    nickname = data['nickname']

    crud.update_plant_nickname(plant_id, nickname)

    return jsonify('Added or updated a plant nickname.')

@app.route('/update_days_since_last_water', methods=["PATCH"])
def update_days_since_last_water():
    """Update a User's plant last watering days count."""

    print('trying to update watering days on a plant', )
    data = request.get_json()
    plant_id = data['plant_id']
    days_count = data['days_count']

    crud.update_plant_days_to_water(plant_id, days_count)

    return jsonify('Updated days since last water for User plant.')


@app.route('/add_plant_to_profile', methods=["POST"])
def add_user_plant():
    """Add plant to a user's profile."""

    data = request.get_json()
    user_id = data['user_id']
    plant_id = data['plant_id']
    added_plant = crud.add_plant_to_user_profile(user_id, plant_id)
    print('Added plant to profile: ', added_plant)

    return jsonify('Added plant to user profile.')


@app.route('/get_user_plants.json/<user_id>')
def user_plants(user_id):
    """Get plants for a given user."""

    user_plants = crud.get_user_plants(user_id)
    user_plants_list = []
    print('DATA returned from CRUD for user plants:', user_plants)

    for p in user_plants:
        print('In USER plants data on server --->', p.plant_id)

        days_to_water = 0
        if(p.last_watered < p.plant_info.water_schedule):
            days_to_water = p.plant_info.water_schedule - p.last_watered

        user_plants_list.append({"plant_name": p.plant_info.plant_name, "plant_image": p.plant_info.plant_image, "water_tip": p.plant_info.water_tip, "user_plant_id": p.user_plant_id, "nickname": p.plant_nickname, "days_to_water": days_to_water})

    return jsonify(user_plants_list)


#===============================*   USER DATA ROUTES   *========================================#

@app.route('/register_user_for_texts', methods=["PATCH"])
def register_user_for_texts():
    """Register a user to receive text reminders."""

    data = request.get_json()
    phone_number = data['phone_number']
    text_reminders = data['wants_reminders']
    user_id = data['user_id']

    crud.register_user_for_texts(phone_number, text_reminders, user_id)

    return jsonify('User has been registered.')



if __name__ == '__main__':
    connect_to_db(app)
    app.run(host='0.0.0.0', debug=True)