# Status Check Banckend

## Information

Status Check is a full stack web application that allows users to monitor the status of an API and recieve notifications if it goes down. Users can either interact with the application through the web interface or a CLI tool.

See [Frontend Documentation](https://github.com/jess-daniel/status-check-fe/) for details on the frontend of the project.

See [CLI Documentation](https://github.com/jess-daniel/status-check-cli) for details on the CLI tool of the project.

# API Documentation

#### Backend deployed at [Heroku](https://node-status-check.herokuapp.com/). <br>

## Getting started

To get the server running locally:

- Clone this repo
- **npm install** to install all required dependencies
- Create and add all ENV variables
- **npm run dev** to start the local server

### Backend framework

Why did I choose this framework?

- Postgres - An open-source, object-relational database management system (ORDBMS), it's persistent database as well as quality made it the correct choice for the application.
- Heroku - Hosting service that makes deploying web apps simple and fast.
- Knex - Creates data schemas, migration tables, and seed data very easily
- Express - A minimal, open source and flexible Node.js web app framework designed to make developing websites, web apps, & API's much easier.
- Nodemon - Used for hot reloading locally for quicker and smoother development.
- Node.js - A platform built on Chrome's JavaScript runtime for easily building fast and scalable network applications. It uses an event-driven, non-blocking I/O model that makes it lightweight and efficient, perfect for data-intensive real-time applications that run across distributed devices.

### Backend Engineering Tech

- Auth0 - It's an enterprise-grade, identity management service, built for the cloud, but compatible with many on-premises applications. With [Auth0](https://www.auth0.com/), Users can register and login **securely** to the application.

## Endpoints

<!-- In-depth endpoint documentation: [Here](https://documenter.getpostman.com/view/10984987/SztD57nm?version=latest#0f5ff3a7-d6b6-4324-bb4c-003c86bc064e) -->

#### Auth Routes

| Method | Endpoint         | Token Required | Description        | Body                      | Params |
| ------ | ---------------- | -------------- | ------------------ | ------------------------- | ------ |
| POST   | `/auth/register` | No             | Creates a new user | username, email, password | n/a    |
| POST   | `/auth/login`    | No             | Returns a token    | username, password        | n/a    |

#### User Routes

| Method | Endpoint                  | Token Required | Description                    | Body        | Params |
| ------ | ------------------------- | -------------- | ------------------------------ | ----------- | ------ |
| GET    | `/api/users`              | Yes            | Returns a list of all users    | n/a         | n/a    |
| GET    | `/api/users/:id`          | Yes            | Returns a user by ID           | n/a         | id     |
| POST   | `/api/users/verify-email` | Yes            | Sends a verification email     | user_id     | id     |
| POST   | `/api/users/auth-profile` | Yes            | Returns a user's Auth0 profile | accessToken | n/a    |

#### Resource Routes

| Method | Endpoint                  | Token Required | Description                                      | Body                 | Params |
| ------ | ------------------------- | -------------- | ------------------------------------------------ | -------------------- | ------ |
| GET    | `/api/resources`          | Yes            | Returns a list of all resources                  | n/a                  | n/a    |
| GET    | `/api/resources/:id`      | Yes            | Returns a resource by ID                         | n/a                  | id     |
| POST   | `/api/resources/user`     | Yes            | Returns a list of all resource for a user        | email                | n/a    |
| POST   | `/api/resources/resource` | Yes            | Returns a resouce by name for user               | email, resource_name | n/a    |
| POST   | `/api/resources/:id/job`  | Yes            | Returns the status of the resource's cron job    | n/a                  | id     |
| POST   | `/api/resources`          | Yes            | Creates a new resource and starts a new cron job | name, link, user_id  | n/a    |
| DELETE | `/api/resources/:id`      | Yes            | Deletes a resource and stops it's cron job       | n/a                  | id     |
| PUT    | `/api/resources/:id`      | Yes            | Updates a resource                               | name, link           | id     |
| PUT    | `/api/resources/:id/job`  | Yes            | Updates a resource's cron job                    | time                 | id     |

## Actions

### User Actions

`get()` -> Returns all users

`findByFilter(filter)` -> Returns a user object based on the filter param

`add(user)` -> Adds a user to the database

`update(changes, id)` -> Updates the user object

`remove(id)` -> Delete's a user from the database

### Resource Actions

`get()` -> Returns all resources

`findByFilter(filter)` -> Returns a resource object based on the filter param

`resourceByName(user_id, resource_name)` -> Returns a resource by name for a specific user

`resourceByUser(user_id)` -> Returns all resources for a user

`add(resource)` -> Adds a resource to the database

`update(changes, id)` -> Updates the resource object

`remove(id)` -> Delete's the resource from the database

## Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

create a .env file that includes the following:

- PG_USER - Postgres username for local serer
- PG_PASSWORD - Postgres password for local server
- PG_PORT - Postgres port for local server
- AUDIENCE - Auth0 audience
- DOMAIN - Auth0 domain
- ISSUER - Auth0 issuer url
- CLIENT_ID - Auth0 cient id
- CLIENT_SECRET - Auth0 client secret
- BASE_URL - Auth0 base url from issuer
- EMAIL - Email used for nodemailer
- EMAIL_PASSWORD - Email password used for nodemailer

[Auth0](https://www.auth0.com)

## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./CODE_OF_CONDUCT.md). Please follow it in all your interactions with the project.

### Issue/Bug Request

**If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**

- Check first to see if your issue has already been reported.
- Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
- Create a live example of the problem.
- Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes, where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).
