# SQL Query Runner

A modern, high-performance web-based SQL query runner built with React, TypeScript, and Vite. This application provides a comprehensive interface for executing SQL queries, managing datasets, and visualizing results with advanced table features.

## 🎥 Demo Video

_[A 3-minute walkthrough video showcasing the implementation and query execution features will be added here]_

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
- **Synchronized Scrolling**: Header and data columns stay perfectly aligned

### Safety & Confirmation

- **Query Confirmation**: Safety dialogs for destructive operations (CREATE, DELETE, DROP, DUMP)
- **Operation Feedback**: Clear success/error messages with execution statistics
- **Real-time Stats**: Track total queries executed, execution time, and cumulative result rows
- **Customizable Metrics**: Choose from 6 different statistics cards including dataset info, query counts, performance metrics, and timing data

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

## 📊 Performance Metrics

### Build Performance

- **Bundle Size**: 565.29 kB (174.20 kB gzipped)
- **CSS Size**: 49.58 kB (9.40 kB gzipped)
- **Build Time**: ~1.5 seconds
- **Modules Transformed**: 1,767

### Runtime Performance

- **Initial Load Time**: < 2 seconds on modern browsers
- **Table Rendering**: Handles 5,000+ rows with smooth scrolling
- **Query Execution**: Simulated queries execute in 50-500ms
- **Theme Switching**: Instant with no layout shift
- **Search/Filter**: Real-time with no noticeable lag

### Optimizations Implemented

1. **Code Splitting**: Dynamic imports for route-based splitting
2. **Virtualized Rendering**: Only renders visible table rows
3. **Memoized Components**: React.memo and useMemo for expensive calculations
4. **Efficient State Management**: Context API with selective subscriptions
5. **Optimized Bundle**: Tree-shaking and minification via Vite
6. **CSS Optimization**: Tailwind CSS purging and compression
7. **Compact UI Design**: Reduced padding and optimized spacing for better information density

## 🗄 Datasets

The application includes 7 comprehensive datasets with realistic business data:

1. **Employees** (150 records, 15 columns) - Employee information and organizational structure
2. **Customers** (500 records, 11 columns) - Customer contact information and company details
3. **Products** (200 records, 10 columns) - Product catalog with pricing and inventory
4. **Orders** (2,000 records, 14 columns) - Order transactions and customer relationships
5. **Order Details** (5,000 records, 5 columns) - Detailed order line items
6. **Categories** (8 records, 3 columns) - Product categorization
7. **Suppliers** (30 records, 11 columns) - Supplier contact and company information

Each dataset includes 10+ sample queries covering various SQL operations and complexity levels.

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
- **Customize Stats**: Click the settings icon in the stats section to:
    - Show/hide individual stat cards
    - Choose from 6 available metrics: Dataset, Total Records, Queries, Avg Speed, Total Time, Max Speed
    - Reset to default configuration
    - Automatic grid layout adjustment based on visible cards

### Keyboard Shortcuts

- `Ctrl+Enter` - Execute query
- `Ctrl+S` - Save current query
- `F11` - Toggle fullscreen editor

### SQL Operations Supported

- **SELECT** - Data retrieval with full result display
- **CREATE** - Table/view creation with success confirmation
- **INSERT** - Data insertion with affected row count
- **UPDATE** - Data modification with affected row count
- **DELETE** - Data removal with affected row count
- **DROP** - Table/view deletion with confirmation dialog
- **DUMP** - Data export simulation with file path display

## 🏗 Architecture

### Component Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (Radix + Tailwind)
│   ├── DataTable.tsx   # High-performance virtualized table
│   ├── QueryEditor.tsx # Monaco-based SQL editor
│   ├── Layout.tsx      # Main application layout
│   └── ...
├── contexts/           # React Context providers
├── data/              # Sample datasets and schemas
├── pages/             # Route components
├── utils/             # Utility functions and query simulator
└── lib/               # Shared libraries and configurations
```

### State Management

- **React Context** for global state (datasets, stats, theme)
- **Local State** for component-specific data
- **Custom Hooks** for reusable stateful logic

### Performance Considerations

- **Virtualization** for large datasets
- **Memoization** for expensive computations
- **Code Splitting** for optimal loading
- **Efficient Re-renders** with proper dependency arrays

## 🔧 Customization

### Adding New Datasets

1. Define dataset structure in `src/data/sampleData.ts`
2. Include sample queries for the dataset
3. Dataset will automatically appear in the selector

### Extending SQL Operations

1. Add operation logic in `src/utils/querySimulator.ts`
2. Update the `QueryResult` interface if needed
3. Handle new operation types in `DataTable.tsx`

### Theme Customization

1. Modify Tailwind configuration in `tailwind.config.ts`
2. Update CSS variables in `src/index.css`
3. Themes automatically apply to all components

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Deploy to Netlify

1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Configure redirects for SPA routing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Monaco Editor** for the powerful code editing experience
- **TanStack** for excellent table and virtualization libraries
- **Radix UI** for accessible component primitives
- **Tailwind CSS** for rapid UI development
- **Vite** for blazing-fast development experience
