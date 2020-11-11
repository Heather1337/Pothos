"""Server for pothos app."""

from flask import (Flask, render_template, request, session, jsonify)
from model import connect_to_db
import crud




app = Flask(__name__)
# app.secret_key = 'dev'

#=====================================================================================================#
# USER ROUTES
#=====================================================================================================#

@app.route('/')
def my_index():
    """ Show homepage with form to register.

    If user is already stored in session, redirect to user profile.
    """
    return render_template('base.html')

@app.route('/profile')
def profile_page():

    return render_template('base.html')


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

    return 'hi'


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



#=====================================================================================================#
# ROUTES FOR PLANT DATA
#=====================================================================================================#

@app.route('/get_plants.json')
def get_plants():
    """Return a JSON response with all plants in DB."""

    plants = crud.get_all_plants()
    plants_list = []


    for p in plants:
        plants_list.append({"plant_tip": p.plant_tip, "plant_name": p.plant_name, "plant_image": p.plant_image, "plant_id": p.plant_id})

    print(plants_list)


    return jsonify(plants_list)



@app.route('/get_user_plants.json')
def user_plants():
    """Get plants for a given user."""

    user_plants = crud.get_user_plants(1)
    user_plants_list = []
    print('DATA returned from CRUD for user plants:', user_plants)

    for p in user_plants:
        print('In USER plants data on server --->', p.plant_info.plant_name, p.plant_info.plant_id)
        user_plants_list.append({"plant_name": p.plant_info.plant_name, "plant_image": p.plant_info.plant_image, "water_tip": p.plant_info.water_tip})

    # user_plants_list.append({"plant_name": user_plants[0].plant_info.plant_name, "plant_id": user_plants[0].plant_info.plant_id})

    return jsonify(user_plants_list)

@app.route('/add_plant_to_profile', methods=["POST"])
def add_user_plant():
    """Add plant to a user's profile."""

    data = request.get_json()
    user_id = data['user_id']
    plant_id = data['plant_id']
    added_plant = crud.add_plant_to_user_profile(user_id, plant_id)
    print('Added plant to profile: ', added_plant)

    return 'Added plant to user profile.'



if __name__ == '__main__':
    connect_to_db(app)
    app.run(host='0.0.0.0', debug=True)