# Restaurant Management System

A comprehensive restaurant management solution built with React, TypeScript, and Vite. This application helps restaurant owners and staff manage orders, inventory, menus, tables, expenses, and more.

![Restaurant Management System](./public/logo.png)

## Features

- **Dashboard**: Real-time analytics and restaurant performance metrics
- **Order Management**: Create, track, and manage customer orders
- **Menu Management**: Add, edit, and organize menu items and categories
- **Inventory Management**: Track stock levels and manage supplies
- **Table Management**: Manage restaurant tables and seating
- **Expense Tracking**: Record and categorize restaurant expenses
- **User Role Management**: Role-based access control for staff members
- **Kitchen Display System**: Real-time order updates for kitchen staff
- **Reports**: Generate sales, inventory, and performance reports

## Tech Stack

- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **UI Components**: Radix UI
- **Forms**: React Hook Form with Zod validation
- **State Management**: React Redux
- **Routing**: React Router
- **Charts**: Recharts
- **Icons**: Lucide React, Hugeicons

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Yarn or npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/nrbnayon/restaurant-management-system.git
   cd restaurant-management-system
   ```

2. Install dependencies:
   ```bash
   yarn install
   # or
   npm install
   ```

3. Start the development server:
   ```bash
   yarn dev
   # or
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

## Available Scripts

- `yarn dev` - Start the development server
- `yarn build` - Build for production
- `yarn lint` - Run ESLint
- `yarn lint:fix` - Fix ESLint issues
- `yarn preview` - Preview the production build
- `yarn type-check` - Run TypeScript type checking

## Project Structure

```
restaurant-management-system/
├── public/               # Static assets
├── src/
│   ├── Layouts/          # Layout components
│   ├── Pages/            # Page components
│   ├── Routers/          # Application routes
│   ├── assets/           # Images, icons, etc.
│   ├── components/       # Reusable components
│   ├── config/           # Configuration files
│   ├── contexts/         # React contexts
│   ├── data/             # Mock data
│   ├── hooks/            # Custom hooks
│   ├── lib/              # Utility functions
│   ├── redux/            # Redux store and slices
│   └── types/            # TypeScript type definitions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
