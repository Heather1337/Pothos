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


@app.route('/register_user', methods=["POST"])
def register_user():
    """Add a user to the db."""

    print('Registering a user in server.py....')
    print('Request on server: ', request.data)

    data = request.get_json()

    email = data['email']
    password = data['password']
    fname = data['fname']
    lname = data['lname']
    print(f'Usering email: {email}, fname: {fname} lname: {lname}')

    crud.register_user(password, email, fname, lname)

    return 'hi'


# @app.route('/user_login', methods=["GET", "POST"])
# def user_login():
#     """Handle a user logging in."""

#     #Use a CRUD method to compare provided login credentials against data saved in db

#=====================================================================================================#
# ROUTES FOR PLANT DATA
#=====================================================================================================#

@app.route('/get_plants.json')
def get_plants():
    """Return a JSON response with all plants in DB."""

    plants = crud.get_all_plants()
    plants_list = []

    for p in plants:
        print('In plants data on server --->', p.plant_tip, p.plant_image)
        plants_list.append({"plant_tip": p.plant_tip, "plant_name": p.plant_name, "plant_image": p.plant_image})

    return jsonify(plants_list)



@app.route('/get_user_plants.json')
def user_plants():
    """Get plants for a given user."""

    print('I am in get user plants=========>')
    user_plants = crud.get_user_plants(1)
    user_plants_list = []
    print('DATA returned from CRUD for user plants:', user_plants)

    # for p in user_plants:
    #     print('In USER plants data on server --->', p.plant_name, p.plant_id)
    #     user_plants_list.append({"plant_id": p.plant_id, "plant_name": p.plant_name})

    user_plants_list.append({"plant_name": user_plants[0].plant_info.plant_name, "plant_id": user_plants[0].plant_info.plant_id})

    return jsonify(user_plants_list)



if __name__ == '__main__':
    connect_to_db(app)
    app.run(host='0.0.0.0', debug=True)