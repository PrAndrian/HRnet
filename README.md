# HRnet - Employee File Management App

HRnet is a modernized employee file management application built using React.js, Vite, Tailwind CSS, and React Router v6. It aims to replace a previous version of the application developed using jQuery to provide better performance and maintainability. This README provides an overview of the project structure, dependencies, and how to get started with development and deployment.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development](#development)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

Before you begin, ensure you have the following software installed:

- Node.js: Make sure you have Node.js installed on your system. You can download it from [nodejs.org](https://nodejs.org/).

### Installation

1. Clone this repository to your local machine:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd hrnet-front
   ```

3. Install project dependencies using npm:

   ```bash
   npm install
   ```

### Development

To start a development server and work on the project, run the following command:

```bash
npm run dev
```

## Project Structure

The project structure follows a typical React.js application structure. Here are some key directories and files:

- **src**: Contains the application source code.
  - **assets**: Contains static assets like images, fonts...
  - **components**: React components used throughout the application.
  - **data**: Contains mock data used for development.
  - **pages**: Defines the application's pages components.
  - **redux**: Contains Redux store configuration and slices.
  - **utils**: Contains utility functions used throughout the application.
  - **App.js**: Defines the application's root component.
- **public**: Static assets like images, fonts, and HTML files.
- **package.json**: Lists project dependencies and scripts.
- **vite.config.js**: Vite configuration file.

## Dependencies

Here are the main dependencies used in this project:

- React and ReactDOM: Building user interfaces.
- React Router v6: Managing application routes.
- Tailwind CSS: Styling the application.
- @reduxjs/toolkit: State management (if applicable).
- @fortawesome/fontawesome-svg-core, @fortawesome/free-solid-svg-icons, @fortawesome/react-fontawesome: FontAwesome icons.
- Various other utility packages.

## Scripts

- `npm run dev`: Start the development server using Vite.
- `npm run build`: Build the production-ready application.
- `npm run lint`: Run ESLint to lint your JavaScript/JSX code.
- `npm run preview`: Preview the production build locally.

## License

This project is licensed under the MIT License. You are free to use, modify, and distribute the code as per the terms of the license, as outlined within the "private" repository. (It should be private it is easier to share like that)