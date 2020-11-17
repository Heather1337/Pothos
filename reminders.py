from twilio.rest import Client
from server import app
from model import *
import schedule
import os
import time
import flask
from flask_sqlalchemy import SQLAlchemy
import crud


client = Client(os.environ['ACCOUNT_SID'], os.environ['AUTH_TOKEN'])

def check_plants_for_watering():
    """Searches through the User_Plants table to see if any plants need reminders for watering."""

    users_to_notify = {}

    users = crud.get_all_users()

    for user in users:
#       #access the plants associated to each user
        plants = user.plants

        for plant in plants:

            if(plant.last_watered >= plant.plant_info.water_schedule):

                if(user.text_service == True):
                    print('User signed up for texts!!!!!!!!!!!!!!!!!!!!!!!!!!!')
                    if(user.phone_number not in users_to_notify):
                        users_to_notify[user.phone_number] = [plant.plant_info.plant_name]
                    else:
                        users_to_notify[user.phone_number].append(plant.plant_info.plant_name)
                crud.reset_plant_last_watered(plant.user_plant_id)

            else:
#                 #Use a patch to increment plant last_watered property by 1
                crud.increment_plant_last_watered(plant.user_plant_id)

    return users_to_notify

def send_text_to_users():
    """Sends text alerts to users for which plants need to be watered."""

    users = check_plants_for_watering()
    print("Users in send message to users function============================", users)
    for user_plants in users: #for attr, value in k.__dict__.items():
        if len(users[user_plants]) != 0:

            message = client.messages.create(
            #phone
            to="+15617792350",
            # from_="+12544142817",
            from_=os.environ["TWILIO_NUMBER"],
            #Add info for which plants to water [plantname, plantname, plantname]
            body= f"I'm thirsty! Reminder to water your: {', '.join(users[user_plants])} today.")
            # body= "I'm thirsty! Reminder to water your plants today.")

            print(message.sid)

# schedule.every().day.at('13:37').do(send_text_to_users)
# schedule.every(10).minutes.do(job)

if __name__ == '__main__':
    connect_to_db(app)
    # while True:
    #     schedule.run_pending()
    #     time.sleep(1)






