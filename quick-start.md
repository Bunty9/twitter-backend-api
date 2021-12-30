# Quick Start

{% hint style="info" %}
**Good to know:** A quick start guide can be good to help folks get up and running with your API in a few steps. Some people prefer diving in with the basics rather than meticulously reading every page of documentation!
{% endhint %}

## Get the Project Repository

```
git clone https://github.com/Bunty9/twitter-backend-api.git
```

## Setup Locally

Install the dependencies

{% tabs %}
{% tab title="Node" %}
```
npm install 
```
{% endtab %}
{% endtabs %}

Start the server

{% tabs %}
{% tab title="Node" %}
```
npm start
```
{% endtab %}
{% endtabs %}

## Make your first request

To make your first request, send get a request to the below endpoint.&#x20;

{% swagger method="get" path="/api" baseUrl="http://localhost:8000" summary="Open endpoint to test if the server is running locally." %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-response status="200: OK" description="Api Running" %}
response: API Working!
{% endswagger-response %}

{% swagger-response status="404: Not Found" description="Server not Running" %}
```javascript
{
    // Response
}
```
{% endswagger-response %}
{% endswagger %}
