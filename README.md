[![Build Status](https://travis-ci.org/mikey2020/post-it.svg?branch=develop)](https://travis-ci.org/mikey2020/post-it)

# post-it
PostIt is a simple application that allows friends and colleagues create groups for notifications. 


###POST IT

This repository contains a simple application that allows user post messages to different groups.

### Development
This application was developed using [ExpressJS](http://expressjs.com/). PostgreSQL was used for persisting data with [Sequelize](https://http://docs.sequelizejs.com/) as [ORM](https://en.wikipedia.org/wiki/Object-relational_mapping) 
and React-Redux for client side.

### Installation
* Start up your terminal (or Command Prompt on Windows OS).
* Ensure that you've `node` installed on your PC.
* Clone the repository by entering the command `git clone https://github.com/mikey2020/post-it/new/master` in the terminal.
* Navigate to the project folder using `cd post-it` on your terminal (or command prompt)
* After cloning, install the application's dependencies with the command `npm install`.
* Then cd into server directory and run command `npm install`
* Create a `.env` file in your root directory as described in `.env.sample` file. 
Variables such as DATABASE_URL (which must be a postgreSQL URL) and PORT are defined in the .env file and it is essential you create this file before running the application.
```
PORT=3000
DATABASE_URL='postgres://john:doe@localhost:5432/databaseName'
```
* After this, you can then start the server with the command: `npm start`.

### API Documentation
Users can sign up and if they already have one they can sign in to their account

You can use the application by going to https://mike-post-it.herokuapp.com/



### Author
**Michael Eboagu**