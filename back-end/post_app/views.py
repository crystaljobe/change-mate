from requests_oauthlib import OAuth1
from rest_framework.decorators import api_view
from user_app.views import TokenReq 
from rest_framework.response import Response
# from django.db import IntegrityError
from django.shortcuts import get_object_or_404, get_list_or_404
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_204_NO_CONTENT,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST
)
from post_app.serializers import EventPostSerializer, CommentSerializer, ViewEventPostSerializer
from post_app.serializers import EventPostSerializer, CommentSerializer, ViewEventPostSerializer
from .models import Post, Comment
from event_app.models import Event, UserProfile
from drf_yasg.utils import swagger_auto_schema
# Create your views here.
class EventPostView(TokenReq):
    
    
    @swagger_auto_schema(
        operation_summary="View all posts for event",
        operation_description="View all posts for selected event.",
        responses={200: EventPostSerializer()},
    )
    def get(self, request, event_id):
        posts = get_list_or_404(Post, event=event_id, post_orgin="Events Page")
        serializer = ViewEventPostSerializer(posts, many=True)
        return Response(serializer.data, status=HTTP_200_OK)


    @swagger_auto_schema(
        operation_summary="Create a new post for event. The post will gerate orgin depending on the urlspattern 1st path parameter (" "). ",
        operation_description="Create a new post for selected event.",
        request_body=EventPostSerializer,
        responses={201: EventPostSerializer()},
    )
    def post(self, request, event_id):
        event = get_object_or_404(Event, pk=event_id)
        user = get_object_or_404(UserProfile, pk=request.user.id)
        data = request.data.copy()
        data['event'] = event.id
        data['post_orgin'] = "Events Page"
        data['comments'] = []
        data['user'] = user.id
        print(data)
        serializer = EventPostSerializer(data=data)
        if serializer.is_valid():
            serializer.save()   
             
            return Response(serializer.data, status=HTTP_201_CREATED)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

    
    
    @swagger_auto_schema(
        operation_summary="Delete a post",
        operation_description="Delete a post for selected event by Id.",
        request_body=EventPostSerializer,
        responses={204: 'No Content'},
    )
    
    def delete(self, request, event_id):
        event = get_object_or_404(Event, pk=event_id)
        posts = get_list_or_404(Post, event=event_id, post_orgin="Events Page", id=request.data['id'])
        for post in posts:
            post.delete()
        return Response(status=HTTP_204_NO_CONTENT)
    


@api_view(['POST'])
def like_post(request, event_id, post_id):
        event = get_object_or_404(Event, pk=event_id)
        post = get_object_or_404(Post, pk=post_id)
        user = get_object_or_404(UserProfile, pk=request.user.id)
        post.likes += 1
        post.save()
        return Response("A like was add",status=HTTP_200_OK)
@api_view(['POST'])   
def dislike_post(request, event_id, post_id):
        event = get_object_or_404(Event, pk=event_id)
        post = get_object_or_404(Post, pk=post_id)
        user = get_object_or_404(UserProfile, pk=request.user.id)
        if post.likes > 0:
            post.likes -= 1
            post.save()
        return Response('A like was sub', status=HTTP_200_OK)
        
   
