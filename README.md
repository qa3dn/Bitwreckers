# Bitwreckers Website

A student-led programming company website built with Next.js frontend and FastAPI backend.

## 🚀 Features

- **Frontend (Next.js)**
  - Modern React with TypeScript
  - Tailwind CSS for styling
  - Framer Motion for animations
  - Responsive design
  - Internationalization (Arabic/English)
  - SEO optimized

- **Backend (FastAPI)**
  - Fast API with Python
  - PostgreSQL database
  - JWT authentication
  - File uploads
  - Email functionality
  - Auto-generated API docs

## 📁 Project Structure

```
bit2/
├── frontend/                 # Next.js frontend
│   ├── src/
│   │   ├── app/             # App router
│   │   ├── components/      # React components
│   │   └── styles/          # CSS styles
│   ├── locales/             # Translation files
│   └── package.json
├── backend/                  # FastAPI backend
│   ├── app/
│   │   ├── api/             # API endpoints
│   │   ├── core/            # Core functionality
│   │   ├── models/          # Database models
│   │   └── schemas/         # Pydantic schemas
│   ├── main.py              # FastAPI app
│   └── requirements.txt
└── README.md
```

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **I18n**: Next.js internationalization
- **Deployment**: Vercel (recommended)

### Backend
- **Framework**: FastAPI
- **Language**: Python 3.11+
- **Database**: PostgreSQL
- **ORM**: SQLAlchemy (async)
- **Authentication**: JWT
- **Documentation**: Auto-generated OpenAPI/Swagger
- **Deployment**: Docker, Railway, or Heroku

## 🚀 Quick Start

### Frontend Development

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   ```
   http://localhost:3000
   ```

### Backend Development

1. **Navigate to backend directory**
   ```bash
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

5. **Run development server**
   ```bash
   python main.py
   # Or: uvicorn main:app --reload
   ```

6. **Open API docs**
   ```
   http://localhost:8000/docs
   ```

## 🐳 Docker Deployment

### Backend with Docker Compose

```bash
cd backend
docker-compose up -d
```

This will start:
- FastAPI server on port 8000
- PostgreSQL database on port 5432
- Redis on port 6379

## 📚 API Documentation

Once the backend is running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc
- **Health Check**: http://localhost:8000/health

## 🌐 Internationalization

The frontend supports both Arabic and English:
- Arabic: RTL layout with Cairo font
- English: LTR layout with Inter font
- Automatic language detection
- Easy translation management

## 🔧 Development Commands

### Frontend
```bash
cd frontend
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint
npm run type-check   # TypeScript check
```

### Backend
```bash
cd backend
make run             # Development server
make test            # Run tests
make format          # Format code
make lint            # Lint code
make docker-run      # Run with Docker
```

## 📝 Environment Variables

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Backend (.env)
```env
DATABASE_URL=postgresql://user:password@localhost/bitwreckers
SECRET_KEY=your-super-secret-key-here
CORS_ORIGINS=["http://localhost:3000"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@bitwreckers.com or join our Discord server.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- FastAPI team for the high-performance API framework
- Tailwind CSS for the utility-first CSS framework
- Framer Motion for the smooth animations
