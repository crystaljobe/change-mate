from rest_framework import serializers

from user_app.serializers import NewUserSerializer
from .models import Post, Comment
        
        
class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id','user', 'post','timestamp','content']
        



class EventPostSerializer(serializers.ModelSerializer):
    
    comments = CommentSerializer(many=True, read_only=True)
    class Meta:
        model = Post
        fields = ['id','post_orgin','timestamp', 'context', 'comments', 'likes', 'dislikes']
    
   
    
        
class CollabPostSerializer(serializers.ModelSerializer):
    
    comments = CommentSerializer(many=True, read_only=True)
    class Meta:
        model = Post
        fields = ['id','post_orgin','timestamp', 'context', 'comments']
    
   


        
