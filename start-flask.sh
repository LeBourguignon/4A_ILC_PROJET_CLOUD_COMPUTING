#!/bin/bash
export FLASK_APP=api.py
export FLASK_DEBUG=true
flask run

# docker run -p 6379:6379 --name myredis redis