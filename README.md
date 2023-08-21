# Test White Swan Data

# Environment vars
This project uses the following environment variables:

| Name                          | Description                         | Default Value                                  |
| ----------------------------- | ------------------------------------| -----------------------------------------------|
|PORT                   | Port Server Listening            | "*"      |
|ACCESS_TOKEN_SECRET    | Verification Access Token Key | "access_token_secret"
|REFRESH_TOKEN_SECRET   | Verification Refresh Token    | "refresh_token_secret"


# Pre-requisites
- Install [Node.js](https://nodejs.org/en/) version >= 16.15.1

# Getting started
- Clone the repository
```
git clone  https://github.com/cagigas/white-swan-data-test
```
- Install dependencies
```
cd white-swan-data-test
npm install
```
- Build and run the project
```
npm run dev
```
  Navigate to `http://localhost:1234`

- API Document endpoints
    getOdds -> POST http://localhost:1234/odds 
    login -> GET http://localhost:1234/login 

- How to use it:
  1. You will need to login and get the auth token.
  ```  
    GET http://localhost:1234/auth/login?email=david.cagigas@gmail.com&password=123456 
  ```
  2. Get the token and use them in all your queries.
  ``` 
    POST http://localhost:1234/odds?eventUrl=https://sports.williamhill.com/betting/en-gb/horse-racing/OB_EV27357896/aintree-grand-national-6th-apr-2024 HTTP/1.1
    Content-Type: application/json
    Authorization: Bearer {{AUTH_TOKEN}}

- Test it
```
npm run test
```

# Assumptions and improvements

I'm using an MVC architecture, written the code in a scalable and modular way.
You can use the following login:
```
  {
    email: david.cagigas@gmail.com,
    password: 123456
  }
http://localhost:1234/auth/login?email=david.cagigas@gmail.com&password=123456
```
I haven't added the endpoints to create new users (some parts are coded), so I've included a initial user to test it.
Use Typescript for types check.
Use dotenv to load environment variables.

