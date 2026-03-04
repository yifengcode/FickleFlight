# ✈️ FickleFlight

<div align="center">

**A Modern Flight and Hotel Booking Platform**

[![React](https://img.shields.io/badge/React-19.0.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-blue.svg)](https://www.typescriptlang.org/)
[![Material-UI](https://img.shields.io/badge/Material--UI-7.0.2-blue.svg)](https://mui.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

</div>

---

## 📖 About The Project

FickleFlight is a modern, responsive web application designed to simplify the process of booking flights and hotels. Built with cutting-edge technologies, this platform offers an intuitive user interface that makes travel planning effortless and enjoyable.

### ✨ Key Features

- 🔍 **Smart Search** - Advanced search functionality for flights and hotels
- 📅 **Date Selection** - Integrated date picker for easy travel date management
- 🏨 **Hotel Browsing** - Explore and book hotels at popular destinations
- ✈️ **Flight Booking** - Search and compare flights from multiple airlines
- 📱 **Responsive Design** - Seamless experience across all devices
- 🎨 **Modern UI** - Clean and intuitive interface built with Material-UI
- 🌍 **Popular Destinations** - Featured destinations including Greece, Norway, Tuscany, and more

---

## 🛠️ Technology Stack

### Frontend
- **React 19.0.0** - A JavaScript library for building user interfaces
- **TypeScript 4.9.5** - Typed superset of JavaScript
- **Material-UI 7.0.2** - React component library implementing Material Design
- **React Router DOM 7.5.0** - Declarative routing for React applications
- **Emotion** - CSS-in-JS library for styling components

### Date & Time
- **@mui/x-date-pickers** - Advanced date and time picker components
- **date-fns** - Modern JavaScript date utility library

### Development Tools
- **React Scripts 5.0.1** - Configuration and scripts for Create React App
- **Jest & React Testing Library** - Testing framework and utilities

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (version 20.x or higher) - [Download](https://nodejs.org/en/download/)
- **npm** (comes with Node.js) or **yarn**
- A modern web browser (Chrome, Firefox, Safari, or Edge)
- **Visual Studio Code** (recommended) - [Download](https://code.visualstudio.com/download/)

---

## 🚀 Getting Started

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yifengcode/FickleFlight.git
   cd FickleFlight
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

### Running the Application

**Development Mode**
```bash
npm start
```
The application will open in your browser at [http://localhost:3000](http://localhost:3000)

**Production Build**
```bash
npm run build
```
Creates an optimized production build in the `build` folder.

**Running Tests**
```bash
npm test
```
Launches the test runner in interactive watch mode.

---

## 📁 Project Structure

```
FickleFlight/
├── public/                 # Static files
│   ├── index.html         # HTML template
│   ├── logo.svg           # Application logo
│   └── [images/icons]     # Image assets
├── src/                   # Source files
│   ├── components/        # React components
│   │   ├── Homepage.tsx   # Landing page component
│   │   ├── HotelsPage.tsx # Hotels listing page
│   │   ├── ResultsPage.tsx # Search results page
│   │   └── [other components]
│   ├── App.tsx            # Main application component
│   ├── index.tsx          # Application entry point
│   └── typings.d.ts       # TypeScript type definitions
├── package.json           # Project dependencies and scripts
├── tsconfig.json          # TypeScript configuration
└── README.md              # Project documentation
```

---

## 🤝 Contributing

We welcome contributions from the community! Whether you're fixing bugs, adding new features, or improving documentation, your help is appreciated.

### How to Contribute

1. **Fork the Repository**
   - Click the "Fork" button at the top right of this repository

2. **Clone Your Fork**
   ```bash
   git clone https://github.com/your-username/FickleFlight.git
   cd FickleFlight
   ```

3. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
   Branch naming conventions:
   - `feature/` - New features
   - `fix/` - Bug fixes
   - `docs/` - Documentation updates
   - `refactor/` - Code refactoring
   - `test/` - Adding or updating tests

4. **Make Your Changes**
   - Write clean, readable code
   - Follow the existing code style
   - Add comments where necessary
   - Update documentation if needed

5. **Test Your Changes**
   ```bash
   npm test
   npm run build
   ```
   Ensure all tests pass and the build succeeds.

6. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "feat: add your descriptive commit message"
   ```
   Follow [Conventional Commits](https://www.conventionalcommits.org/) format:
   - `feat:` - New feature
   - `fix:` - Bug fix
   - `docs:` - Documentation changes
   - `style:` - Code style changes (formatting, etc.)
   - `refactor:` - Code refactoring
   - `test:` - Adding or updating tests
   - `chore:` - Maintenance tasks

7. **Push to Your Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

8. **Create a Pull Request**
   - Go to the original repository on GitHub
   - Click "New Pull Request"
   - Select your fork and branch
   - Fill in the PR template with details about your changes
   - Submit the pull request

### Contribution Guidelines

#### Code Style
- Use TypeScript for type safety
- Follow React best practices and hooks guidelines
- Use functional components with hooks
- Keep components small and focused
- Use meaningful variable and function names
- Add PropTypes or TypeScript interfaces for component props

#### Testing
- Write tests for new features
- Ensure existing tests pass
- Aim for meaningful test coverage
- Test edge cases and error scenarios

#### Documentation
- Update README.md if adding new features
- Add JSDoc comments for complex functions
- Update component documentation
- Include examples for new APIs

#### Pull Request Process
1. Ensure your PR description clearly describes the problem and solution
2. Include the relevant issue number if applicable
3. Update the documentation with details of changes
4. The PR must pass all CI/CD checks
5. Request review from maintainers
6. Address any feedback from code reviews

### 🐛 Reporting Bugs

If you find a bug, please create an issue with the following information:
- **Title**: Clear and descriptive title
- **Description**: Detailed description of the bug
- **Steps to Reproduce**: Step-by-step instructions
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Screenshots**: If applicable
- **Environment**: Browser, OS, Node version, etc.

### 💡 Suggesting Enhancements

We love new ideas! To suggest an enhancement:
- Check if the suggestion already exists in issues
- Create a new issue with the "enhancement" label
- Clearly describe the feature and its benefits
- Include mockups or examples if possible

### 📝 Code of Conduct

#### Our Pledge
We are committed to providing a welcoming and inspiring community for all. We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity, level of experience, nationality, personal appearance, race, religion, or sexual identity.

#### Our Standards
**Positive behavior includes:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

**Unacceptable behavior includes:**
- Harassment, trolling, or discriminatory comments
- Publishing others' private information
- Personal or political attacks
- Other conduct which could reasonably be considered inappropriate

#### Enforcement
Project maintainers have the right to remove, edit, or reject comments, commits, code, issues, and other contributions that do not align with this Code of Conduct.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Authors & Contributors

- **Original Author** - [@yifengcode](https://github.com/yifengcode)

See also the list of [contributors](https://github.com/yifengcode/FickleFlight/contributors) who participated in this project.

---

## 🙏 Acknowledgments

- Design inspiration from modern travel booking platforms
- Icons and illustrations from Material-UI
- React community for excellent documentation and support
- All contributors who have helped improve this project

---

## 📞 Contact & Support

- **Issues**: [GitHub Issues](https://github.com/yifengcode/FickleFlight/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yifengcode/FickleFlight/discussions)
- **Project Link**: [https://github.com/yifengcode/FickleFlight](https://github.com/yifengcode/FickleFlight)

---

## 🗺️ Roadmap

- [ ] Add user authentication and authorization
- [ ] Implement booking confirmation and payment integration
- [ ] Add user profile and booking history
- [ ] Integrate real-time flight and hotel data APIs
- [ ] Add multi-language support (i18n)
- [ ] Implement dark mode theme
- [ ] Add progressive web app (PWA) capabilities
- [ ] Create mobile application version

---

<div align="center">

**Made with ❤️ by the FickleFlight Team**

⭐ If you find this project useful, please consider giving it a star!

</div>
