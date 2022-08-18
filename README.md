# contacts-api
Node Contacts Rest API

## Used stacks
 - Node.js (dev with ver 16)
 - NestJs
 - TypeScript
 - Prisma (ORM)
 - Docker


## Implemented using
 - JWT Auth
 - Open API 3 (aka Swagger)
 - Exception filters
 - Validators & mappers
 - TDD


## Pre-requisites
 - Node
 - Docker
 - MySql connection* (for create and use database)  

(*) MySql is not running in a docker container due to a Prisma issue (not yet resolved)  

## Create a .env file

```bash
DATABASE_URL="mysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:3306/{DATABASE}"

JWT_SECRET=token-secret-string

#JWT_EXPIRATION_TIME: s-seconds / m-minutes / h-hours / d-days
JWT_EXP_TIME='1d'
```

## Installation

```bash
# install dependencies
$ npm install

# install Prisma cli
$ npm install --location=global prisma

# create database (in MySql) from Prisma schema
$ npx prisma db push

# gererate Prisma db client
$ npx prisma generate
```

## Running the app (from local node)

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Running the app (from docker)*

```bash
$ docker-compose up
```
(*) Running from docker installs the app in container (is not necessary local install)  


## API docs
To view API docs access this url in browser:  

```bash
http://localhost:3000/swagger
```
## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Important
To run application you need to create a user in Usuario table, used by JWT Auth endpoint to generate token  

Example:

```bash
INSERT INTO {DB}.Usuario (email, senha) 
VALUES ('john@microsoft.com', '{ENCRYPTED_PASSWORD}');
```

