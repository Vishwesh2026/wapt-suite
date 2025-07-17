import os
class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', 'default_secret_key')
    DEBUG = os.environ.get('FLASK_ENV') != 'production'