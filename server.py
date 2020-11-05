"""Server for pothos app."""

from flask import (Flask, render_template, request, session)
from model import connect_to_db


app = Flask(__name__)
# app.secret_key = 'dev'

@app.route('/')
def my_index():
    """App page."""

    return render_template('base.html')

@app.route('/register_user', methods=["POST"])
def register_user():
    """Add a user to the db."""

    #Use a CRUD method to add a user to the db with provided email and password
    user_email = request.form['username']
    user_password = request.form['password']

@app.route('/user_login', methods=["GET", "POST"])
def user_login():
    """Handle a user logging in."""

    #Use a CRUD method to compare provided login credentials against data saved in db


if __name__ == '__main__':
    connect_to_db(app)
    app.run(host='0.0.0.0', debug=True)