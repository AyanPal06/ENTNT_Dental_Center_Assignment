# Dental Center Management System

A modern dental appointment management system built with React, designed for easy deployment on Netlify.

## Project Overview

This application provides a comprehensive dental practice management solution with patient management, appointment scheduling, and file uploads with local storage persistence.

**Live Demo**: Deploy to Netlify by connecting your repository or uploading the build files.

## Folder Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Shadcn/ui components (buttons, forms, etc.)
│   ├── AppointmentForm.jsx  # Main appointment form with file upload
│   ├── Layout.jsx       # Main layout with navigation
│   ├── PatientForm.jsx  # Patient registration/edit form
│   └── ProtectedRoute.jsx   # Route protection wrapper
├── contexts/            # React context providers
│   └── AuthContext.jsx  # Authentication state management
├── hooks/               # Custom React hooks
│   └── use-toast.js     # Toast notification hook
├── pages/               # Main application pages
│   ├── Appointments.jsx # Appointment management
│   ├── Calendar.jsx     # Calendar view
│   ├── Dashboard.jsx    # Main dashboard
│   ├── Login.jsx        # Authentication page
│   ├── PatientView.jsx  # Patient details view
│   └── Patients.jsx     # Patient management
├── lib/                 # Utility libraries
│   └── utils.js         # Common utility functions
├── utils/               # Application utilities
│   └── mockData.js      # Sample data for development
└── main.jsx            # Application entry point
```

## Tech Stack & Decisions

### Core Technologies
- **React 18.3.1** - Modern React with hooks for component state management
- **Vite** - Fast build tool and development server
- **React Router DOM** - Client-side routing for SPA navigation
- **Tailwind CSS** - Utility-first CSS framework for responsive design

### UI Components
- **Shadcn/ui** - High-quality, accessible component library built on Radix UI
- **Lucide React** - Beautiful icon library with consistent design
- **Recharts** - Responsive chart library for data visualization

### State Management
- **React Context** - Built-in state management for authentication
- **TanStack Query** - Server state management and caching
- **Local Storage** - Client-side persistence for appointments and files

### Key Design Decisions

#### File Upload Strategy
- Files are converted to **base64 strings** for localStorage persistence
- No server required - all data stored client-side
- Supports multiple file types with size information
- Memory-efficient with proper cleanup

#### Authentication
- Simple email/role-based authentication
- Persistent login state via localStorage
- Role-based navigation (Admin vs Patient views)

#### Data Persistence
- All application data stored in localStorage
- JSON serialization for complex objects
- Immediate persistence on user actions
- No backend database required

#### Responsive Design
- Mobile-first approach with Tailwind CSS
- Collapsible sidebar navigation
- Touch-friendly interface elements
- Adaptive layouts for all screen sizes

## Local Development Setup

1. **Clone or copy** the project files to your local directory
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start development server**:
   ```bash
   npm run dev
   ```
4. **Access the application** at `http://localhost:5173`

## Building for Production

1. **Create production build**:
   ```bash
   npm run build
   ```
2. **Preview build locally** (optional):
   ```bash
   npm run preview
   ```

## Netlify Deployment

### Method 1: Drag & Drop
1. Run `npm run build` locally
2. Drag the `dist` folder to Netlify's deploy interface
3. Your site will be live immediately

### Method 2: Git Integration
1. Push your code to GitHub/GitLab
2. Connect your repository in Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Deploy automatically on each push

### Environment Configuration
No environment variables required - the app runs entirely client-side.

## Features

- **Patient Management** - Add, edit, and view patient records
- **Appointment Scheduling** - Create and manage appointments with calendar view
- **File Uploads** - Attach documents to appointments (stored as base64)
- **Role-Based Access** - Different interfaces for Admin and Patient users
- **Responsive Design** - Works seamlessly on desktop and mobile
- **Offline Capable** - All data stored locally, no internet required after initial load

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance Notes

- File uploads are limited by browser localStorage capacity (~5-10MB)
- Large files are automatically converted to base64 (increases size by ~33%)
- Application state persists across browser sessions
- No server requests after initial page load

## Customization

The application uses a design system based on Tailwind CSS and Shadcn/ui components. Colors, spacing, and component styles can be customized through:

- `tailwind.config.js` - Tailwind configuration
- `src/index.css` - Global styles and CSS variables
- `components.json` - Shadcn/ui configuration
