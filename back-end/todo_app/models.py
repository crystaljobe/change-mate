from django.db import models
from event_app.models import  UserProfile, Event


# Create your models here.
class TodoList(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='todo_list')
    task = models.CharField(max_length=150)
    assigned_host = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='assigned_tasks')
    completed = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True)


   