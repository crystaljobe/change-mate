from django.urls import path
from .views import EventPostView, CommentView, APostView, CollabPostView, dislike_post, like_post, ACommentView
from . import views



urlpatterns = [
    path('', EventPostView.as_view(), name='post'),
    path('<int:post_id>/', APostView.as_view(), name='a_post'),
    path('<int:post_id>/comments/', CommentView.as_view(), name='comments'),
    path('comment/<int:comment_id>/', ACommentView.as_view(), name='comment_by_id'),
    path('<int:post_id>/like/', like_post, name='like_post'),
    path('<int:post_id>/dislike/', dislike_post, name='dislike_post'),
    path('collaborators/', CollabPostView.as_view(), name='collaborators'),
]