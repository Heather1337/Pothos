# Pothos
A full-stack plant application that helps users with indoor house plant care and knowledge.
***************************************************************************************************************

Core Functionality:


Features:


Data Structure:


Data Sources:

Technologies:


***************************************************************************************************************
***************************************************************************************************************

INDOOR HOUSE PLANT APP
- House plants categorized by: beginner friendly, pet friendly, sunlight exposure, etc
-Ability to add plants to your profile
- Integrates with Google Calendar to schedule when waterings should be for each house plant added to your account
- Ability to export a PDF of plant watering schedule for (house sitters)

ADDITIONAL FEATURES:
Ability to recalibrate watering schedule if missed.
Recommends plants based off of current plants.
Recommends/schedules with to re-soil, re-pot, add fertilizer (plant food)
Teaches about how to propagate different house plants
Sends alerts on when growth spurt should be coming! (Season the plant flourishes)
Shows local events with 'plants topic' from Evenbright API
Shows local plant shop with Google Maps API

MENTOR MEETING QUESTIONS:
Best way to keep track of watering schedule?
 -Having hardcoded watering schedule for MVP?
How often to check to send out message reminders? (cron)
Styling frameworks: React/Bootstrap for responsiveness? Can I used styled components
 in addition or do I need to use CSS file?

 -Use React/Bootstrap
 -For MVP focus on client side rendering and hydrate with data from python server

Interval (avg of rec time) 
start point- plant added

todays date - start date % interval == 0
send message | don't send message

accumulator - reduce

cron - used to run at specific times invoke function 

