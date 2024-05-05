from rest_framework import serializers
from .models import TodoList
from user_app.serializers import NewUserSerializer



class TodoListSerializer(serializers.ModelSerializer):

    
    class Meta:
        model = TodoList
        fields = ['id','assigned_host', 'task', 'completed', 'timestamp']
        read_only_fields = ['timestamp']
        
    def update(self, instance, validated_data):
        instance.assigned_host = validated_data.get('assigned_host', instance.assigned_host)
        instance.completed = validated_data.get('completed', instance.completed)
        return instance