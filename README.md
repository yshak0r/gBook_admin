# GradBook Admin Dashboard

A comprehensive admin dashboard for managing the GradBook platform - a graduate yearbook social media application.

## Features

- **Authentication & Authorization**: Secure login with JWT tokens and role-based access control
- **Dashboard Overview**: Real-time analytics and platform metrics
- **User Management**: Comprehensive user administration with search, filtering, and user actions
- **Content Management**: Post and content moderation tools
- **Academic Structure**: Manage campuses, colleges, and departments
- **Report Management**: Handle user reports and content moderation
- **Analytics**: Rich data visualization with charts and insights
- **Question & Tag Management**: Dynamic content management
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Dark/Light Mode**: Theme switching for user preference

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Components**: Shadcn/UI with Tailwind CSS
- **State Management**: Zustand (UI) + TanStack Query (Server)
- **Forms**: React Hook Form with Zod validation
- **Charts**: Recharts for data visualization
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd gradbook-admin
```

2. Install dependencies:
```bash
npm install
```

3. Copy environment variables:
```bash
cp .env.example .env
```

4. Update the environment variables in `.env`:
```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
VITE_GA_TRACKING_ID=your_ga_tracking_id
```

5. Start the development server:
```bash
npm run dev
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── auth/           # Authentication components
│   ├── layout/         # Layout components (Sidebar, Header)
│   └── ui/             # Shadcn/UI components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and API client
├── pages/              # Page components
├── stores/             # Zustand stores
├── types/              # TypeScript type definitions
├── App.tsx             # Main application component
└── main.tsx            # Application entry point
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## API Integration

The dashboard connects to the GradBook Backend API. Key endpoints include:

- `/auth/login` - Admin authentication
- `/admin/users` - User management
- `/admin/analytics` - Platform analytics
- `/admin/reports` - Report management
- `/admin/questions` - Question management
- `/admin/tags` - Tag management

## Features Overview

### User Management
- View all users with pagination and filtering
- Search by name, email, or username
- Filter by role, status, campus, college, department
- Activate/deactivate users
- View detailed user profiles

### Dashboard Analytics
- Total users, posts, and reports
- User growth trends
- Post activity charts
- Top performing campuses
- Real-time statistics

### Content Management
- View and moderate posts
- Soft delete inappropriate content
- Comment moderation
- Content analytics

### Academic Structure
- Manage campus hierarchy
- Create and edit colleges/departments
- View user distribution by academic structure
- Tree view of academic relationships

### Report Management
- Review user reports
- Take action on reported content
- Track report resolution
- Filter by report type and status

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.