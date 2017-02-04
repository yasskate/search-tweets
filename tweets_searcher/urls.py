#-*- coding: utf-8 -*-
from django.conf.urls import url, include
from . import views

urlpatterns = [
        url(r'^$', views.index),
        url(r'^search/tweet/$', views.search_tweet, name='search_tweet')
]
