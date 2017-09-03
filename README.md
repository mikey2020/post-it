## PostIt messaging application

[![Build Status](https://travis-ci.org/mikey2020/post-it.svg?branch=develop)](https://travis-ci.org/mikey2020/post-it)
[![Code Climate](https://codeclimate.com/github/mikey2020/post-it/badges/gpa.svg)](https://codeclimate.com/github/mikey2020/post-it)
[![Coverage Status](https://coveralls.io/repos/github/mikey2020/post-it/badge.svg)](https://coveralls.io/github/mikey2020/post-it)

## API Documentation
The API endpoints are each dedicated to a single task and they use HTTP response codes to indicate API status and errors.

## API Summary
View full API documentation [here](https://mike-post.herokuapp.com/api-docs)

#### API Features

The following features make up the PostIt API:

###### Authentication

- It uses JSON Web Token (JWT) for authentication
- It generates a token on successful login or account creation and returns it to the user
- It verifies the token to ensure a user is authenticated to access every endpoints

###### Users

- It allows users to be signed up or created. 
- It allows users to login and obtain a unique token which expires every 5hours
- It allows users post message to a group.

###### Groups

- It allows authenticated users to create group.
- It allows users to add user to a group. 
- It allows users get all messages posted a particular group.

###### Search

- It allows users search for other users. 

## Technologies Used
- **[JavaScript ES6](http://es6-features.org/)** - Codes were written in javascript to enhance HTML pages.
- **[ReactJS](https://facebook.github.io/react/)** - React is an open-source JavaScript library for building user interfaces.
- **[NodeJS](https://nodejs.org/)** - Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient, perfect for data-intensive real-time applications that run across distributed devices.
- **[ExpressJS](https://expressjs.com/)** - Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. I used this framework for routing.
- **[PostgreSQL](https://www.postgresql.org/)** - Postgres is an object-relational database management system (ORDBMS) with an emphasis on extensibility and standards compliance.
- **[Sequelize](http://docs.sequelizejs.com/)** - Sequelize is a promise-based ORM for Node.js which supports the dialects of PostgreSQL and features solid transaction support, relations, read replication and more.

### **Installation Steps**
* Ensure you have `node` installed or install [Node](https://nodejs.org/en/download/)
* Clone the project repository from your terminal `git clone https://github.com/mikey2020/post-it`
* Change directory into the `post-it` directory
* Run `npm install` to install the dependencies in the `package.json` file
* Run `npm run dev:server` to start the project
* Run `npm test` to run the server-side(api) tests
* Run `npm run client-tests` to run the client-side(React) tests
* Use [Postman](https://www.getpostman.com/) or any API testing tool of your choice to access the endpoints

**You can also test the application by going to `https://mike-post.herokuapp.com/`**

### **Endpoints**
**N/B:** For all endpoints that require authentication, use \
`Authorization: <token>`

### **Limitations**
* Users cannot update a group's name 
* Users cannot update/change their information
* Users cannot remove another user from a group 

### How to Contribute
Contributors are welcome to further enhance the features of this API by contributing to its development. The following guidelines should guide you in contributing to this project:

1. Fork the repository.
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request describing the feature(s) you have added

Ensure your codes follow the [AirBnB Javascript Styles Guide](https://github.com/airbnb/javascript)

### Author
**Michael Eboagu**

## License 

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)