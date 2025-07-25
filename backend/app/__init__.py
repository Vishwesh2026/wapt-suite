from flask import Flask
from flask_cors import CORS
from .routes import main

def create_app():
    app = Flask(__name__)
    CORS(app)  # Enable CORS for React front-end
    app.config.from_object('config.Config')
    app.register_blueprint(main)
    return app