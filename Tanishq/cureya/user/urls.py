from django.urls import path
from .views import signIn, signup, postsignIn, postsignup, logout, email_verification
from django.contrib.auth import views as auth_views

urlpatterns = [
    path("register/", signup, name="user_register"),
    path("login/", signIn, name="user_login"),
    path("logout/", logout, name="user_logout"),
    path("postsignup/", postsignup, name="post_signup"),
    path("postsignin/", postsignIn, name="post_signin"),
    path("email_verification/", email_verification, name="email_verification")
]
