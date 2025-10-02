# 🚀 NeoPost - Futuristic Blog Platform

A modern, futuristic blog platform with glassmorphism design, neon gradients, and smooth micro-animations. Built with React.js frontend and Node.js backend with role-based access control (RBAC).

![NeoPost Preview](https://via.placeholder.com/800x400/0f0f23/00d4ff?text=NeoPost+-+Futuristic+Blog+Platform)

## ✨ Features

### 🎨 **Futuristic Design**
- **Glassmorphism Effects**: Backdrop blur with semi-transparent backgrounds
- **Neon Gradients**: Blue, Purple, Cyan, and Pink accent colors
- **Smooth Animations**: Fade-in, slide-in, hover effects, and micro-animations
- **Modern Typography**: Space Grotesk and Inter fonts with gradient text effects
- **Dark/Light Themes**: Comprehensive theme system with smooth transitions

### 👥 **User Features**
- **Modern Home Page**: Stylish post cards with interactive search and filtering
- **Enhanced Authentication**: Glassmorphism login/signup forms with password visibility toggle
- **Responsive Design**: Fully mobile-responsive across all devices
- **Interactive Elements**: Like, share, and bookmark functionality
- **Real-time Search**: Filter posts by title, content, or author

### 🛡️ **Admin Features**
- **Professional Dashboard**: Glowing analytics cards with performance metrics
- **Content Management**: Create, edit, and delete posts with rich form controls
- **User Management**: Role-based access control (User/Admin)
- **Analytics Display**: Real-time metrics with animated counters
- **Theme Toggle**: System-wide theme switching

### 🔧 **Technical Features**
- **RBAC System**: Role-based access control for users and admins
- **JWT Authentication**: Secure token-based authentication
- **MongoDB Integration**: NoSQL database for scalable data storage
- **RESTful API**: Clean API endpoints for all operations
- **Modern React**: Hooks, Context API, and functional components

## 🛠️ Tech Stack

### Frontend
- **React.js** - Modern JavaScript library
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **CSS3** - Custom styling with CSS variables and animations

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd rbac-blog-platform
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Create environment file**
   Create a `.env` file in the backend directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/rbac-blog-platform
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   PORT=5000
   ```

4. **Frontend Setup**
   ```bash
   cd ../frontend/my-app
   npm install
   ```

### Running the Application

1. **Start MongoDB** (if running locally)
   ```bash
   mongod
   ```

2. **Start Backend Server**
   ```bash
   cd backend
   npm start
   ```
   Server will run on `http://localhost:5000`

3. **Start Frontend Development Server**
   ```bash
   cd frontend/my-app
   npm start
   ```
   Application will open on `http://localhost:3000`

## 📁 Project Structure

```
rbac-blog-platform/
├── backend/
│   ├── middleware/
│   │   └── auth.js              # Authentication middleware
│   ├── models/
│   │   ├── Post.js              # Post model
│   │   └── User.js              # User model
│   ├── routes/
│   │   ├── auth.js              # Authentication routes
│   │   └── posts.js             # Post CRUD routes
│   ├── server.js                # Express server setup
│   ├── package.json
│   └── .env                     # Environment variables
├── frontend/my-app/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx       # Navigation component
│   │   │   └── Navbar.css       # Navbar styles
│   │   ├── pages/
│   │   │   ├── Home.jsx         # Home page with posts
│   │   │   ├── Home.css         # Home page styles
│   │   │   ├── Login.jsx        # Login page
│   │   │   ├── Signup.jsx       # Signup page
│   │   │   ├── AdminDashboard.jsx # Admin dashboard
│   │   │   └── admin-dashboard.css # Admin styles
│   │   ├── App.jsx              # Main app component
│   │   ├── App.css              # Global styles
│   │   └── index.js             # React entry point
│   └── package.json
└── README.md
```

## 🎨 Design System

### Color Palette
- **Primary Blue**: `#00d4ff` - Main accent color
- **Primary Purple**: `#8b5cf6` - Secondary accent
- **Primary Cyan**: `#06b6d4` - Tertiary accent
- **Accent Pink**: `#f472b6` - Highlight color
- **Accent Green**: `#10b981` - Success states

### Typography
- **Primary Font**: Space Grotesk (Headings)
- **Secondary Font**: Inter (Body text)
- **Font Weights**: 300, 400, 500, 600, 700

### Spacing Scale
- **XS**: 0.25rem (4px)
- **SM**: 0.5rem (8px)
- **MD**: 1rem (16px)
- **LG**: 1.5rem (24px)
- **XL**: 2rem (32px)
- **2XL**: 3rem (48px)
- **3XL**: 4rem (64px)

## 🔐 Authentication & Authorization

### User Roles
- **User**: Can view and interact with posts
- **Admin**: Full access to dashboard and content management

### Protected Routes
- `/admin` - Admin dashboard (Admin only)
- `/login` - Redirects if already authenticated
- `/signup` - Redirects if already authenticated

### JWT Token Structure
```json
{
  "userId": "user_id",
  "role": "user|admin",
  "iat": "issued_at",
  "exp": "expires_at"
}
```

## 📱 Responsive Breakpoints

- **Mobile**: < 480px
- **Tablet**: 481px - 768px
- **Desktop**: 769px - 1024px
- **Large Desktop**: > 1024px

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login

### Posts
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create new post (Auth required)
- `PUT /api/posts/:id` - Update post (Auth required)
- `DELETE /api/posts/:id` - Delete post (Auth required)

## 🚀 Deployment

### Environment Variables
```env
# Production Environment
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
JWT_SECRET=your-production-jwt-secret-key
PORT=5000
NODE_ENV=production
```

### Build for Production
```bash
# Frontend
cd frontend/my-app
npm run build

# Backend
cd backend
npm start
```

## 🎨 Customization

### Changing Colors
Update CSS variables in `src/App.css`:
```css
:root {
  --primary-blue: #your-color;
  --primary-purple: #your-color;
  /* ... other variables */
}
```

### Adding New Themes
1. Add theme variables in `App.css`
2. Update theme toggle logic in `Navbar.jsx`
3. Add theme persistence in localStorage

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Design inspiration from modern UI/UX trends
- Glassmorphism design principles
- React and Node.js communities
- MongoDB documentation and best practices

## 📞 Support

For support, email your-email@example.com or create an issue in the GitHub repository.

---

**Made with ❤️ and futuristic design principles**
