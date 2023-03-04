from . import models
from .serializer import ClonestagramUserSerializer, PostSerializer, PostImageSerializer, PostLikeSerializer, CommentLikeSerializer, CommentSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
import jwt
import datetime
from dotenv import dotenv_values
config = dotenv_values(".env")

JWT_KEY = config['JWT_KEY']


@api_view(["POST"])
def signup(request):
    username = request.data['username']
    email = request.data['email']
    password = request.data['password']

    if username and email and password:
        errors = []
        usernameExist = models.ClonestagramUser.objects.filter(
            username=username)
        emailExist = models.ClonestagramUser.objects.filter(email=email)

        if usernameExist:
            errors.append("username already exist")
        if emailExist:
            errors.append("email already exist")

        if len(errors):
            return Response({"error": errors})
        else:
            serializer = ClonestagramUserSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                payload = {
                    "username": serializer.data['username'],
                    "userId": serializer.data['id'],
                    "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=60)
                }
                jwtToken = jwt.encode(payload, JWT_KEY, algorithm='HS256')
                return Response({"userDetails": {"userId": serializer.data['id'], "username": serializer.data['username'], "jwtToken": jwtToken}})
            else:
                for key in serializer.errors.keys():
                    errors.append(serializer.errors[key][0])
                return Response({"error": errors})
    else:
        return Response({"error": "All input fields must be filled"})


@api_view(["POST"])
def login(request):
    username = request.data['username']
    password = request.data['password']
    if username and password:
        try:
            user = models.ClonestagramUser.objects.get(username=username)
            serializer = ClonestagramUserSerializer(user)
            if serializer.data['password'] == password:
                payload = {
                    "username": serializer.data['username'],
                    "userId": serializer.data['id'],
                    "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=60)
                }
                jwtToken = jwt.encode(payload, JWT_KEY, algorithm='HS256')
                return Response({"userDetails": {"userId": serializer.data['id'], "username": serializer.data['username'], "jwtToken": jwtToken}})
            else:
                return Response({"error": "Invalid username or password"})
        except models.ClonestagramUser.DoesNotExist:
            return Response({"error": "Invalid username or password"})
    else:
        return Response({"error": "All input fields must be filled"})


@api_view(["POST"])
def follow(request):

    userToFollowId = request.data['userToFollowId']

    try:
        jwtToken = request.headers['Authorization']
        try:
            userDetails = jwt.decode(jwtToken, JWT_KEY, algorithms=['HS256'])
        except:
            return Response({"error": "invalid token"})
    except KeyError:
        return Response({"error": "invalid token"})

    try:
        userToFollow = models.ClonestagramUser.objects.get(id=userToFollowId)
    except models.ClonestagramUser.DoesNotExist:
        return Response({"deletedUserToFollow": "deleted user"})

    try:
        userTryingToFollow = models.ClonestagramUser.objects.get(
            id=userDetails['userId'])
    except models.ClonestagramUser.DoesNotExist:
        return Response({"deletedUserTryingTofollow": "deleted user"})

    userToFollowSerializer = ClonestagramUserSerializer(userToFollow)
    userTryingToFollowSerializer = ClonestagramUserSerializer(
        userTryingToFollow)

    userToFollowFollowers = userToFollowSerializer.data['followers']
    userTryingToFollowFollowing = userTryingToFollowSerializer.data['following']
    if userTryingToFollowSerializer.data['id'] in userToFollowFollowers['followers']:
        return Response({"following": "following user already"})
    userToFollowFollowers['followers'].append(
        userTryingToFollowSerializer.data['id'])
    userTryingToFollowFollowing['following'].append(
        userToFollowSerializer.data['id'])

    userToFollowSerializer = ClonestagramUserSerializer(
        userToFollow, data={'followers': userToFollowFollowers}, partial=True)
    userTryingToFollowSerializer = ClonestagramUserSerializer(
        userTryingToFollow, data={'following': userTryingToFollowFollowing}, partial=True)

    if userToFollowSerializer.is_valid() and userTryingToFollowSerializer.is_valid():
        userToFollowSerializer.save()
        userTryingToFollowSerializer.save()
        return Response({"followed": True})
    else:
        return Response({"serverError": "Invalid data"})


