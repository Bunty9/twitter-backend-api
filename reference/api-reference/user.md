---
description: User routes
---

# 🧑🦱 User

## Tweet

Tweet Something

{% swagger method="post" path="/user/tweet" baseUrl="http://localhost:8080" summary="User should be able to tweet about anything they like" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="body" name="text" type="string" required="true" %}
the tweet
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Successfully Tweeted" %}
```javascript
{
	"success": true,
	"data": "this is my first tweet"
}
```
{% endswagger-response %}

{% swagger-response status="401: Unauthorized" description="Invalid token Provided" %}
```javascript
{
	"message": "No token provided!"
}
```
{% endswagger-response %}
{% endswagger %}

## Follow&#x20;

Follow Someone&#x20;

{% swagger method="post" path="/user/:username/follow" baseUrl="http://localhost:8080" summary="Follow a user with his username" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="header" name="x-access-token" required="true" %}
authentication token received on login
{% endswagger-parameter %}

{% swagger-parameter in="path" name=":username" required="true" %}
user whom you want to follow
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Successfully Followed" %}
```javascript
{
	"message": "successfully followed: {username}",
	"status": 200
}
```
{% endswagger-response %}

{% swagger-response status="400: Bad Request" description="already following" %}
```javascript
{
	"message": "You are already following",
	"status": 400
}
```
{% endswagger-response %}

{% swagger-response status="400: Bad Request" description="cannot follow yourself" %}
```javascript
{
	"message": "You can't follow/unfollow yourself",
	"status": 400
}
```
{% endswagger-response %}

{% swagger-response status="404: Not Found" description="No user found for username" %}
```javascript
{
	"message": "No user found for username {username}"
}
```
{% endswagger-response %}

{% swagger-response status="401: Unauthorized" description="" %}
```javascript
{
    // Response
}
```
{% endswagger-response %}
{% endswagger %}

## Unfollow

Unfollow Someone

{% swagger method="post" path="/user/:username/" baseUrl="http://localhost:6969" summary="" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="path" required="true" name=":username" %}
user whom you want to unfollow
{% endswagger-parameter %}

{% swagger-parameter in="header" name="x-access-token" required="true" %}
authentication token received on login
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Successfully Unfollowed" %}
```javascript
{
    // Response
}
```
{% endswagger-response %}

{% swagger-response status="400: Bad Request" description="You are already unfollowing" %}
```javascript
{
	"message": "You are already unfollowing",
	"status": 400
}
```
{% endswagger-response %}

{% swagger-response status="400: Bad Request" description="cannot unfollow yourself" %}
```javascript
{
	"message": "You can't follow/unfollow yourself",
	"status": 400
}
```
{% endswagger-response %}

{% swagger-response status="404: Not Found" description="user not found" %}
```javascript
{
	"message": "No user found for username {username}"
}
```
{% endswagger-response %}

{% swagger-response status="401: Unauthorized" description="no/invalid token provided" %}
```javascript
{
	"message": "No/Invalid token provided!"
}
```
{% endswagger-response %}
{% endswagger %}

## My Feed

All the tweets of people you are following sorted by latest tweet on top

{% swagger method="get" path="/feed" baseUrl="http://localhost:8080" summary="" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="header" name="x-access-token" required="true" %}
authentication token received on login
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="tweets of people you are following sorted by latest tweet on top(JSON format)" %}
```javascript
{
	"success": true,
	"data": [
		{
			"_id": "61cxxxxxxxxxa06aa8d0",
			"user": {
				"_id": "61cxxxxxxxx3a06aa8c9",
				"username": "xxxxxx"
			},
			"text": "this is my first tweet",
			"createdAt": "2021-12-30T14:10:47.807Z",
			"__v": 0
		}
	]
}
```
{% endswagger-response %}

{% swagger-response status="401: Unauthorized" description="Unauthorized (invalid or no token providied)" %}
```javascript
{
	"message": "Unauthorized!"
}
```
{% endswagger-response %}
{% endswagger %}

