from django.shortcuts import render
from rest_framework import response, status
from rest_framework.views import APIView
from .models import Post, Comment, Like
from .serializers import PostSerializer, CommentSerializer, LikeSerializer
from rest_framework import generics

# Create your views here.

class PostView(generics.ListCreateAPIView):
    pass
