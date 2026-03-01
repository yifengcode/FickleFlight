# FickleFlight ✈️

A modern, responsive flight booking and hotel reservation platform built with React and TypeScript. FickleFlight provides users with an intuitive interface to search, compare, and book flights and accommodations with ease.

## 🌟 Features

- **Flight Search & Booking**: Search for flights with flexible date selection and filtering options
- **Hotel Reservations**: Browse and book hotel accommodations alongside flight bookings
- **Interactive Date Picker**: Modern date selection interface powered by Material-UI components
- **Responsive Design**: Optimized for desktop and mobile devices
- **Real-time Search**: Dynamic search functionality with autocomplete and filters
- **Modern UI/UX**: Clean, intuitive interface designed for optimal user experience

## 🚀 Technology Stack

### Frontend
- **React 19** - Modern React with concurrent features
- **TypeScript** - Type-safe development with enhanced IDE support
- **Material-UI (MUI)** - Comprehensive React component library
- **React Router** - Client-side routing and navigation
- **Date-fns** - Modern JavaScript date utility library

### Development Tools
- **React Scripts** - Build tooling and development server
- **ESLint** - Code linting and quality enforcement
- **Web Vitals** - Performance monitoring and metrics

## 🏗️ Project Architecture

```
src/
├── components/           # React components
│   ├── Homepage.tsx     # Main landing page with search functionality
│   ├── ResultsPage.tsx  # Flight search results and filtering
│   ├── HotelsPage.tsx   # Hotel booking interface
│   ├── MatterhornPopup.tsx  # Modal components
│   └── PortalPopup.tsx  # Reusable popup wrapper
├── App.tsx              # Main application component
├── index.tsx           # Application entry point
└── global.css          # Global styles

public/
├── images/             # Static assets and images
└── icons/              # SVG icons and graphics
```

## 🛠️ Development Environment Setup

### Prerequisites

Ensure you have the following installed:
- **Node.js** >= 20.0.0 ([Download here](https://nodejs.org/en/download/))
- **npm** (comes with Node.js) or **yarn**
- **Git** for version control

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yifengcode/FickleFlight.git
   cd FickleFlight
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```
   The application will open at [http://localhost:3000](http://localhost:3000)

4. **Build for production**
   ```bash
   npm run build
   ```

### Available Scripts

- `npm start` - Runs the development server
- `npm run build` - Creates optimized production build
- `npm test` - Runs the test suite
- `npm run eject` - Ejects from Create React App (⚠️ irreversible)

## 📱 Application Features

### Flight Booking Flow
1. **Search**: Enter departure/arrival locations and dates
2. **Filter**: Apply filters for price, airlines, and preferences
3. **Select**: Choose from available flight options
4. **Book**: Complete booking with passenger details

### Hotel Integration
- Browse hotels in destination cities
- Filter by price, rating, and amenities
- Book accommodations alongside flights

## 🎨 UI Components

The application uses Material-UI components for consistent design:
- **Autocomplete** for location search
- **DatePicker** for date selection
- **Radio buttons** and **Checkboxes** for filters
- **Cards** for displaying search results
- **Modals** for detailed views and confirmations

## 🤝 Contributing

We welcome contributions to FickleFlight! Please follow these guidelines:

### Getting Started
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes following our coding standards
4. Test your changes thoroughly
5. Commit with clear messages: `git commit -m 'Add amazing feature'`
6. Push to your fork: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Code Style Guidelines
- Use TypeScript for all new components
- Follow React functional component patterns with hooks
- Use Material-UI components when possible
- Maintain consistent file naming conventions
- Include proper TypeScript interfaces and types
- Write descriptive commit messages

### Pull Request Process
1. Ensure your code builds without warnings
2. Update documentation for any new features
3. Include screenshots for UI changes
4. Request review from maintainers
5. Address any feedback promptly

## 📋 Development Guidelines

### Component Structure
```typescript
interface ComponentProps {
  className?: string;
  // other props
}

const Component: FunctionComponent<ComponentProps> = ({ 
  className = "" 
}) => {
  // component logic
  return (
    <div className={[styles.component, className].join(" ")}>
      {/* component JSX */}
    </div>
  );
};
```

### Styling
- Use CSS Modules for component-specific styles
- Follow BEM naming conventions where applicable
- Utilize Material-UI theme system for consistency

## 🐛 Issues & Support

If you encounter any issues or have questions:

1. Check existing [GitHub Issues](https://github.com/yifengcode/FickleFlight/issues)
2. Search for similar problems or solutions
3. Create a new issue with:
   - Clear description of the problem
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots (if applicable)
   - Environment details

## 📄 License

This project is created for educational and demonstration purposes. Please ensure you have appropriate licenses for any commercial use.

---

**Happy Flying!** ✈️ Made with ❤️ by the FickleFlight team
