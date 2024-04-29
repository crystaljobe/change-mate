from django.shortcuts import render, get_object_or_404
from rest_framework import response, status
from rest_framework.views import APIView
from .models import Post, Comment, Like
from .serializers import PostSerializer, CommentSerializer, LikeSerializer
from rest_framework import generics

# Create your views here.

class PostView(APIView):
    
    def get (self, request):
        post = Post.objects.all()
        serializer = PostSerializer(post, many=True)
        return response.Response({'post': serializer.data})
    
    
    def post(self, request):
        post = request.data.get('post')
        
        serializer = PostSerializer(data=post)
        if serializer.is_valid(raise_exception=True):
            post_saved = serializer.save()
        return response.Response({'success': 'Post {} created successfully'.format(post_saved.context)})
    
    
    def put(self, request, pk):
        saved_post = get_object_or_404(Post.objects.all(), pk=pk)
        data = request.data.get('post')
        serializer = PostSerializer(instance=saved_post, data=data, partial=True)
        if serializer.is_valid(raise_exception=True):
            post_saved = serializer.save()
        return response.Response({'success': 'Post {} updated successfully'.format(post_saved.context)})
    
    
    def delete(self, request, pk):
        post = get_object_or_404(Post.objects.all(), pk=pk)
        post.delete()
        return response.Response({'message': 'Post with id {} has been deleted'.format(pk)}, status=status.HTTP_204_NO_CONTENT)


class CommentView(APIView):
    
    def get (self, request):
        comment = Comment.objects.all()
        serializer = CommentSerializer(comment, many=True)
        return response.Response({'comment': serializer.data})
    

    def post(self, request):
        comment = request.data.get('comment')
        
        serializer = CommentSerializer(data=comment)
        if serializer.is_valid(raise_exception=True):
            comment_saved = serializer.save()
        return response.Response({'success': 'Comment {} created successfully'.format(comment_saved.content)})
    
    def put(self, request, pk):
        saved_comment = get_object_or_404(Comment.objects.all(), pk=pk)
        data = request.data.get('comment')
        serializer = CommentSerializer(instance=saved_comment, data=data, partial=True)
        if serializer.is_valid(raise_exception=True):
            comment_saved = serializer.save()
        return response.Response({'success': 'Comment {} updated successfully'.format(comment_saved.content)})
    
    
    def delete(self, request, pk):
        comment = get_object_or_404(Comment.objects.all(), pk=pk)
        comment.delete()
        return response.Response({'message': 'Comment with id {} has been deleted'.format(pk)}, status=status.HTTP_204_NO_CONTENT)
    
    
class LikeView(APIView):
    
    def get (self, request):
        like = Like.objects.all()
        serializer = LikeSerializer(like, many=True)
        return response.Response({'like': serializer.data})
    
    def post(self, request):
        like = request.data.get('like')
        
        serializer = LikeSerializer(data=like)
        if serializer.is_valid(raise_exception=True):
            like_saved = serializer.save()
        return response.Response({'success': 'Like {} created successfully'.format(like_saved.like)})
    
    def put(self, request, pk):
        saved_like = get_object_or_404(Like.objects.all(), pk=pk)
        data = request.data.get('like')
        serializer = LikeSerializer(instance=saved_like, data=data, partial=True)
        if serializer.is_valid(raise_exception=True):
            like_saved = serializer.save()
        return response.Response({'success': 'Like {} updated successfully'.format(like_saved.like)})
    
    def delete(self, request, pk):
        like = get_object_or_404(Like.objects.all(), pk=pk)
        like.delete()
        return response.Response({'message': 'Like with id {} has been deleted'.format(pk)}, status=status.HTTP_204_NO_CONTENT)
    