from flask import Flask, request
from flask_cors import cross_origin

import redis
import json
import datetime
import re
import sys

import socket
host_name = socket.gethostname()
host_ip = socket.gethostbyname(host_name)

app = Flask(__name__)
r = redis.Redis(host='redis', port=6379, db=0, encoding='utf-8', decode_responses=True)

### Api Management

@app.route("/", methods=['GET'])
@cross_origin()
def helloWorld():
	return "Hello World! \n"
	# curl -X GET http://localhost:5000/

@app.route("/healthz", methods=['GET'])
@cross_origin()
def healthz():
	return "200"
	# curl -X GET http://localhost:5000/healthz

### User Management

def login(user, password):
	return r.hexists('users', user) and r.hget('users', user) == password

@app.route("/seekUser", methods=['POST'])
@cross_origin()
def seekUser():
	data = request.get_json()
	return { "find": r.hexists('users', data.get('user')) }
	# curl -X POST -H "Content-Type: application/json" -d '{"user": "Tom"}' http://localhost:5000/seekUser

@app.route("/register", methods=['POST'])
@cross_origin()
def registerUser():
	data = request.get_json()
	if not(r.hexists('users', data.get('user'))):
		r.hset('users', data.get('user'), data.get('password'))
		return { "success": True }
	else:
		return { "success": False }
	# curl -X POST -H "Content-Type: application/json" -d '{"user": "Tom", "password": "tomtom"}' http://localhost:5000/register

@app.route("/login", methods=['POST'])
@cross_origin()
def loginUser():
	data = request.get_json()
	return { "success": login(data.get('user'), data.get('password')) }
	# curl -X POST -H "Content-Type: application/json" -d '{"user": "Tom", "password": "tomtom"}' http://localhost:5000/login

@app.route("/changePassword", methods=['POST'])
@cross_origin()
def changePassword():
	data = request.get_json()
	if login(data.get('user'), data.get('password')):
		r.hset('users', data.get('user'), data.get('newPassword'))
		return { "success": True }
	else:
		return { "success": False }
	# curl -X POST -H "Content-Type: application/json" -d '{"user": "Tom", "password": "tomtom", "newPassword": "itsTom"}' http://localhost:5000/changePassword

### Tweets management

@app.route("/newTweet", methods=['POST'])
@cross_origin()
def newTweet():
	data = request.get_json()
	if login(data.get('user'), data.get('password')):
		tweet_id = r.llen('tweets')
		tweet_data = {
			"id": tweet_id,
			"author": data.get('user'),
			"date": datetime.datetime.now().isoformat(),
			"hashtags": re.findall(r'#\w+', data.get('message')),
			"message": data.get('message'),
			"retweets": []
		}

		r.set(f'tweet:{tweet_id}', json.dumps(tweet_data))
		r.lpush('tweets', tweet_id)

		r.lpush(f'user:{data.get("user")}', tweet_id)
		for hashtag in tweet_data["hashtags"]:
			r.lpush(f'hashtag:{hashtag}', tweet_id)
			if r.lpos('hashtags', hashtag) is None:
				r.lpush('hashtags', hashtag)

		return { "success": True }
	else:
		return { "success": False }
	# curl -X POST -H "Content-Type: application/json" -d '{"user": "Tom", "password": "tomtom", "message": "Ceci est un test ! #test"}' http://localhost:5000/newTweet

@app.route("/retweet", methods=['POST'])
@cross_origin()
def retweet():
	data = request.get_json()
	if login(data.get('user'), data.get('password')):
		tweet_data = json.loads(r.get(f"tweet:{data.get('tweet_id')}"))
		if not data.get('user') in tweet_data["retweets"]:
			tweet_data["retweets"].append(data.get('user'))
			r.set(f'tweet:{data.get("tweet_id")}', json.dumps(tweet_data))

			if r.lpos(f'user:{data.get("user")}', data.get('tweet_id')) is None:
				r.lpush(f'user:{data.get("user")}', data.get('tweet_id'))

			return { "success": True }
	return { "success": False }
	# curl -X POST -H "Content-Type: application/json" -d '{"user": "Tom", "password": "tomtom", "tweet_id": 0}' http://localhost:5000/retweet

### Viewing tweets

@app.route("/showTweets", methods=['GET'])
@cross_origin()
def showTweets():
	return { "tweets": [json.loads(r.get(f"tweet:{tweet_id}")) for tweet_id in r.lrange('tweets', 0, -1)] }
	# curl -X GET http://localhost:5000/showTweets

@app.route("/showUserTweets", methods=['POST'])
@cross_origin()
def showUserTweets():
	data = request.get_json()
	return { "tweets": [json.loads(r.get(f"tweet:{tweet_id}")) for tweet_id in r.lrange(f'user:{data.get("user")}', 0, -1)] }
	# curl -X POST -H "Content-Type: application/json" -d '{"user": "Tom"}' http://localhost:5000/showUserTweets

@app.route("/showHashtags", methods=['GET'])
@cross_origin()
def showHashtags():
	return { "hashtags": r.lrange('hashtags', 0, -1) }
	# curl -X GET http://localhost:5000/showHashtags

@app.route("/showHashtagTweets", methods=['POST'])
@cross_origin()
def showHashtagTweets():
	data = request.get_json()
	return { "tweets": [json.loads(r.get(f"tweet:{tweet_id}")) for tweet_id in r.lrange(f'hashtag:{data.get("hashtag")}', 0, -1)] }
	# curl -X POST -H "Content-Type: application/json" -d '{"hashtag": "#test"}' http://localhost:5000/showHashtagTweets

@app.route("/searchRelatedTweets", methods=['POST'])
@cross_origin()
def searchRelatedTweets():
	data = request.get_json()
	response = {
		"type": "",
		"tweets": []
	}

	if data.get("search") and data.get("search")[0] == '#':
		response["type"] = "hashtag"
		response["tweets"] = [json.loads(r.get(f"tweet:{tweet_id}")) for tweet_id in r.lrange(f'hashtag:{data.get("search")}', 0, -1)]

	else:
		response["type"] = "user"
		response["tweets"] = [json.loads(r.get(f"tweet:{tweet_id}")) for tweet_id in r.lrange(f'user:{data.get("search")}', 0, -1)]

	return response

	# curl -X POST -H "Content-Type: application/json" -d '{"search": "#test"}' http://localhost:5000/searchRelatedTweets
	# curl -X POST -H "Content-Type: application/json" -d '{"search": "Tom"}' http://localhost:5000/searchRelatedTweets

### Main

if __name__ == '__main__':
	print(" * Starting api.py")

	if len(sys.argv) > 1:
		if sys.argv[1] == "check_syntax":
			print(" * Build [ OK ]")
			exit(0)
		else:
			print(" * Passed argument not supported ! Supported argument : check_syntax")
			exit(1)

	if not r.ping():
		print(" * The api failed to reach the data storage (redis)")
		exit(1)
	else:
		print(" * The api succeeded to reach the data storage (redis)")
		app.run(host=host_ip, debug=True)
