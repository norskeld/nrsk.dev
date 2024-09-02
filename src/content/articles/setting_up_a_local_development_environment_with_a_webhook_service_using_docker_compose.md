---
title: Setting Up a Local Development Environment with a Webhook Service using Docker Compose
description: Learn how to set up a local development environment for a Node.js application with a webhook service using Docker Compose, including MongoDB and Nginx as a reverse proxy.
createdAt: 2024-09-02
updatedAt: 2023-09-02
tags:
  - docker
  - docker-compose
  - nodejs
  - webhook
  - development
---

# Introduction

In modern web development, webhooks play a crucial role in enabling real-time communication between different services. Setting up a local development environment that includes a webhook service can be daunting due to multiple dependencies and configurations. Docker Compose simplifies this process by managing multiple services through a single configuration file. This guide will walk you through setting up a local development environment for a Node.js application that includes a webhook service, MongoDB, and Nginx as a reverse proxy.

# The problem we want to solve

Configuring and managing multiple services such as web apps, databases, and webhooks manually is complex and error-prone. Developers often face issues with version mismatches, conflicting ports, and cumbersome setup steps.

# The solution

Using Docker Compose, we will define a multi-service environment with clear separation, easy management, and simplified communication. We’ll create a Node.js application that interacts with a webhook service, MongoDB for database management, and Nginx for routing.

# Step-by-Step Guide

## Step 1: Create Your Project Directory

Start by creating a new directory for your project and navigating into it:

```bash
mkdir node_webhook_project
cd node_webhook_project
```

## Step 2: Create Your Docker Compose File

Compose a `docker-compose.yaml` file to define your services:

```yaml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: node_app
    environment:
      - NODE_ENV=development
    volumes:
      - .:/usr/src/app
      - /usr/src/app/node_modules
    ports:
      - 3000:3000
    networks:
      - app_network
    depends_on:
      - mongodb
      - webhook

  webhook:
    build:
      context: .
      dockerfile: Dockerfile.webhook
    container_name: webhook_service
    ports:
      - 4000:4000
    networks:
      - app_network
    networks:
      default:
      webhook_net:
        aliases:
          - webhook.local

  mongodb:
    image: mongo:latest
    container_name: mongodb
    volumes:
      - mongo_data:/data/db
    ports:
      - 27017:27017
    networks:
      - app_network
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: example

  nginx:
    image: nginx:latest
    container_name: nginx
    ports:
      - 80:80
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    networks:
      - app_network
    depends_on:
      - app

volumes:
  mongo_data:

networks:
  webhook_net:
    driver: bridge
  app_network:
    driver: bridge
```

### Explanation

- **app**: The main Node.js application.
- **webhook**: The webhook service.
- **mongodb**: The MongoDB database service.
- **nginx**: Nginx used as a reverse proxy.
- **Volumes**: Persistent storage for MongoDB.
- **Networks**: Custom network for isolating services.

## Step 3: Create Dockerfiles

### Main Application Dockerfile

Create a `Dockerfile` for the main Node.js application:

```Dockerfile
FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

### Webhook Service Dockerfile

Create a `Dockerfile.webhook` for the webhook service:

```Dockerfile
FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "run", "webhook"]
```

## Step 4: Create Nginx Configuration

Create an `nginx.conf` file for Nginx configuration:

```nginx
events { }

http {
    server {
        listen 80;

        location / {
            proxy_pass http://app:3000;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        location /webhook {
            proxy_pass http://webhook:4000;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
}
```

### Explanation

This Nginx configuration defines how incoming requests are routed to either the main application or the webhook service based on the URL path.

## Step 5: Create Node.js Application and Webhook Service

### Application (index.js)

Create an `index.js` file for the main Node.js application:

```js
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
```

### Webhook Service (webhook.js)

Create a `webhook.js` file for the webhook service:

```js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 4000;

app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
  console.log('Received webhook:', req.body);
  res.send('Webhook received');
});

app.listen(port, () => {
  console.log(`Webhook service listening at http://localhost:${port}`);
});
```

### package.json

Create a `package.json` file to manage dependencies:

```json
{
  "name": "node_webhook_project",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "webhook": "node webhook.js"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.17.1",
    "body-parser": "^1.19.0"
  }
}
```

### Explanation

Both the app and webhook service are defined, each with its route handlers. The `package.json` file includes scripts to start each service.

## Step 6: Build and Run Your Services

To build and run your Docker Compose setup, execute the following command:

```bash
docker-compose up --build
```

This command will build and start all defined services.

# Conclusion

Using Docker Compose to set up your local development environment simplifies the process of managing multiple services and their dependencies. The outlined steps provide a clear path for creating a robust environment, ensuring smooth and efficient development workflows. By following this guide, you now have a reliable setup with a Node.js application, webhook service, MongoDB, and Nginx as a reverse proxy.

Feel free to customize and extend this setup to fit your specific needs.

# References

- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Nginx Documentation](https://nginx.org/en/docs/)
