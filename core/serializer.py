from rest_framework import serializers
from . import models


class ClonestagramUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ClonestagramUser
        fields = ['id', 'username', 'email', 'password', 'following',
                  'followers', 'profile_image', 'date_registered']


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Post
        fields = ['id', 'author', 'post_text', 'date_posted']


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Comment
        fields = ['id', 'author', 'post', 'comment', 'time']


class PostImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.PostImage
        fields = ['id', 'post', 'post_image']


class PostLikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.PostLike
        fields = ['id', 'post', 'liked_by']


class CommentLikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CommentLike
        fields = ['id', 'comment', 'liked_by']


class SavedPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.SavedPost
        fields = ['id', 'post', 'saved_by']
