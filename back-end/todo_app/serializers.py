from rest_framework import serializers
from .models import TodoList


class TodoListSerializer(serializers.ModelSerializer):
   
    class Meta:
        model = TodoList
        fields = "__all__"
        read_only_fields = ['timestamp']

   
class GetTodoListSerializer(serializers.ModelSerializer):
    assigned_host = serializers.SerializerMethodField()
    
    class Meta:
        model = TodoList
        fields = ['id','assigned_host', 'task', 'completed', 'event', 'timestamp']
        read_only_fields = ['timestamp']

    def get_assigned_host(self, obj):
        return {"id": obj.assigned_host.id, "display_name": obj.assigned_host.display_name}
        
   