@api_view(["POST"])
def unfollow(request):
    userToUnfollowId = request.data['userToUnfollowId']
    print(userToUnfollowId)

    try:
        jwtToken = request.headers['Authorization']
        try:
            userDetails = jwt.decode(jwtToken, JWT_KEY, algorithms=['HS256'])
        except:
            return Response({"error": "invalid token"})
    except KeyError:
        return Response({"error": "invalid token"})

    try:
        userToUnfollow = models.ClonestagramUser.objects.get(
            id=userToUnfollowId)
    except models.ClonestagramUser.DoesNotExist:
        return Response({"deletedUserToUnfollow": "deleted user"})

    try:
        userTryingToUnfollow = models.ClonestagramUser.objects.get(
            id=userDetails['userId'])
    except models.ClonestagramUser.DoesNotExist:
        return Response({"deletedUserTryingToUnfollow": "deleted user"})

    userToUnfollowSerializer = ClonestagramUserSerializer(userToUnfollow)
    userTryingToUnfollowSerializer = ClonestagramUserSerializer(
        userTryingToUnfollow)

    userToUnfollowFollowers = userToUnfollowSerializer.data['followers']
    userTryingToUnfollowFollowing = userTryingToUnfollowSerializer.data['following']

    if userTryingToUnfollowSerializer.data['id'] not in userToUnfollowFollowers['followers']:
        return Response({"notFollowing": "Not following user"})
    userToUnfollowFollowers['followers'].remove(
        userTryingToUnfollowSerializer.data['id'])
    userTryingToUnfollowFollowing['following'].remove(
        userToUnfollowSerializer.data['id'])

    userToUnfollowSerializer = ClonestagramUserSerializer(
        userToUnfollow, data={'followers': userToUnfollowFollowers}, partial=True)
    userTryingToUnfollowSerializer = ClonestagramUserSerializer(
        userTryingToUnfollow, data={'following': userTryingToUnfollowFollowing}, partial=True)
    if userToUnfollowSerializer.is_valid() and userTryingToUnfollowSerializer.is_valid():
        userToUnfollowSerializer.save()
        userTryingToUnfollowSerializer.save()
        return Response({"unfollowed": True})
    return Response({"serverError": "invalid data"})


@api_view(["GET"])
def feed(request):
    try:
        jwtToken = request.headers['Authorization']

        try:
            userDetails = jwt.decode(jwtToken, JWT_KEY, algorithms=['HS256'])
        except:
            return Response({"error": "invalid token"})
    except KeyError:
        return Response({"error": "invalid token"})

    try:
        user = models.ClonestagramUser.objects.get(id=userDetails['userId'])
    except models.ClonestagramUser.DoesNotExist:
        return Response({"error": "user does not exist"})

    userSerializer = ClonestagramUserSerializer(user)
    user_followings_id = userSerializer.data['following']['following']
    posts = []

    for userId in user_followings_id:
        currentUser = models.ClonestagramUser.objects.get(id=userId)
        currentUserSerializer = ClonestagramUserSerializer(currentUser)
        userPosts = models.Post.objects.filter(author=currentUser)
        for post in userPosts:
            userPostSerializer = PostSerializer(post)
            postImages = models.PostImage.objects.get(post=post)
            postImagesSerializer = PostImageSerializer(postImages)
            comments = models.Comment.objects.filter(post=post)
            postLikes = models.PostLike.objects.filter(post=post)

            try:
                models.SavedPost.objects.get(
                    post=post, saved_by=userDetails['userId'])
                savedPost = True
            except models.SavedPost.DoesNotExist:
                savedPost = False

            try:
                models.PostLike.objects.get(
                    post=post, liked_by=userDetails['userId'])
                postLiked = True
            except models.PostLike.DoesNotExist:
                postLiked = False

            commentData = []
            likesData = []
            for postLike in postLikes:
                postLikeSerializer = PostLikeSerializer(postLike)
                likeData = {
                    "likeId": postLikeSerializer.data['id'],
                    "likeAuthorId": postLikeSerializer.data['liked_by']
                }
                likesData.append(likeData)

            # commentLikesData = []
            for comment in comments:
                commentSerializer = CommentSerializer(comment)
                commentLikes = models.CommentLike.objects.filter(
                    comment=comment)
                commentLikesData = []
                for commentLike in commentLikes:
                    commentLikeSerializer = CommentLikeSerializer(commentLike)
                    commentLikeData = {
                        "likeId": commentLikeSerializer.data['id'],
                        "likeAuthorId": commentLikeSerializer.data['liked_by']
                    }
                    commentLikesData.append(commentLikeData)
                comment_data = {
                    "commentId": commentSerializer.data['id'],
                    "authorId": commentSerializer.data['author'],
                    "comment": commentSerializer.data['comment'],
                    "time": commentSerializer.data['time'],
                    "commentLikes": commentLikesData
                }
                commentData.append(comment_data)

            post_data = {
                "postId": userPostSerializer.data['id'],
                "postText": userPostSerializer.data['post_text'],
                "time": userPostSerializer.data['date_posted'],
                "author": currentUserSerializer.data['username'],
                "authorId": currentUserSerializer.data['id'],
                "profileImage": currentUserSerializer.data['profile_image'],
                "postImagesId": postImagesSerializer.data['id'],
                "images": postImagesSerializer.data['post_image']['images'],
                "likes": likesData,
                "comments": commentData,
                "savedPost": savedPost,
                "followingAuthor": True,
                "postLiked": postLiked
            }

            posts.append(post_data)

    return Response({"posts": posts})


