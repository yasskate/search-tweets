import oauth2 as oauth

# python example
# https://www.youtube.com/watch?v=Syiiyxo9vj0

# twitter API
# https://dev.twitter.com/rest/public/search
# https://dev.twitter.com/rest/public

# Sentiment analysis
# https://dev.twitter.com/overview/general
# JS example
# https://www.youtube.com/watch?v=nHnvakuLxUA


class Twitter:
    def auth_twitter(self):
         consumer_key = "fOPHMbQQjAiUtrBwXEywbj064"
         consumer_secret = "fINh7QLJ4DHeVCRnB2z8M6E8fSCojSPUgdaLEYu7MGvLIwBudf"
         access_token = "1888950738-O7PczwUICPszJYa3xtr3LXJBowPX44iZXVWl5a9"
         access_token_secret = "LYcVCJ3QKumshMrD85q5SVHz0ePfEf2tWHPghIhCduHNi"

         consumer = oauth.Consumer(key=consumer_key, secret=consumer_secret)
         access_token = oauth.Token(key=access_token, secret=access_token_secret)
         client = oauth.Client(consumer, access_token)

         return client

    def get_tweets(self, word, client):
        # colimaCoords = 19.0974896,-104.6489765
        # urlSearchHashtag = "https://api.twitter.com/1.1/search/tweets.json" &geocode=colimaCoords
        # El filtro de tweets acepta como maximo 100

        pWord = word+" :)"
        nWord = word+" :("

        twitterAPI = "https://api.twitter.com/1.1/search/tweets.json?q=%s&result_type=recent&count=100" %pWord
        resp, positiveContent = client.request(twitterAPI)

        twitterAPI = "https://api.twitter.com/1.1/search/tweets.json?q=%s&result_type=recent&count=100" %nWord
        resp, negativeContent = client.request(twitterAPI)


        return positiveContent, negativeContent
