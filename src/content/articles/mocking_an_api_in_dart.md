---
title: How to Mock an API in ONE minute
description: Tools and Libraries for Quickly Setting Up a Mock API
createdAt: 2022-12-17
updatedAt: 2022-12-17
tags:
  - api
  - testing
---

Mocking an API can be useful when you want to test your application's integration with an API, but you don't have access to the real API or you don't want to make real API calls during testing. In this article, we'll show you how to quickly set up a mock API using modern tools in JavaScript, Go, Dart, and Python.

Here's an example of how to set up a mock API with JSON Server in just a few minutes:

# Mocking an API in Json server

1.  Install JSON Server by running the following command in your terminal:

```sh
npm install -g json-server

```

2. Create a JSON file that defines the endpoints and responses for your mock API. For example, let's say you want to mock an API that has a GET endpoint that returns a list of users and a POST endpoint that creates a new user. Your JSON file might look like this:

```json
{
  "users": [
    { "id": 1, "name": "Alice" },
    { "id": 2, "name": "Bob" }
  ]
}
```

3. Start the JSON Server by running the following command, replacing db.json with the path to your JSON file:

```sh

json-server db.json

```

4. Your mock API is now running at http://localhost:3000. You can make requests to the API using any HTTP client, such as fetch in the browser or axios in a Node.js application.

# Mocking an API in Go

Another option for mocking an API in Go is to use the httptest package, which is part of the standard library. The httptest package allows you to create a mock HTTP server that you can use to test your application's HTTP client code.

Here's an example of how to set up a mock API with httptest in Go:

1. Import the httptest package in your test file:

```go
import "net/http/httptest"
```

2. Create a mock HTTP server by calling the NewServer function and passing it a handler function that defines the responses for your mock API:

```go
server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
    if r.URL.Path == "/users" && r.Method == "GET" {
        w.Write([]byte(`[{"id": 1, "name": "Alice"}, {"id": 2, "name": "Bob"}]`))
        return
    }
    w.WriteHeader(http.StatusNotFound)
}))
```

3. Make HTTP requests to the mock server using the http.Client type:

```go
client := &http.Client{}
req, _ := http.NewRequest("GET", server.URL+"/users", nil)
resp, _ := client.Do(req)
Close the mock server when you're done with it:
```

4. Close the mock server when you're done with it:

```go
server.Close()
```

# Mocking an API in Dart

To mock an API in Dart, you can use the mockito package, which is a popular mocking library for Dart and Flutter applications.

Here's an example of how to set up a mock API with mockito in Dart:

1. Install the mockito package by adding the following dependency to your pubspec.yaml file:

```yaml
dependencies:
  mockito: ^5.3.2
```

2. import 'package:mockito/mockito.dart';

```dart
import 'package:mockito/mockito.dart';
```

3. Create a mock HTTP client using the Mock class:

```dart
final mockHttpClient = Mock();
```

4. Use the when function to specify the behavior of the mock HTTP client when a particular method is called:

```dart
when(mockHttpClient.get('http://example.com/users'))
    .thenAnswer((_) async => Response('[{"id": 1, "name": "Alice"}, {"id": 2, "name": "Bob"}]', 200));

```

5. Use the mock HTTP client in your code just as you would a real HTTP client. For example:

```dart
Use the mock HTTP client in your code just as you would a real HTTP client. For example:
```

6. You can also use the verify function to check that the mock HTTP client was called as expected. For example:

```dart
verify(mockHttpClient.get('http://example.com/users')).called(1);
```

With mockito, you can easily set up a mock HTTP client to use in your tests and development. This can save you time and allow you to test your application's integration with an API without relying on the availability of the real API.

# Mocking an API in Python

To mock an API in Python, you can use the unittest.mock module, which is part of the standard library. The unittest.mock module allows you to create mock objects and define their behavior.

Here's an example of how to set up a mock API with unittest.mock in Python:

1. Import the unittest.mock module and the requests module in your test file:

```python
from unittest.mock import Mock
import requests
```

2. Create a mock Response object and define its behavior:

```python
response_mock = Mock()
response_mock.json.return_value = [{"id": 1, "name": "Alice"}, {"id": 2, "name": "Bob"}]
response_mock.status_code = 200

```

3. Use the side_effect attribute to specify that the requests.get the function should return the mock Response object when it is called:

```python
requests.get.side_effect = lambda x: response_mock

```

4. Make an HTTP request using the requests module as you normally would:

```python

response = requests.get("http://example.com/users")

```

5. The mock Response object will be returned instead of a real HTTP response. You can then test your code's behavior using the mock response data.

In conclusion, mocking an API can be a useful tool for testing and development. It allows you to simulate an API without relying on the real API, which can save you time and make your tests more reliable. There are various tools and libraries available for quickly setting up a mock API in different programming languages, such as JSON Server in JavaScript, httptest in Go, mockito in Dart, and unittest.mock in Python. By using these tools, you can easily create a mock API to use in your tests and development.
