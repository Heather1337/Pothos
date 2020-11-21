from twilio.rest import Client
from twilio.base.exceptions import TwilioRestException
import os


ACCOUNT_SID = os.environ['TWILIO_ACCOUNT_SID']
AUTH_TOKEN = os.environ['TWILIO_AUTH_TOKEN']

def lookup_phone_number(phone):
    """Uses Twilio API to validate and format phone  number."""

    client = Client(ACCOUNT_SID, AUTH_TOKEN)

    try:
        phone_number = client.lookups \
                         .phone_numbers(phone) \
                         .fetch(type=['carrier'])

        return phone_number.phone_number


    except:
        if(TwilioRestException.code == 20404):
            return False
        else:
            raise TwilioRestException