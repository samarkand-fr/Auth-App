# Auth-App
* Auth App is a simple authentication application built using Node.js, Express.js, React.js, and MongoDB.
* It provides user registration, login, and authentication functionalities for both the backend and frontend.

## Backend Features
- User Registration: Allows users to create a new account by providing their first name, last name, email, and password.
- User Login: Enables existing users to log in to their accounts using their email and password.
- Access Tokens: Generates JSON Web Tokens (JWT) for authentication, providing secure access to protected routes.
- Password Hashing: Utilizes bcrypt for password hashing, ensuring secure storage of user passwords.
- User Authentication: Protects routes by validating access tokens, allowing only authenticated users to access certain endpoints.
- Error Handling: Provides error messages and appropriate HTTP status codes for various scenarios, enhancing user experience.

## Frontend Features
- User Registration: Provides a user-friendly interface for users to create a new account.
- User Login: Offers a seamless login experience for existing users to access their accounts.
- Access Token Management: Manages access tokens and ensures secure transmission between the frontend and backend.
- Error Display: Displays user-friendly error messages for better usability and troubleshooting.
- User Dashboard: Includes a dashboard interface for administrators to view  registered users.