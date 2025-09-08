# Bitwreckers Backend API

Backend API for Bitwreckers website built with FastAPI and PostgreSQL.

## Features

- 🔐 JWT Authentication with refresh tokens
- 👥 User management (students, developers, admins)
- 📁 Project management with file uploads
- 🗄️ PostgreSQL database with async SQLAlchemy
- 📧 Email functionality
- 🔒 Security features (CORS, rate limiting, password hashing)
- 📚 Auto-generated API documentation
- 🧪 Testing setup with pytest

## Tech Stack

- **Framework**: FastAPI
- **Database**: PostgreSQL with async SQLAlchemy
- **Authentication**: JWT with refresh tokens
- **Password Hashing**: bcrypt
- **Email**: SMTP with Python
- **Documentation**: Auto-generated OpenAPI/Swagger
- **Testing**: pytest with async support

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

5. **Set up database**
   ```bash
   # Create PostgreSQL database
   createdb bitwreckers
   
   # Run migrations (if using Alembic)
   alembic upgrade head
   ```

6. **Run the application**
   ```bash
   python main.py
   # Or with uvicorn
   uvicorn main:app --reload
   ```

## Environment Variables

Copy `env.example` to `.env` and configure:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost/bitwreckers

# Security
SECRET_KEY=your-super-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# CORS
CORS_ORIGINS=["http://localhost:3000"]
```

## API Documentation

Once the server is running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc
- **Health Check**: http://localhost:8000/health

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/refresh` - Refresh access token

### Users
- `GET /api/v1/users/me` - Get current user profile
- `PUT /api/v1/users/me` - Update user profile
- `GET /api/v1/users/{id}` - Get user by ID (admin only)

### Projects
- `GET /api/v1/projects` - Get all projects
- `POST /api/v1/projects` - Create new project
- `GET /api/v1/projects/{id}` - Get project by ID
- `PUT /api/v1/projects/{id}` - Update project
- `DELETE /api/v1/projects/{id}` - Delete project

## Development

### Running Tests
```bash
pytest
```

### Code Formatting
```bash
black .
isort .
```

### Database Migrations
```bash
# Create new migration
alembic revision --autogenerate -m "Description"

# Apply migrations
alembic upgrade head
```

## Project Structure

```
backend/
├── app/
│   ├── api/
│   │   └── v1/
│   │       ├── endpoints/
│   │       │   ├── auth.py
│   │       │   ├── users.py
│   │       │   └── projects.py
│   │       └── api.py
│   ├── core/
│   │   ├── config.py
│   │   ├── database.py
│   │   └── security.py
│   ├── models/
│   │   ├── user.py
│   │   └── project.py
│   └── schemas/
│       ├── user.py
│       └── project.py
├── main.py
├── requirements.txt
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Run tests and linting
6. Submit a pull request

## License

MIT License
