from django.contrib import admin
from . import models


class ClonestagramUserAdmin(admin.ModelAdmin):
    list_display = ['id', 'username', 'email', 'password', 'following',
                    'followers', 'profile_image', 'date_registered']


class PostAdmin(admin.ModelAdmin):
    list_display = ['id', 'author', 'post_text', "date_posted"]


class PostImageAdmin(admin.ModelAdmin):
    list_display = ['id', 'post', 'post_image']


class CommentAdmin(admin.ModelAdmin):
    list_display = ['id', "author", 'post', 'comment', 'time']


class PostLikeAdmin(admin.ModelAdmin):
    list_display = ['id', "post", "liked_by"]


class CommentLikeAdmin(admin.ModelAdmin):
    list_display = ['id', "comment", "liked_by"]


class SavedPostAdmin(admin.ModelAdmin):
    list_display = ['id', 'post', 'saved_by']


admin.site.register(models.ClonestagramUser, ClonestagramUserAdmin)
admin.site.register(models.Post, PostAdmin)
admin.site.register(models.PostImage, PostImageAdmin)
admin.site.register(models.Comment, CommentAdmin)
admin.site.register(models.PostLike, PostLikeAdmin)
admin.site.register(models.CommentLike, CommentLikeAdmin)
admin.site.register(models.SavedPost)
