# Warning: This app is under development:

# MERN APP: MOTEL:

## About

- MERN app for Hotel, Resort booking process.

## Intro

- Use Docker to create 3 services: mongodb, server, app in docker-compose.yml
- There are things refer to this services name

  - Database name in .env file : `mongodb://mongodb:27017/<DB-name>` the second "mongodb" is service name in docker-compose.yml
  - Proxy definition in app/package.json: ` "proxy": "http://server:5000",` "server"
    is service name in docker-compose.yml
  - In app service when we deal with API endpoints, we will use service name instead of URL

- You can change services name at docker-compose.yml and change the previous reference too.

## Tools:

- [VSCode](https://code.visualstudio.com/download)
- [Git](https://git-scm.com/downloads)
- [NodeJS](https://nodejs.org/en/download/)
- [Docker](https://docs.docker.com/engine/install/)

## Environments:

- Please see env.example and create your .env file

## Build and Run services

### `docker-compose up -d --build`

## or Run services only(after build)

### `docker-compose up -d`

## Stop services

### `docker-compose down`

## Update TailwindCSS

- If you want to executed or update CSS with Tailwind, go to app folder and run script(see app/package.json)

### `cd app`

### `npm run build-css`

- Then run docker build for app service again(make sure you are in main folder)

### `docker-compose up -d --build app`

## Note

1).To create first admin please see information in server/routes/adminRoute.js

2).Things to know about Dockerize, we use container name instead of hostname

- In .env file

  - `DATABASE_LOCAL=mongodb://mongodb:27017/<DB-name>`

- In app/package.json file file
- `"proxy": "http://server:5000"`,

## Demo

https://youtu.be/3NdzSMtVTg8

## Influence

https://www.youtube.com/watch?v=wSlEJOn-gJQ
