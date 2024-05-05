from rest_framework import serializers
from .models import TodoList
from user_app.serializers import NewUserSerializer



class TodoListSerializer(serializers.ModelSerializer):

    
    class Meta:
        model = TodoList
        fields = ['id','assigned_host', 'task', 'completed', 'timestamp']
        read_only_fields = ['timestamp']
        
   