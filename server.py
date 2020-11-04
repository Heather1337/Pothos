"""Server for pothos app."""

from flask import (Flask, render_template, request, session)
from model import connect_to_db


app = Flask(__name__)
# app.secret_key = 'dev'

@app.route('/')
def my_index():
    """App page."""

    return render_template('index.html')


if __name__ == '__main__':
    connect_to_db(app)
    app.run(host='0.0.0.0', debug=True)