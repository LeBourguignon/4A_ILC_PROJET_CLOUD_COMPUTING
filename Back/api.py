from flask import Flask, request
# from flask_cors import CORS, cross_origin

import json
import datetime
import re

app = Flask(__name__)
# cors = CORS(app)

users = {}

def login(user, password):
    return user in users and users[user] == password

class Tweet:
    def __init__(self, author, message):
        self.date = datetime.datetime.now().isoformat()
        self.author = author    
        self.message = message
        self.retweet = []
        self.hashtags = re.findall(r'#\w+', message)

    def __json__(self):
        return {
            "date": self.date,
            "author": self.author,
            "message": self.message,
            "retweet": self.retweet,
            "hashtags": self.hashtags
        }

tweets = []

@app.route("/", methods=['GET'])
def helloWorld():
    return "Hello World! \n"
    # curl -X GET http://localhost:5000/

@app.route("/seekUser", methods=['POST'])
def seekUser():
    data = request.get_json()
    return { "find": data.get('user') in users }
    # curl -X POST -H "Content-Type: application/json" -d '{"user": "Tom"}' http://localhost:5000/seekUser

@app.route("/register", methods=['POST'])
def registerUser():
    data = request.get_json()
    if not(data.get('user') in users):
        users[data.get('user')] = data.get('password')
        return { "success": True }
    else:
        return { "success": False }
    # curl -X POST -H "Content-Type: application/json" -d '{"user": "Tom", "password": "tomtom"}' http://localhost:5000/register


@app.route("/login", methods=['POST'])
def loginUser():
    data = request.get_json()
    return { "success": login(data.get('user'), data.get('password')) }
    # curl -X POST -H "Content-Type: application/json" -d '{"user": "Tom", "password": "tomtom"}' http://localhost:5000/login

@app.route("/showTweets", methods=['GET'])
def showTweets():
    return { "tweets": [tweet.__json__() for tweet in tweets] }
    # curl -X GET http://localhost:5000/showTweets

@app.route("/newTweet", methods=['POST'])
def newTweet():
    data = request.get_json()
    if login(data.get('user'), data.get('password')):
        tweets.append(Tweet(data.get('user'), data.get('message')))
        return { "success": True }
    else:
        return { "success": False }
    # curl -X POST -H "Content-Type: application/json" -d '{"user": "Tom", "password": "tomtom", "message": "Ceci est un test !"}' http://localhost:5000/newTweet

@app.route("/retweet", methods=['POST'])
def retweet():
    data = request.get_json()
    dataTweet = data.get('tweet')
    print(dataTweet)
    if login(data.get('user'), data.get('password')):
        for tweet in tweets:
            print(tweet.__json__())
            if tweet.__json__() == data.get('tweet'):
                tweet.retweet.append(data.get('user'))
                return { "success": True }
    return { "success": False }
    # curl -X POST -H "Content-Type: application/json" -d '{"user": "Tom", "password": "tomtom", "tweet": {"author": "Tom", "date": "Thu, 16 Mar 2023 16:57:24 GMT", "hashtags": ["#test", "#first"], "message": "Ceci est un test ! #test #first", "retweet": []}}' http://localhost:5000/retweet
