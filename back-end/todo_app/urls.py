from django.urls import path, register_converter
from .views import TodoListView, ATodoListTask, task_complete, UserTodoListView
from . import views 
from .converter import IntOrStrConverter


register_converter(IntOrStrConverter, 'int_or_str')



urlpatterns = [
    path("", UserTodoListView.as_view(), name='todo'),
    path("event/<int:event_id>/", TodoListView.as_view(), name='event_todo'),
    path("<int:task_id>/", ATodoListTask.as_view(), name='todo_task'),
    path("<int:task_id>/complete/", views.task_complete, name='task_complete'),
]