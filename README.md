# Cat Image Gallery API

A backend API for a Cat Image Gallery application. Users can register and login, upload cat images to Cloudinary, and manage cat entries with CRUD operations.

## Features

- User registration and login with JWT authentication
- Upload cat images using Cloudinary
- Create, read, update, and delete cat entries
- Public gallery listing of all cat images
- Protected routes for creating, updating, and deleting cats

## Tech Stack

- Node.js
- Express
- MongoDB / Mongoose
- JSON Web Tokens (JWT)
- Cloudinary image storage
- Multer for multipart/form-data uploads

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mahaboob2603/Cat_Image-gallery.git
   cd Catapi
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the project root with the following values:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Auth

- `POST /api/auth/register` - Register a new user
  - Body: `{ "username": "user", "password": "pass" }`
- `POST /api/auth/login` - Login and receive a JWT token
  - Body: `{ "username": "user", "password": "pass" }`

### Cats

- `GET /api/cats` - Get all cat entries
- `GET /api/cats/:id` - Get a cat by ID
- `POST /api/cats` - Create a new cat entry (protected)
  - Headers: `Authorization: Bearer <token>`
  - Form fields: `name`, `breed`, `age`, `description`, `image`
- `PUT /api/cats/:id` - Update a cat entry (protected, owner only)
  - Headers: `Authorization: Bearer <token>`
  - Form fields: `name`, `breed`, `age`, `description`, `image`
- `DELETE /api/cats/:id` - Delete a cat entry (protected, owner only)
  - Headers: `Authorization: Bearer <token>`

## Notes

- Images are stored in Cloudinary via the configured Cloudinary account.
- The `image` field must be sent as multipart/form-data when creating or updating cats.
- Protected routes require a valid JWT token returned from login or register.
- 
