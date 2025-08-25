# NoteSaver - Full Stack Application

A modern web application for creating, managing, and sharing text pastes/notes with user authentication and real-time updates.

## Features

- 🔐 **User Authentication** - Secure login/register with JWT tokens
- 📝 **Create & Edit Pastes** - Rich text editor with real-time saving
- 🔒 **Privacy Control** - Make pastes public or private
- 📱 **Responsive Design** - Works on desktop and mobile
- ⚡ **Real-time Updates** - Instant feedback and notifications
- 🎨 **Modern UI** - Clean, intuitive interface with Tailwind CSS

## Tech Stack

### Frontend

- **React 19** - Modern React with hooks
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool
- **React Hot Toast** - Toast notifications

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

## Installation

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd NoteSaver
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Install Backend Dependencies

```bash
cd backend
npm install
```

### 4. Environment Setup

Create a `.env` file in the backend directory:

```bash
cd backend
cp config.env .env
```

Update the `.env` file with your configuration:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/notesaver
JWT_SECRET=your_jwt_secret_key_here_make_it_long_and_secure
JWT_EXPIRE=7d
```

### 5. Start MongoDB

Make sure MongoDB is running on your system:

```bash
# On Windows
mongod

# On macOS/Linux
sudo systemctl start mongod
```

### 6. Start the Backend Server

```bash
cd backend
npm run dev
```

The backend will start on `http://localhost:5000`

### 7. Start the Frontend Development Server

```bash
# In a new terminal, from the root directory
npm run dev
```

The frontend will start on `http://localhost:5173`

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile

### Pastes

- `GET /api/pastes` - Get all pastes for current user
- `POST /api/pastes` - Create a new paste
- `GET /api/pastes/:id` - Get a specific paste
- `PUT /api/pastes/:id` - Update a paste
- `DELETE /api/pastes/:id` - Delete a paste
- `GET /api/pastes/public/all` - Get all public pastes

## Usage

1. **Register/Login** - Create an account or sign in
2. **Create Pastes** - Write and save your notes
3. **Manage Pastes** - Edit, delete, or make them public
4. **Share** - Share public pastes with others

## Deployment

### Frontend Deployment (Vercel)

1. **Push your code to GitHub**
2. **Go to [Vercel](https://vercel.com)**
3. **Import your repository**
4. **Set environment variables**:
   - `VITE_API_URL`: Your backend URL (e.g., `https://your-backend.onrender.com/api`)
5. **Deploy**

### Backend Deployment (Render)

1. **Push your code to GitHub**
2. **Go to [Render](https://render.com)**
3. **Create a new Web Service**
4. **Connect your repository**
5. **Configure the service**:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment Variables**:
     - `MONGODB_URI`: Your MongoDB Atlas connection string
     - `JWT_SECRET`: Your JWT secret key
     - `JWT_EXPIRE`: `7d`
6. **Deploy**

### Environment Variables for Production

**Frontend (.env):**

```env
VITE_API_URL=https://your-backend-url.com/api
```

**Backend (.env):**

```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/notesaver
JWT_SECRET=your_production_jwt_secret
JWT_EXPIRE=7d
```

## Project Structure

```
NoteSaver/
├── src/                    # Frontend source code
│   ├── components/         # React components
│   ├── redux/             # Redux store and slices
│   └── ...
├── backend/               # Backend source code
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   └── ...
└── ...
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email support@notesaver.com or create an issue in the repository.
