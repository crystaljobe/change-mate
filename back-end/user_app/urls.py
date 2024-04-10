from django.urls import path
from .views import SignUp, Login, Logout, Info

# Create your urls here.
urlpatterns = [
    path("signup/", SignUp.as_view(), name="signup"),
    path("login/", Login.as_view(), name="login"),
    path("logout/", Logout.as_view(), name="logout"),
    path("user_info/", Info.as_view(), name="user_info"),
]