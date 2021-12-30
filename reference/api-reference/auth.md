---
description: Authentication routes
---

# 🔓 Auth

## SignUp

{% swagger baseUrl="http://localhost:8080" method="post" path="/auth/signup" summary="Create a new User" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="body" name="username" required="true" type="string" %}
Username 
{% endswagger-parameter %}

{% swagger-parameter in="body" name="email" required="false" type="email" %}
email of user
{% endswagger-parameter %}

{% swagger-parameter in="body" name="password" required="false" type="password" %}
user password
{% endswagger-parameter %}

{% swagger-response status="200" description="User Created Successfully" %}
```javascript
{
	"id": "61cxxxxxxx3a06aa8c9",
	"username": "xxxxxxxxx",
	"email": "xxxxx@gmail.com",
	"accessToken": "exxxxxxxxxxxxxxxxxxxxxZCI6IjYxYNhMDZhYThjOSIs"
}
```
{% endswagger-response %}

{% swagger-response status="404: Not Found" description="Couldn't connect to server" %}
```javascript
{
    // Response
}
```
{% endswagger-response %}

{% swagger-response status="500: Internal Server Error" description="Internal server error" %}
maybe caused by some database error
{% endswagger-response %}
{% endswagger %}

## Login

{% swagger method="post" path="/auth/login" baseUrl="http://localhost:8080" summary="Login in the user account" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="body" name="username" required="true" type="string" %}
username used to create account
{% endswagger-parameter %}

{% swagger-parameter in="body" name="password" type="password" %}
User password
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Successful Login" %}
```javascript
{
	"id": "6xxxxxxxxxxxxa06aa8c9",
	"username": "xxxxx",
	"email": "xxxxxxx@gmail.com",
	"accessToken": "xxxxxxxxxxxxxxP2tK1JM6mMePM8e94CzHSM0Jnf8"
}
```
{% endswagger-response %}

{% swagger-response status="401: Unauthorized" description="Invalid Password" %}
```javascript
{
	"accessToken": null,
	"message": "Invalid Password!"
}
```
{% endswagger-response %}
{% endswagger %}
