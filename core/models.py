from django.db import models

# Create your models here.


def get_default_following():
    return {"following": []}


def get_default_followers():
    return {"followers": []}


class ClonestagramUser(models.Model):
    username = models.CharField(max_length=200)
    email = models.EmailField()
    password = models.CharField(max_length=250)
    following = models.JSONField(default=get_default_following)
    followers = models.JSONField(default=get_default_followers)
    profile_image = models.CharField(max_length=500, default="default")
    date_registered = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['id']

    def __str__(self):
        return self.username


class Post(models.Model):
    author = models.ForeignKey(ClonestagramUser, on_delete=models.CASCADE)
    post_text = models.TextField()
    date_posted = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['id']

    def __str__(self):
        return self.post_text


class PostImage(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    post_image = models.JSONField(encoder=None)

    class Meta:
        ordering = ['id']


class Comment(models.Model):
    author = models.ForeignKey(ClonestagramUser, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    comment = models.TextField()
    time = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['id']

    def __str__(self):
        return self.comment


class PostLike(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    liked_by = models.ForeignKey(ClonestagramUser, on_delete=models.CASCADE)

    class Meta:
        ordering = ['id']


class CommentLike(models.Model):
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE)
    liked_by = models.ForeignKey(ClonestagramUser, on_delete=models.CASCADE)

    class Meta:
        ordering = ['id']


class SavedPost(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    saved_by = models.ForeignKey(ClonestagramUser, on_delete=models.CASCADE)

    class Meta:
        ordering = ['id']
