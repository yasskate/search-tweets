from django.shortcuts import render
from django.http import HttpResponse
from .twitter import Twitter
import json

# json
# http://codebeautify.org/jsonvalidator

def index(request):
    return render(request, 'tweets_searcher/index.html')

def search_tweet(request):
    if request.is_ajax():
        word = request.POST.get('word')
        if word:
            twitter = Twitter()
            client = twitter.auth_twitter()
            positivetweets, negativetweets = twitter.get_tweets(word, client)
            return  HttpResponse(json.dumps({"ok":True, "positive": positivetweets, "negative": negativetweets}), content_type='application/json')
        else:
            return  HttpResponse(json.dumps({"ok":False, "error":"el campo esta vacio..."}), content_type='application/json')
    else:
        return  HttpResponse(json.dumps({"ok":False, "error":"Ocurrio un error..."}), content_type='application/json')
