# WeConnectReact
Front-End using react to consume the We Connect [API](https://we-connect--api-kasigazi.herokuapp.com) 

[![Build Status](https://travis-ci.org/kasigazibrian/WeConnectReact.svg?branch=ch-add-coveralls-157835150)](https://travis-ci.org/kasigazibrian/WeConnectReact)
[![Coverage Status](https://coveralls.io/repos/github/kasigazibrian/WeConnectReact/badge.svg?branch=ch-add-coveralls-157835150)](https://coveralls.io/github/kasigazibrian/WeConnectReact?branch=ch-add-coveralls-157835150)

## Description
WeConnect provides a platform that brings businesses and individuals together. This platform creates awareness for businesses and gives the users the ability to write reviews about the businesses they have interacted with.

## Getting Started
* Clone the repository by running the command
```
  git clone https://github.com/kasigazibrian/WeConnectReact.git
```
* Navigate to the root folder
```
$ cd WeConnectReact
```
* Set the base URL in the `App.Config` 
```javascript
export default class Config{
  static API_BASE_URL = `https://we-connect--api-kasigazi.herokuapp.com`
}
```
* Run the command below to install all the dependencies
```
$ npm install
```
* Run the application by running the command
```
$ npm start
```

#### Welcome Page
![Screenshot of Welcome page](/screenshots/welcome.png?raw=true "Welcome Page") 

## Features
* A user can `create` an account and `login`

#### Signup Page
![Screenshot of SignUp page](/screenshots/signup.png?raw=true "Signup Page")

#### Login Page
![Screenshot of Login page](/screenshots/login.png?raw=true "Login Page") 

* A user can `register` a business
* A user can `view` all registered businesses
* A user can `add` reviews to a business
* A user can `edit` or `delete` his/her own business

### Running the tests
* Run the command below to run the tests
```
$ npm test
```
### Obtaining the test coverage
* Run the command below to obtain the coverage
```
$ npm run coverage
```
### Access the application live on

* [WeConnect](https://we-connect-react-brian.herokuapp.com)

### Built-With
* [React](https://github.com/facebook/create-react-app)

### Acknowledgements
I would like to express my deepest appreciation to all those who have provided me with the possibility to work on this 
project.  A special gratitude I give to my colleagues , whose contribution in stimulating
suggestions and encouragement has  helped me to coordinate my project. 

### Author
Kasigazi Brian 