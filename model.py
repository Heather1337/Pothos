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

    plants = db.relationship('User_Plant')
    wishlist = db.relationship('User_Plant_Wishlist')
    rooms = db.relationship('User_Room')

    def __repr__(self):
        return f'<User user_id={self.user_id} email={self.email}>'


class Plant(db.Model):
    """A plant."""

    __tablename__='plants'

    plant_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    plant_name = db.Column(db.String(40))
    filters_air = db.Column(db.Boolean)
    is_toxic = db.Column(db.Boolean)
    sun_lvl = db.Column(db.String)
    beginner_friendly = db.Column(db.Boolean)
    water_schedule = db.Column(db.Integer)
    plant_tip = db.Column(db.String)
    plant_details = db.Column(db.String)
    water_tip = db.Column(db.String)
    plant_image = db.Column(db.String)

    comments = db.relationship('Plant_Comment')

    def __repr__(self):
        return f'<Plant plant_id={self.plant_id}>'

class Plant_Comment(db.Model):
    """A Plant comment by a User."""

    __tablename__='plant_comments'

    plant_comment_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    plant_id = db.Column(db.Integer, db.ForeignKey('plants.plant_id'))
    comment = db.Column(db.String)

    plants = db.relationship('Plant')

    def __repr__(self):
        return f'<Plant_Comment plant_comment_id={self.plant_comment_id}>'


class User_Plant(db.Model):
    """A user's plant."""

    __tablename__='user_plants'

    user_plant_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    plant_nickname = db.Column(db.String)
    last_watered = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    plant_id = db.Column(db.Integer, db.ForeignKey('plants.plant_id'))


    users = db.relationship('User')
    plant_info = db.relationship('Plant')
    room = db.relationship('User_Plant_Room')
    images = db.relationship('User_Plant_Image')
    #! rooms = db.relationship('User_Room', secondary = 'user_plant_rooms')

    def __repr__(self):
        return f'<User_Plant user_plant_id={self.user_plant_id}>'

class User_Room(db.Model):
    """A user's room."""

    __tablename__='user_rooms'

    user_room_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    room_name = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))

    users = db.relationship('User')
    plants = db.relationship('User_Plant_Room')
    #! plants = db.relationship('User_Plant', secondary='user_plant_rooms')

    def __repr__(self):
        return f'<User_Room user_room_id={self.user_room_id}>'

class User_Plant_Room(db.Model):
    """A user's plant's room."""

    __tablename__='user_plant_rooms'

    user_plant_room_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_plant_id = db.Column(db.Integer, db.ForeignKey('user_plants.user_plant_id'))
    user_room_id = db.Column(db.Integer, db.ForeignKey('user_rooms.user_room_id'))

    user_room = db.relationship('User_Room')
    user_plant = db.relationship('User_Plant')

    def __repr__(self):
        return f'<User_Plant_Room user_plant_room_id={self.user_plant_room_id}>'

class User_Plant_Image(db.Model):
    """A user's plant's room."""

    __tablename__='user_plant_images'

    user_plant_image_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_plant_id = db.Column(db.Integer, db.ForeignKey('user_plants.user_plant_id'))
    image_url = db.Column(db.String)

    user_plant = db.relationship('User_Plant')

    def __repr__(self):
        return f'<User_Plant_Image user_plant_image_id={self.user_plant_image_id}>'

class User_Plant_Wishlist(db.Model):
    """A user's plant wishlist."""

    __tablename__='users_plant_wishlist'

    wishlist_plant_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    plant_id = db.Column(db.Integer, db.ForeignKey('plants.plant_id'))

    plant_info = db.relationship('Plant')
    users = db.relationship('User')


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