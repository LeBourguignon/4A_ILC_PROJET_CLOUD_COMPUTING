import redis
import json
import datetime
import re

print("Starting the data loading script")

r = redis.Redis(host='localhost', port=6379, db=0, encoding='utf-8', decode_responses=True)

if not r.ping():
	print(" * The script failed to reach the data storage (redis)")
	exit(1)
else:
	print(" * The script succeeded to reach the data storage (redis)")

def registerUser(user, password):
	if not(r.hexists('users', user)):
		r.hset('users', user, password)

def login(user, password):
	return r.hexists('users', user) and r.hget('users', user) == password

def newTweet(user, password, message):
	if login(user, password):
		tweet_id = r.llen('tweets')
		tweet_data = {
			"id": tweet_id,
			"author": user,
			"date": datetime.datetime.now().isoformat(),
			"hashtags": re.findall(r'#\w+', message),
			"message": message,
			"retweets": []
		}

		r.set(f'tweet:{tweet_id}', json.dumps(tweet_data))
		r.lpush('tweets', tweet_id)

		r.lpush(f'user:{user}', tweet_id)
		for hashtag in tweet_data["hashtags"]:
			r.lpush(f'hashtag:{hashtag}', tweet_id)
			if r.lpos('hashtags', hashtag) is None:
				r.lpush('hashtags', hashtag)

def retweet(user, password, tweet_id):
	if login(user, password):
		tweet_data = json.loads(r.get(f"tweet:{tweet_id}"))
		if not user in tweet_data["retweets"]:
			tweet_data["retweets"].append(user)
			r.set(f'tweet:{tweet_id}', json.dumps(tweet_data))

			if r.lpos(f'user:{user}', tweet_id) is None:
				r.lpush(f'user:{user}', tweet_id)

print(" * Loading users")

registerUser("Baptiste", "Andres")
registerUser("Tom", "Roth")

print(" * Loading Tweets")

newTweet("Baptiste", "Andres", "C'est le premier message! #first")

newTweet("Baptiste", "Andres", "#un")
newTweet("Tom", "Roth", "#deux #first")
newTweet("Baptiste", "Andres", "#trois")
newTweet("Tom", "Roth", "#quatre")
newTweet("Baptiste", "Andres", "#cinq")
newTweet("Tom", "Roth", "#six")
newTweet("Baptiste", "Andres", "#sept")
newTweet("Tom", "Roth", "#huit")
newTweet("Baptiste", "Andres", "#neuf")
newTweet("Tom", "Roth", "#dix")

print(" * Loading retweets")

retweet("Baptiste", "Andres", 0)
retweet("Tom", "Roth", 0)

retweet("Baptiste", "Andres", 10)
retweet("Tom", "Roth", 9)

print(" * End of loading")