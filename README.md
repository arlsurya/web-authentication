# Web Authentication Project

This project is a demonstration of implementing web authentication using modern web standards such as WebAuthn (Web Authentication). WebAuthn is a standard for secure and user-friendly authentication on the web, offering passwordless and multi-factor authentication options.

![auth img](https://raw.githubusercontent.com/arlsurya/web-authentication/master/public/screenshots/s1.png)
![auth img](https://raw.githubusercontent.com/arlsurya/web-authentication/master/public/screenshots/s2.png)


## Overview


1. **Backend (Node.js)**: This component handles user authentication logic, communicates with the database, and exposes APIs for user registration, login, and authentication.
   
2. **Frontend (Javascript)**: This component provides the user interface for interacting with the authentication system. It allows users to register, login, and perform authentication using WebAuthn.

## Features

- User registration: Users can create an account by providing their username, email, and password.
- Passwordless authentication: Users can authenticate using methods such as biometrics, USB tokens, or other authenticators supported by WebAuthn.
- Multi-factor authentication: Users can enable additional authentication factors for enhanced security.

## Technologies Used

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB 
  - @simplewebauthn/server (for server-side WebAuthn implementation)

- **Frontend**:
  - Javascript
  - @simplewebauthn/browser (for client-side WebAuthn implementation)
  - HTML/CSS

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/arlsurya/web-authentication.git

   ```

   ```bash
   cd web-authentication

   ```

   ```bash
   npm install
   ```

   ```
   npm start
   ```


## Others

- npm(server): https://www.npmjs.com/package/@simplewebauthn/server
- npm(client): https://www.npmjs.com/package/@simplewebauthn/server

- workflow : https://app.eraser.io/workspace/5ZsRn0hYEPzCmk4m4HIF


