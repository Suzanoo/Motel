# Warning: This app is under development:

# MERN APP: MOTEL:

## About

- MERN app for Hotel, Resort booking and management.

## Intro

- Use Docker to create 4 services of app: mongodb, server, app, admin
- There are things refer to this services name

  - Database name in .env file : `mongodb://mongodb:27017/tours`
  - proxy definition in package.json file of app service, and admin service: ` "proxy": "http://server:5000",`
  - In server service and admin service when we deal with API endpoints, we will use service name instead of URL

- You can change services name at docker-compose.yml and change the previous reference too.

## Tools:

- [VSCode](https://code.visualstudio.com/download)
- [Git](https://git-scm.com/downloads)
- [NodeJS](https://nodejs.org/en/download/)

## Environments:

- Please see env.example and create your .env file

## Build and Run services

### `docker-compose up -d --build`

## Stop services

### `docker-compose down`

## Note

1).To create first admin please see information in adminRoute.js

2).Things to know about Dockerize, we use container name instead of hostname

- In .env file

  - `DATABASE_LOCAL=mongodb://mongodb:27017/<DB-name>`

- In app/package.json file and admin/package.json file
- `"proxy": "http://server:5000"`,

## Demo

https://youtu.be/3NdzSMtVTg8
