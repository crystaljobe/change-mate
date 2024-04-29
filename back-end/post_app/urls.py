from django.urls import path
from .views import PostView, CommentView, LikeView


urlpatterns = [
    path('', PostView.as_view(), name='post'),
    path('post/<int:pk>', PostView.as_view(), name='post'),
    path('comment/', CommentView.as_view(), name='comment'),
    path('comment/<int:pk>', CommentView.as_view(), name='comment'),
    path('like/', LikeView.as_view(), name='like'),
    path('like/<int:pk>', LikeView.as_view(), name='like'),
    
]