@api_view(["POST"])
def like(request):
    try:
        jwtToken = request.headers['Authorization']
        try:
            userDetails = jwt.decode(jwtToken, JWT_KEY, algorithms=['HS256'])
        except:
            return Response({"error": "invalid token"})
    except KeyError:
        return Response({"error": "invalid token"})

    try:
        user = models.ClonestagramUser.objects.get(id=userDetails['userId'])
    except models.ClonestagramUser.DoesNotExist:
        return Response({"deletedUser": "user does not exist"})

    postId = request.data['postId']

    try:
        post = models.Post.objects.get(id=postId)
        try:
            # if a user likes more than one post
            like = models.PostLike.objects.get(liked_by=user, post=post)
            like.delete()
            likes = models.PostLike.objects.filter(post=post)
            newLikes = []
            for like in likes:
                likeSerializer = PostLikeSerializer(like)
                newLikes.append(
                    {"likeId": likeSerializer.data['id'], "likeAuthorId": likeSerializer.data['liked_by']})
            return Response({"likes": newLikes, "postLiked": False})
        except models.PostLike.DoesNotExist:
            like = models.PostLike.objects.create(post=post, liked_by=user)
            likeSerializer = PostLikeSerializer(like)
            like.save()
            likes = models.PostLike.objects.filter(post=post)
            newLikes = []
            for like in likes:
                likeSerializer = PostLikeSerializer(like)
                newLikes.append(
                    {"likeId": likeSerializer.data['id'], "likeAuthorId": likeSerializer.data['liked_by']})
            return Response({"likes": newLikes, "postLiked": True})

    except models.Post.DoesNotExist:
        return Response({"deletedPost": "post deleted"})


