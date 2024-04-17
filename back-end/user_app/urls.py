from django.urls import path
from .views import SignUp, Login, Logout, Info 
# MasterUser

# Create your urls here.
urlpatterns = [
    path("signup/", SignUp.as_view(), name="signup"),
    path("login/", Login.as_view(), name="login"),
    path("logout/", Logout.as_view(), name="logout"),
    path("", Info.as_view(), name="user_info"),
    # path('master/', MasterUser.as_view(), name='master'),
]