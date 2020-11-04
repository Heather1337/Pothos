"""Models for House Plant App."""

from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    """A user."""

    __tablename__='users'

    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    password = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False, unique=True)
    fname = db.Column(db.String)
    lname = db.Column(db.String)
    username = db.Column(db.String)
    experience = db.Column(db.String)
    phone_number = db.Column(db.String)
    text_service = db.Column(db.Boolean)



    def __repr__(self):
        return f'<User user_id={self.user_id} email={self.email}>'


class Plant(db.Model):
    """A plant."""

    __tablename__='plants'

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


    def __repr__(self):
        return f'<Plant plant_id={self.plant_id}>'


class User_Plant(db.Model):
    """A user's plant."""

    __tablename__='user_plants'

    user_plant_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    plant_nickname = db.Column(db.String)
    last_watered = db.Column(db.DateTime)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    plant_id = db.Column(db.Integer, db.ForeignKey('plants.plant_id'))


    users = db.relationship('User')
    plants = db.relationship('Plant')

    def __repr__(self):
        return f'<User_Plant user_plant_id={self.user_plant_id}>'

class User_Plant_Wishlist(db.Model):
    """A user's plant wishlist."""

    __tablename__='users_plant_wishlist'

    wishlist_plant_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    plant_id = db.Column(db.Integer, db.ForeignKey('plants.plant_id'))

    users = db.relationship('User')
    plants = db.relationship('Plant')

    def __repr__(self):
        return f'<User_Plant_Wishlist wishlist_plant_id={self.wishlist_plant_id}>'


def connect_to_db(flask_app, db_uri='postgresql:///pothos', echo=True):
    flask_app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
    flask_app.config['SQLALCHEMY_ECHO'] = echo
    flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.app = flask_app
    db.init_app(flask_app)

    print('Connected to the pothos db!')


if __name__ == '__main__':
    from server import app

    # Call connect_to_db(app, echo=False) if your program output gets
    # too annoying; this will tell SQLAlchemy not to print out every
    # query it executes.

    connect_to_db(app)