@api_view(["POST", "GET", "PUT", "DELETE"])
def comment(request):
    try:
        jwtToken = request.headers['Authorization']
        try:
            userDetails = jwt.decode(jwtToken, JWT_KEY, algorithms=['HS256'])
        except:
            return Response({"error": "invalid token"})
    except KeyError:
        return Response({"error": "invalid token"})

    postId = request.data['postId']
    user = models.ClonestagramUser.objects.get(id=userDetails['userId'])

    if request.method == "POST":
        comment_text = request.data['comment']

        try:
            post = models.Post.objects.get(id=postId)
        except models.Post.DoesNotExist:
            return Response({"deletedPost": "deleted post"})

        comment = models.Comment.objects.create(
            author=user, post=post, comment=comment_text)
        comment.save()
        comments = models.Comment.objects.filter(post=post)
        newComments = []

        for comment in comments:
            commentSerializer = CommentSerializer(comment)
            commentLikes = models.CommentLike.objects.filter(comment=comment)

            newCommentLikesData = []
            for commentLike in commentLikes:
                commentLikeSerializer = CommentLikeSerializer(commentLike)
                commentLikeData = {
                    "likeId": commentLikeSerializer.data['id'],
                    "likeAuthorId": commentLikeSerializer.data['liked_by']
                }
                newCommentLikesData.append(commentLikeData)

            try:
                models.CommentLike.objects.get(comment=comment, liked_by=user)
                commentLiked = True
            except models.CommentLike.DoesNotExist:
                commentLiked = False

            commentData = {
                "commentId": commentSerializer.data['id'],
                "authorId": commentSerializer.data['author'],
                "profileImage": comment.author.profile_image,
                "author": comment.author.username,
                "comment": commentSerializer.data['comment'],
                "time": commentSerializer.data['time'],
                "commentLikes": newCommentLikesData,
                "liked": commentLiked
            }
            newComments.append(commentData)
        return Response({"newComments": newComments})

    elif request.method == "GET":
        try:
            post = models.Post.objects.get(id=postId)
        except models.Post.DoesNotExist:
            return Response({"deleted": "deleted post"})

        comments = models.Comment.objects.filter(post=post)
        commentsWithLikes = []

        for comment in comments:
            commentSerializer = CommentSerializer(comment)
            commentLikes = models.CommentLike.objects.filter(comment=comment)

            commentLikesData = []
            for commentLike in commentLikes:
                commentLikeSerializer = CommentLikeSerializer(commentLike)
                commentLikeData = {
                    "likeId": commentLikeSerializer.data['id'],
                    "likeAuthorId": commentLikeSerializer.data['liked_by']
                }
                commentLikesData.append(commentLikeData)

            try:
                models.CommentLike.objects.get(comment=comment, liked_by=user)
                commentLiked = True
            except models.CommentLike.DoesNotExist:
                commentLiked = False

            commentData = {
                "commentId": commentSerializer.data['id'],
                "authorId": commentSerializer.data['author'],
                "comment": commentSerializer.data['comment'],
                "time": commentSerializer.data['time'],
                "commentLikes": commentLikesData,
                "liked": commentLiked
            }
            commentsWithLikes.append(commentData)
        return Response({"comments": commentsWithLikes})

    elif request.method == "PUT":
        commentId = request.data['commentId']
        try:
            post = models.Post.objects.get(id=postId)
        except models.Post.DoesNotExist:
            return Response({"deletedPost": "deleted post"})

        try:
            comment = models.Comment.objects.get(id=commentId)
        except models.Comment.DoesNotExist:
            return Response({"deletedComment": "deleted"})

        newComment = request.data['comment']
        commentSerializer = CommentSerializer(
            comment, data={"comment": newComment}, partial=True)
        if commentSerializer.is_valid():
            commentSerializer.save()
        else:
            return Response({"error": "something went wrong"})

        newCommentLikes = models.CommentLike.objects.filter(comment=comment)
        newCommentLikesData = []
        for newCommentLike in newCommentLikes:
            commentLikeSerializer = CommentLikeSerializer(newCommentLike)
            newCommentLikesData.append({
                "likeId": commentLikeSerializer.data['id'],
                "likeAuthorId": commentLikeSerializer.data['liked_by']
            })

        try:
            models.CommentLike.objects.get(comment=comment, liked_by=user)
            commentLiked = True
        except models.CommentLike.DoesNotExist:
            commentLiked = False

        commentData = {
            "commentId": commentSerializer.data['id'],
            "authorId": commentSerializer.data['author'],
            "comment": commentSerializer.data['comment'],
            "time": commentSerializer.data['time'],
            "commentLikes": newCommentLikesData,
            "liked": commentLiked
        }
        return Response({"comment": commentData})

    else:
        commentId = request.data['commentId']
        try:
            comment = models.Comment.objects.get(id=commentId)
        except models.Comment.DoesNotExist:
            return Response({"deletedComment": "comment deleted"})

        comment.delete()
        return Response({"deleted": True})


@api_view(["GET"])
def viewPost(request, postId):

    try:
        jwtToken = request.headers['Authorization']
        try:
            userDetails = jwt.decode(jwtToken, JWT_KEY, algorithms=['HS256'])
        except:
            return Response({"error": "invalid token didnt pass jwt"})
    except KeyError:
        return Response({"error": "invalid token no token header"})

    try:
        post = models.Post.objects.get(id=postId)
    except models.Post.DoesNotExist:
        return Response({"deletedPost": "deleted post"})

    comments = models.Comment.objects.filter(post=post)
    postImages = models.PostImage.objects.get(post=post)
    postImagesSerializer = PostImageSerializer(postImages)
    postSerializer = PostSerializer(post)
    commentSerializer = CommentSerializer(comments, many=True)
    postLikes = models.PostLike.objects.filter(post=post)
    postAuthor = models.ClonestagramUser.objects.get(id=post.author.id)
    userSerializer = ClonestagramUserSerializer(postAuthor)
    try:
        models.SavedPost.objects.get(post=post, saved_by=userDetails['userId'])
        savedPost = True
    except models.SavedPost.DoesNotExist:
        savedPost = False

    try:
        models.PostLike.objects.get(post=post, liked_by=userDetails['userId'])
        postLiked = True
    except models.PostLike.DoesNotExist:
        postLiked = False

    commentData = []
    likesData = []
    for postLike in postLikes:
        postLikeSerializer = PostLikeSerializer(postLike)
        likeData = {
            "likeId": postLikeSerializer.data['id'],
            "likeAuthorId": postLikeSerializer.data['liked_by']
        }
        likesData.append(likeData)
    for comment in comments:
        commentSerializer = CommentSerializer(comment)
        # review this later
        try:
            models.CommentLike.objects.get(
                comment=comment, liked_by=userDetails['userId'])
            liked = True
        except models.CommentLike.DoesNotExist:
            liked = False

        commentLikes = models.CommentLike.objects.filter(comment=comment)
        commentLikesData = []
        for commentLike in commentLikes:
            commentLikeSerializer = CommentLikeSerializer(commentLike)
            commentLikeData = {
                "likeId": commentLikeSerializer.data['id'],
                "likeAuthorId": commentLikeSerializer.data['liked_by']
            }
            commentLikesData.append(commentLikeData)
        comment_data = {
            "commentId": commentSerializer.data['id'],
            "authorId": commentSerializer.data['author'],
            "author": comment.author.username,
            "profileImage": comment.author.profile_image,
            "comment": commentSerializer.data['comment'],
            "time": commentSerializer.data['time'],
            "commentLikes": commentLikesData,
            "liked": liked
        }
        commentData.append(comment_data)
    post_data = {
        "postId": postSerializer.data['id'],
        "postText": postSerializer.data['post_text'],
        "time": postSerializer.data['date_posted'],
        "author": userSerializer.data['username'],
        "authorId": userSerializer.data['id'],
        "profileImage": userSerializer.data['profile_image'],
        "postImagesId": postImagesSerializer.data['id'],
        "postImages": postImagesSerializer.data['post_image']['images'],
        "likes": likesData,
        "comments": commentData,
        "savedPost": savedPost,
        "followingAuthor": True,
        "postLiked": postLiked
    }
    return Response({"postData": post_data})


