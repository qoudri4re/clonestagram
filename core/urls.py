from django.urls import path
from . import views

urlpatterns = [
    path("signup", views.signup),
    path("login", views.login),
    path("follow", views.follow),
    path("unfollow", views.unfollow),
    path("feed", views.feed),
    path("like", views.like),
    path("comment", views.comment),
    path("savePost", views.savePost),
    path("viewPost/<int:postId>", views.viewPost),
    path("likeComment", views.likeComment)
]
