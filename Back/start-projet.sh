#!/bin/bash

# pip install Flask redis flask-cors

export FLASK_APP=api.py
export FLASK_DEBUG=true
flask run

# Or run the following command
# python3 api.py

# Syntax check
# python3 api.py check_syntax