class CollabPostView(TokenReq):
    
    
    @swagger_auto_schema(
        operation_summary="View all posts for collaborator",
        operation_description="View all posts for selected collaborator.",
        responses={200: ViewEventPostSerializer()},
    )
    def get(self, request, event_id):
        posts = get_list_or_404(Post, event=event_id, post_orgin="Collaborators Page")
        serializer = ViewEventPostSerializer(posts, many=True)
        return Response(serializer.data, status=HTTP_200_OK)   


    @swagger_auto_schema(
        operation_summary="Create a new post for collaborator",
        operation_description="Create a new post for selected collaborator.",
        request_body=EventPostSerializer,
        responses={201: EventPostSerializer()},
    )

    def post(self, request, event_id):
        event = get_object_or_404(Event, id=event_id)
        data = request.data.copy()
        data['event'] = event.id
        data['post_orgin'] = "Collaborators Page"
        data['comments'] = []
        data['user'] = request.user.id
        serializer = EventPostSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            all_posts = get_list_or_404(Post, event=event_id, post_orgin="Collaborators Page")
            ser_posts = ViewEventPostSerializer(all_posts, many=True)
            return Response(ser_posts.data, status=HTTP_201_CREATED)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
    
    @swagger_auto_schema(
        operation_summary="Delete a post",
        operation_description="Delete a post for selected event by Id.",
        request_body= EventPostSerializer,
        responses={204: 'No Content'},
    )

    def delete(self, request, event_id):
        event = get_object_or_404(Event, pk=event_id)
        posts = get_list_or_404(Post, event=event_id, post_orgin="Collaborators Page", id=request.data['id'])
        for post in posts:
            post.delete()
        return Response(status=HTTP_204_NO_CONTENT)
    
class APostView(TokenReq):
    
    @swagger_auto_schema(
        operation_summary="View a post",
        operation_description="View a post for selected event.",
        responses={200: EventPostSerializer()},
    )
    
    def get(self, request, event_id, post_id):
        event = get_object_or_404(Event, pk=event_id)
        post = get_object_or_404(Post, pk=post_id)
        serializer = EventPostSerializer(post)
        return Response(serializer.data, status=HTTP_200_OK)
    
    
    @swagger_auto_schema(
        operation_summary="Update a post",
        operation_description="Update a post for selected event.",
        request_body=EventPostSerializer,
        responses={200: EventPostSerializer()},
    )
    
    def delete(self, request, event_id, post_id):
        event = get_object_or_404(Event, pk=event_id)
        post = get_object_or_404(Post, pk=post_id)
        post.delete()
        all_posts = get_list_or_404(Post, event=event_id, post_orgin="Collaborators Page")
        ser_posts = ViewEventPostSerializer(all_posts, many=True)
        return Response(ser_posts.data, status=HTTP_200_OK)
    
    
 
class CommentView(TokenReq):
    
    @swagger_auto_schema(
        operation_summary="View all comments",
        operation_description="View all comments for selected post.",
        responses={200: CommentSerializer()},
    )
    
    def get(self, request,event_id, post_id):
        comments = get_list_or_404(Comment, post=post_id)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data, status=HTTP_200_OK)
    
    
    @swagger_auto_schema(
        operation_summary="Create a comment",
        operation_description="Create a comment for selected post.",
        request_body=CommentSerializer,
        responses={201: CommentSerializer()},
    )
    
    def post(self, request, event_id, post_id):
        event = get_object_or_404(Event, pk=event_id)
        post = get_object_or_404(Post, pk=post_id)
        user = get_object_or_404(UserProfile, pk=request.user.id)
        content = request.data.copy()
        content['user'] = user.id
        content['post'] = post.id
        serializer = CommentSerializer(data=content)
        if serializer.is_valid():
            serializer.save()
            all_posts = get_list_or_404(Post, event=event_id, post_orgin="Collaborators Page")
            ser_posts = ViewEventPostSerializer(all_posts, many=True)
            return Response(ser_posts.data, status=HTTP_201_CREATED)      
        return Response(serializer.errors, status=HTTP_200_OK)
    

     
class ACommentView(TokenReq):
    @swagger_auto_schema(
        operation_summary="Delete a comment",
        operation_description="Delete a comment for selected post by Id.",
        request_body=CommentSerializer,
        responses={200: EventPostSerializer()},
    )
    def delete(self, request, event_id, comment_id):
        comment = get_object_or_404(Comment, id=comment_id)
        comment.delete()
        all_posts = get_list_or_404(Post, event=event_id, post_orgin="Collaborators Page")
        ser_posts = ViewEventPostSerializer(all_posts, many=True)
        return Response(ser_posts.data, status=HTTP_200_OK)
        