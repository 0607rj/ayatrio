# Charters Business - Full Stack Application

A modern full-stack application built with Next.js (frontend) and Express.js (backend).

## 🚀 Tech Stack

### Frontend
- Next.js 15
- React 19
- TypeScript
- Tailwind CSS

### Backend
- Node.js
- Express 5
- MongoDB Atlas
- Mongoose
- JWT Authentication

## 📁 Project Structure

Charters-Business/
├── frontend/ # Next.js application
├── backend/ # Express API server
└── README.md


## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+ 
- npm 9+
- MongoDB Atlas account

### Installation

1. **Clone the repository**
git clone https://github.com/yourusername/charters-business.git
cd charters-business

2. **Install dependencies**
npm run install

3. **Set up environment variables**

**Backend (.env in backend/):**
MONGODB_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=30d
CORS_ORIGIN=http://localhost:3000


**Frontend (.env.local in frontend/):**
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1


4. **Run development servers**
npm run dev


- Frontend: http://localhost:3000
- Backend: http://localhost:5000


## 🌐 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/profile` - Get user profile (protected)

### Users
- `GET /api/v1/users` - Get all users (protected)
- `GET /api/v1/users/:id` - Get user by ID (protected)
- `PUT /api/v1/users/:id` - Update user (protected)
- `DELETE /api/v1/users/:id` - Delete user (protected)


### Working on Frontend
cd frontend
npm run dev


### Working on Backend
cd backend
npm run dev


## 📝 License

ISC

## 👤 Author

Kaushal 
