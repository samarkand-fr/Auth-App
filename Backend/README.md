# Auth-App
- Auth App is a simple authentication application built using Node.js, Express.js, and MongoDB.
- It provides user registration, login, and authentication functionalities.

## Features
- User Registration: Allows users to create a new account by providing their first name, last name, email, and password.
- User Login: Enables existing users to log in to their accounts using their email and password.
- Access Tokens: Generates JSON Web Tokens (JWT) for authentication, providing secure access to protected routes.
- Password Hashing: Utilizes bcrypt for password hashing, ensuring secure storage of user passwords.
- User Authentication: Protects routes by validating access tokens, allowing only authenticated users to access certain endpoints.
- Error Handling: Provides error messages and appropriate HTTP status codes for various scenarios, enhancing user experience.