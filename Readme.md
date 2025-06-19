# URL Shortener Application

A full-stack URL shortener application built with the MERN stack (MongoDB, Express, React, Node.js) and Redis.

## Features

- Shorten long URLs to easy-to-share links
- Custom URL slugs for registered users
- User authentication and URL management
- Rate limiting to prevent abuse
- Share shortened URLs directly from the application
- Responsive design for mobile and desktop

## Tech Stack

### Backend
- Node.js with Express
- MongoDB for persistent storage
- Redis for caching and rate limiting
- JWT for authentication

### Frontend
- React with Vite
- Redux for state management
- TailwindCSS for styling
- React Query for data fetching

## Getting Started

### Prerequisites

- Docker and Docker Compose
- Node.js (for local development)

### Running with Docker

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/url-shortener.git
   cd url-shortener
   ```

2. Create a `.env` file based on the example:
   ```
   cp .env.example .env
   ```

3. Start the application:
   ```
   docker-compose up -d
   ```

4. Access the application:
   - Frontend: http://localhost
   - Backend API: http://localhost:5002

### Local Development

#### Backend

1. Navigate to the backend directory:
   ```
   cd BACKEND
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

#### Frontend

1. Navigate to the frontend directory:
   ```
   cd FRONTEND
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

## API Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `POST /api/auth/logout` - Logout a user
- `GET /api/auth/me` - Get current user
- `POST /api/create` - Create a short URL
- `GET /api/user/url` - Get all URLs for a user
- `GET /:shortUrl` - Redirect to the original URL

## License

This project is licensed under the MIT License - see the LICENSE file for details.