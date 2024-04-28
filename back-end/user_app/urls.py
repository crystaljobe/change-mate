from django.urls import path
from .views import SignUp, Login, Logout, Info, Register_admin
from changemate_proj.settings import env

# Create your urls here.
urlpatterns = [
    path("signup/", SignUp.as_view(), name="signup"),
    path("login/", Login.as_view(), name="login"),
    path("logout/", Logout.as_view(), name="logout"),
    path("", Info.as_view(), name="user_info"),
    path(f"{env.get('REGISTER_ADMIN')}", Register_admin.as_view(), name="register_admin"),
]