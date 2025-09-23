# AllCareer.AI – AI Career Mentor

<div align="center">

![SIH 2025](https://img.shields.io/badge/SIH-2025-blue?style=for-the-badge&logo=government&logoColor=white)
![Problem Statement](https://img.shields.io/badge/PS_ID-25199-success?style=for-the-badge)
![Category](https://img.shields.io/badge/Category-Software-important?style=for-the-badge)
![Theme](https://img.shields.io/badge/Theme-Smart%20Education-blueviolet?style=for-the-badge)

**An AI-Powered Personalized Learning Path Generator for Career Development**

[![Next.js](https://img.shields.io/badge/Next.js-13-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4-green?style=flat-square&logo=openai)](https://openai.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue?style=flat-square&logo=postgresql)](https://www.postgresql.org/)

[Demo](#-live-demo) • [Features](#-features) • [Installation](#-installation) • [Deployment](#-deployment) • [Team](#-team)

</div>

## 📋 Table of Contents

- [Overview](#-overview)
- [Problem Statement](#-problem-statement)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Deployment](#-deployment)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Contributing](#-contributing)
- [Team](#-team)
- [License](#-license)

## 🎯 Overview

**AllCareer.AI** is an intelligent career mentoring platform developed for **Smart India Hackathon 2025** under Problem Statement **PS-25199**. Our platform leverages advanced AI to provide personalized career guidance, skill gap analysis, and job market preparation tools for students, graduates, and professionals.

### 🎖️ Hackathon Details
- **Event:** Smart India Hackathon 2025
- **Problem Statement ID:** 25199
- **Title:** AI-Powered Personalized Learning Path Generator
- **Theme:** Smart Education
- **Category:** Software
- **Team:** Alpha

## ❓ Problem Statement

### Current Challenges
- 🎯 **Career Confusion:** Students struggle to choose suitable career paths
- 📊 **Skill Gap:** Mismatch between academic learning and industry requirements
- 💼 **Job Preparedness:** Lack of personalized interview and resume preparation
- 🤝 **Mentorship Gap:** Limited access to industry mentors and guidance

### Our Solution
AllCareer.AI addresses these challenges through:
- **AI-Driven Assessments** for personalized career matching
- **Dynamic Learning Paths** based on skill gap analysis
- **Real-time Market Insights** for informed decision making
- **Mentor Network** connecting users with industry experts

### ✨ Key Features

**🎯 Smart Career Matching**
- Quick assessment of your skills and interests
- Personalized career paths with clear steps

**📊 Skill Check** 
- See what skills you're missing for dream jobs
- Get recommended courses and resources

**💼 Resume Builder**
- Create ATS-friendly resumes in minutes  
- Tailor for specific job applications

**🎤 Practice Interviews**
- AI-powered mock interviews
- Instant feedback on your answers

**👥 Find Mentors**
- Connect with industry experts
- Get guidance from experienced professionals

**🧠 Personality Fit**
- Discover careers that match your personality
- Understand your work style preferences

**📈 Job Market Insights**
- Real-time salary information
- Industry trends and demand

**🏆 Track Progress**
- Earn badges and milestones  
- Visualize your career growth

---




## 💻 Installation

### Prerequisites
- Node.js 18.0 or higher
- PostgreSQL database
- OpenAI API account
- Firebase project

### Quick Start

```bash
# Clone the repository
git clone https://github.com/alpha-team-sih2025/allcareer-ai.git
cd allcareer-ai

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
```

### Development Setup

```bash
# Start development server
npm run dev

# Run database migrations
npm run db:push

# Run tests
npm run test
```

## ⚙️ Configuration

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# Database
DATABASE_URL="postgresql://user:pass@localhost:5432/allcareer"

# OpenAI
OPENAI_API_KEY="sk-your-openai-key"

# Firebase
FIREBASE_API_KEY="your-firebase-key"
FIREBASE_AUTH_DOMAIN="your-project.firebaseapp.com"
FIREBASE_PROJECT_ID="your-project-id"

# NextAuth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# External APIs
NODEMAILER_API_KEY="your-email-key"
```

### Database Setup

```sql
-- Initialize database (automatically handled by Drizzle)
CREATE DATABASE allcareer;

-- The application will automatically create tables via Drizzle migrations
```

## 🚀 Deployment

### Netlify Deployment

1. **Connect Repository**
   ```bash
   # Build command
   npm run build
   
   # Publish directory
   .next
   ```

2. **Environment Variables**
   Set all required environment variables in Netlify dashboard

3. **Deploy**
   ```bash
   # Automatic deployment from main branch
   git push origin main
   ```

### Manual Deployment

```bash
# Build the application
npm run build

# Export static files (if needed)
npm run export

# Deploy to your preferred platform
```

## 📁 Project Structure

```
allcareer-ai/
├── app/                    # Next.js app router
│   ├── (auth)/            # Authentication routes
│   ├── (dashboard)/       # User dashboard
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/                # Reusable UI components
│   ├── forms/             # Form components
│   └── dashboard/         # Dashboard specific components
├── lib/                   # Utility libraries
│   ├── db/                # Database configuration
│   ├── auth/              # Authentication utilities
│   ├── ai/                # AI service integrations
│   └── utils/             # Helper functions
├── public/                # Static assets
└── types/                 # TypeScript type definitions
```

## 📚 API Documentation

### Core Endpoints

```http
POST /api/assessment
Content-Type: application/json

{
  "skills": ["javascript", "react"],
  "interests": ["technology", "design"],
  "experience": 2
}

Response:
{
  "careerPaths": [...],
  "skillGaps": [...],
  "learningPath": [...]
}
```

### AI Services

```typescript
// Career Assessment
const assessment = await analyzeCareerProfile(userData);

// Resume Analysis
const resumeScore = await analyzeResume(resumeText, targetRole);

// Interview Simulation
const interview = await conductMockInterview(questions, responses);
```

## 🤝 Contributing

We welcome contributions from the community! Please see our contributing guidelines:

### Development Workflow

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Code Standards

- Use TypeScript for all new code
- Follow ESLint and Prettier configurations
- Write meaningful commit messages
- Add JSDoc comments for complex functions

## 📄 License

This project is developed for **Smart India Hackathon 2025** and is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Important Links

- [Live Demo](#) (Coming Soon)
- [Project Documentation](docs/)
- [API Reference](docs/api.md)
- [User Guide](docs/user-guide.md)
- [Presentation Deck](docs/presentation.pdf)


<div align="center">

**Built with ❤️ for Smart India Hackathon 2025**

*Empowering Careers through Artificial Intelligence*

![SIH 2025](https://img.shields.io/badge/Made%20for-SIH%202025-orange?style=for-the-badge&logo=government&logoColor=white)

</div>
