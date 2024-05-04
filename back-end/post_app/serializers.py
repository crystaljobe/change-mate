from rest_framework import serializers
from .models import Post, Comment
from profile_app.serializers import BasicUserDataSerializer
from event_app.serializers import EventCardSerializer


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'


class ViewCommentSerializer(serializers.ModelSerializer):
    user = BasicUserDataSerializer()

    class Meta:
        model = Comment
        fields = ['id', 'user', 'timestamp', 'content']




class EventPostSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    class Meta:
        model = Post
        fields = '__all__'



class ViewEventPostSerializer(serializers.ModelSerializer):
    user = BasicUserDataSerializer()
    comments = ViewCommentSerializer(many=True)

    class Meta:
        model = Post
        fields = ['id','user', 'timestamp', 'context','comments', 'likes', 'dislikes']