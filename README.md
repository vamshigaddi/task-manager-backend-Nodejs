# Task Manager Backend

This is a Node.js backend API for managing tasks. It allows users to perform CRUD operations on tasks, including authentication via JWT.

## Key Features:
- **User Authentication:** Secure registration and login using JWT (JSON Web Tokens).
- **Task Management:** Full CRUD (Create, Read, Update, Delete) capabilities for tasks.
- **JWT-based Security:** Ensures only authenticated users can access task-related features.
- **MongoDB Integration:** Efficient and scalable data storage.

## Prerequisites
Before running the project, ensure that you have the following installed:
## Get Started

Clone the repository:

```bash
git clone https://github.com/vamshigaddi/task-manager-backend-Nodejs.git
cd task-manager-backend-Nodejs
```
### Installing Dependencies
``` bash
npm install
```
### Set Up Environment Variables
Create a ```.env ``` file in the root of the project with the following contents:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```
### Run the Application Locally
```
npm start
```
### Testing Locally
Once the app is running, you can test the API with Postman or any HTTP client.

## API Documentation
### Authentication
**Register** - To access task-related features, users must register.

**POST**:  api/users/register

### Request Body:
``` 
{
    "name":"kevin",
    "email":"kevin256@gmail.com",
    "password":"kevin123@"
}
```
**Response**
```
{
  "_id": "user_id",
  "name": "Kevin",
  "email": "kevin256@example.com",
  "token": "jwt_token"
}

```

**Login** - To access task-related features, users must authenticate and obtain a token.

**POST**:  api/users/login

### Request Body:
``` 
{
    "email":"kevin256@gmail.com",
    "password":"kevin123@"
}
```
**Response**
```
{
  "_id": "user_id",
  "name": "Kevin",
  "email": "kevin256@example.com",
  "token": "jwt_token"
}

```
## Task Endpoints
**Create a New Task**

**POST**: /api/tasks

**Headers**:
```
Authorization: Bearer <jwt_token>
```
**Request Body**

```
{
  "title": "Complete Assignment",
  "description": "Finish the task management API"
}

```

**Response**
```
{
  "_id": "task_id",
  "user": "user_id",
  "title": "Complete Assignment",
  "description": "Finish the task management API",
  "status": "pending",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```
**Get All Tasks**

**GET**: /api/tasks

**Headers**:
```
Authorization: Bearer <jwt_token>
```
**Response Body**
```
[
  {
    "_id": "task_id",
    "user": "user_id",
    "title": "Complete Assignment",
    "description": "Finish the task management API",
    "status": "pending",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  },
  ...
]
```
**Update a Task**

**PUT**: /api/tasks/:id

**Headers**:
```
Authorization: Bearer <jwt_token>

```
**Request Body**
```
{
  "title": "Updated Task Title",
  "description": "Updated task description",
  "status": "completed"
}

```
**Resonse Body**
```
{
  "_id": "task_id",
  "user": "user_id",
  "title": "Updated Task Title",
  "description": "Updated task description",
  "status": "completed",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```
**Delete a Task**

**DELETE**: /api/tasks/:id

**Headers**:
```
Authorization: Bearer <jwt_token>
```
**Response**
```
{
  "message": "Task deleted successfully"
}
```
## Deployed URL:
**Render**: [Cloud Platform](https://render.com/)
- Build, deploy, and scale your apps with unparalleled ease – from your first user to your billionth.

The backend system is deployed on the render cloud platform and accessible at the following base URL:
```
https://task-manager-jgv8.onrender.com
```
**How to Use**:
Use the base URL above and append the endpoints mentioned in the API Endpoints section to test them in Postman.

- Example:
  
**For User Register**:
  
**POST** : 

```
https://task-manager-jgv8.onrender.com/api/users/register
```
