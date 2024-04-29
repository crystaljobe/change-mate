from django.db import models
from event_app.models import Event, UserProfile

# Create your models here.
class Post(models.Model):
    post_orgin = models.ForeignKey(Event, on_delete=models.CASCADE)
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    context = models.CharField(max_length=1000)
    
    
   
   

class Comment(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    content = models.TextField(max_length=150)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')






class Like(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='likes')
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, related_name='likes')
    like = models.IntegerField(default=0, null=True, blank=True)
    
    
   


