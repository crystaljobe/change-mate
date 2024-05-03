from django.db import models
from event_app.models import Event, UserProfile

# Create your models here.
class Post(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='posts')
    post_orgin = models.CharField(max_length=50, default='ChangeMate')   
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='posts')
    timestamp = models.DateTimeField(auto_now_add=True)
    context = models.TextField(max_length=1000)
    likes = models.IntegerField(default=0)
    dislikes = models.IntegerField(default=0)
    
    
 
    
   
   

class Comment(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    content = models.TextField(max_length=150, null=True, blank=True)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')







    
    
    
    
    

    

        
   


