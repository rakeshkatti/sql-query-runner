# SQL Query Runner

A modern, high-performance web-based SQL query runner built with React, TypeScript, and Vite. This application provides a comprehensive interface for executing SQL queries, managing datasets, and visualizing results with advanced table features.

## ✨ Features

### Core Functionality

- **Advanced SQL Editor**: Monaco Editor with full SQL syntax highlighting, auto-completion, and keyboard shortcuts
- **Multiple Datasets**: Pre-loaded with 7 comprehensive datasets (Employees, Customers, Products, Orders, etc.)
- **Query Simulation**: Realistic SQL operation simulation supporting SELECT, CREATE, INSERT, UPDATE, DELETE, DROP, and DUMP operations
- **High-Performance Data Display**: Virtualized table rendering capable of handling thousands of rows without performance degradation

### User Experience

- **Dark/Light Theme**: Seamless theme switching with system preference detection
- **Query Management**: Save, organize, and manage frequently used queries
- **Query History**: Automatic tracking of executed queries with timestamps and execution times
- **Sample Queries**: Pre-built queries for each dataset to get started quickly
- **Export Functionality**: Export query results to CSV or JSON formats
- **Customizable Stats Dashboard**: Personalize statistics cards with show/hide toggles and additional metrics

### Advanced Table Features

- **Virtualized Scrolling**: Smooth performance with large datasets using TanStack Virtual
- **Column Sorting**: Click column headers to sort data ascending/descending
- **Global Search**: Real-time filtering across all columns
- **Configurable Page Size**: Choose from 25, 50, 100, 500, 1000, or All rows

### Safety & Confirmation

- **Query Confirmation**: Safety dialogs for destructive operations (CREATE, DELETE, DROP, DUMP)
- **Operation Feedback**: Clear success/error messages with execution statistics
- **Real-time Stats**: Track total queries executed, execution time, and cumulative result rows
- **Customizable Metrics**: Choose from different statistics cards including dataset info, query counts, performance metrics, and timing data. We can add more here based on requirement.

## 🛠 Tech Stack

### Frontend Framework

- **React 19.1.0** - Latest React with concurrent features
- **TypeScript 5.8.3** - Type-safe development
- **Vite 6.3.5** - Lightning-fast build tool and dev server

### UI Components & Styling

- **Tailwind CSS 4.1.8** - Utility-first CSS framework
- **Radix UI** - Accessible, unstyled UI primitives
- **Lucide React** - Beautiful, customizable icons
- **Sonner** - Toast notifications
- **next-themes** - Theme management

### Advanced Features

- **Monaco Editor** - VS Code-powered SQL editor
- **TanStack Table** - Powerful table with sorting, filtering, and virtualization
- **TanStack Virtual** - Efficient virtualization for large datasets
- **React Router DOM** - Client-side routing

### Development Tools

- **ESLint** - Code linting with React and TypeScript rules
- **Prettier** - Code formatting
- **TypeScript ESLint** - TypeScript-specific linting rules

### Runtime Performance

- **Largest Contentful Paint (LCP)**: Less than 0.5s
- **Cumulative Layout Shift (CLS)**: Zero
- **Interaction to Next Paint (INP)**: Less than 50ms

### Optimizations Implemented

- **Virtualized Rendering**: Only renders visible table rows
- **Efficient State Management**: Context API with selective subscriptions
- **Optimized Bundle**: Minification via Vite

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn package manager

### Installation

1. **Clone the repository**

    ```bash
    git clone <repository-url>
    cd sql-query-runner
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Start development server**

    ```bash
    npm run dev
    ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
npm run check-all    # Run all checks (lint + format)
npm run fix-all      # Fix all issues (lint + format)
```

## 💡 Usage Guide

### Basic Query Execution

1. Select a dataset from the dropdown
2. Choose a sample query or write your own
3. Click "Run Query" or press `Ctrl+Enter`
4. View results in the interactive table below

### Advanced Features

- **Fullscreen Editor**: Click the expand icon for distraction-free editing
- **Save Queries**: Use the save button to store frequently used queries
- **Export Data**: Export results as CSV or JSON using the export buttons
- **Theme Toggle**: Switch between light and dark modes
- **Stats Panel**: Toggle statistics display for query metrics

<!-- ### Keyboard Shortcuts

**Windows/Linux:**

- `Ctrl+Enter` - Execute query
- `Ctrl+S` - Save current query
- `F11` - Toggle fullscreen editor
- `Escape` - Exit fullscreen mode

**Mac:**

- `Cmd+Enter` - Execute query
- `Cmd+S` - Save current query
- `F11` - Toggle fullscreen editor
- `Escape` - Exit fullscreen mode -->

### Theme Customization

1. Modify Tailwind configuration in `tailwind.config.ts`
2. Update CSS variables in `src/index.css`
3. Themes automatically apply to all components

## 🙏 Acknowledgments

- **Monaco Editor** for the powerful code editing experience
- **TanStack** for excellent table and virtualization libraries
- **Radix UI** for accessible component primitives
- **Tailwind CSS** for rapid UI development
- **Vite** for blazing-fast development experience