@api_view(['POST'])
def likeComment(request):
    try:
        jwtToken = request.headers['Authorization']
        try:
            userDetails = jwt.decode(jwtToken, JWT_KEY, algorithms=['HS256'])
        except:
            return Response({"error": "invalid token"})
    except KeyError:
        return Response({"error": "invalid token"})

    commentId = request.data['commentId']

    try:
        comment = models.Comment.objects.get(id=commentId)
    except models.Comment.DoesNotExist:
        return Response({"deletedComment": "comment deleted"})

    try:
        user = models.ClonestagramUser.objects.get(id=userDetails['userId'])
    except models.ClonestagramUser.DoesNotExist:
        return Response({"deletedUser": "user does not exist"})

    try:
        commentLike = models.CommentLike.objects.get(
            comment=comment, liked_by=user)
        commentLike.delete()
        commentLikes = models.CommentLike.objects.filter(comment=comment)

        newCommentLikesData = []
        for commentLike in commentLikes:
            commentLikeSerializer = CommentLikeSerializer(commentLike)
            commentLikeData = {
                "likeId": commentLikeSerializer.data['id'],
                "likeAuthorId": commentLikeSerializer.data['liked_by']
            }
            newCommentLikesData.append(commentLikeData)
        return Response({"commentData": newCommentLikesData, "liked": False})
    except models.CommentLike.DoesNotExist:
        commentLike = models.CommentLike.objects.create(
            comment=comment, liked_by=user)
        commentLike.save()
        commentLikes = models.CommentLike.objects.filter(comment=comment)

        newCommentLikesData = []
        for commentLike in commentLikes:
            commentLikeSerializer = CommentLikeSerializer(commentLike)
            commentLikeData = {
                "likeId": commentLikeSerializer.data['id'],
                "likeAuthorId": commentLikeSerializer.data['liked_by']
            }
            newCommentLikesData.append(commentLikeData)
        return Response({"commentData": newCommentLikesData, "liked": True})


@api_view(["POST"])
def savePost(request):
    try:
        jwtToken = request.headers['Authorization']
        try:
            userDetails = jwt.decode(jwtToken, JWT_KEY, algorithms=['HS256'])
        except:
            return Response({"error": "invalid token"})
    except KeyError:
        return Response({"error": "invalid token"})

    postId = request.data['postId']
    try:
        post = models.Post.objects.get(id=postId)
    except models.Post.DoesNotExist:
        return Response({"deletedPost": "deleted post"})

    try:
        user = models.ClonestagramUser.objects.get(id=userDetails['userId'])
    except models.ClonestagramUser.DoesNotExist:
        return Response({"deletedUser": "deleted user"})

    try:
        isSavedAlready = models.SavedPost.objects.get(post=post, saved_by=user)
        isSavedAlready.delete()
        return Response({"saved": False})
    except models.SavedPost.DoesNotExist:
        savedPost = models.SavedPost.objects.create(post=post, saved_by=user)
        savedPost.save()
        return Response({"saved": True})
