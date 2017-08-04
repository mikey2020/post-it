[![Build Status](https://travis-ci.org/mikey2020/post-it.svg?branch=develop)](https://travis-ci.org/mikey2020/post-it)
[![Code Climate](https://codeclimate.com/github/mikey2020/post-it/badges/gpa.svg)](https://codeclimate.com/github/mikey2020/post-it)
[![Coverage Status](https://coveralls.io/repos/github/mikey2020/post-it/badge.svg)](https://coveralls.io/github/mikey2020/post-it)


# post-it
PostIt is a simple application that allows friends and colleagues create groups for notifications. 


## POST IT
This repository contains a simple application that allows user post messages to different groups.

### Development
This application was developed using [ExpressJS](http://expressjs.com/). PostgreSQL was used for persisting data with [Sequelize](https://http://docs.sequelizejs.com/) as [ORM](https://en.wikipedia.org/wiki/Object-relational_mapping) 
and [React with Redux](http://redux.js.org/docs) for client side.

### Installation
* Start up your terminal (or Command Prompt on Windows OS).
* Ensure that you've `node` installed on your PC.
* Clone the repository by entering the command `git clone https://github.com/mikey2020/post-it` in the terminal.
* Navigate to the project folder using `cd post-it` on your terminal (or command prompt)
* Please install this packages `babel`, `sequelize`, `mocha` globally 
* Then cd into server directory and run command `npm install`
* Create a `.env` file in your root directory. 
Variables such as DATABASE_URL (which must be a postgreSQL URL) and PORT are defined in the .env file and it is essential you create this file before running the application.
```
PORT=3000
DATABASE_URL='postgres://john:doe@localhost:5432/databaseName'
```
* After this, you can then start the server with the command: `npm start`.

### Tests 

* set `NODE_ENV = test`

* Then you can run tests with `npm test` but first please make sure your node environment is set as test



## Api Endpoints

Request type | Endpoint | Action | Parameters |
------------ | ---------| --------| ---------|
POST | [/api/user/signup] | Create a new user | {username , email , password}
POST | [/api/user/signin]| Authenticate user  | {username , password}
POST | [/api/group]| Create new group         | {name}
PUT | [ /api/group/:groupid/user] | Add user to a group | {username}
POST | [/api/group/:groupid/message] | Add message to a group | {post}
POST | [/api/group/:groupid/messages] | Get all posts from a group | 



You can use the application by going to https://mike-post.herokuapp.com/



### Author
*Michael Eboagu*
