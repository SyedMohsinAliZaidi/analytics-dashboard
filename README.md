# Dedale Analytics Dashboard

A modern analytics dashboard built with React, TypeScript, Tailwind CSS, and Recharts.

This project was created as a demo to showcase frontend architecture, protected routing, dashboard UI design, reusable components, typed data models, and analytics-focused user experience.

## Demo Credentials

Use the following demo login:

- **Email:** admin@test.com
- **Password:** 123456

## Features

- Protected login flow
- Dashboard with KPI cards
- User growth line chart
- Monthly activity bar chart
- User distribution pie chart
- Recent activity table
- Top performers panel
- Goals overview progress section
- Date range selector
- Search/filter in recent activity
- Dark/light mode toggle
- Export report button
- Responsive dashboard layout

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- Recharts
- React Router DOM

## Project Structure

```bash
src/
├── components/
│   └── PrivateRoute.tsx
├── pages/
│   ├── Home.tsx
│   └── Login.tsx
├── services/
│   └── api.ts
├── types/
│   └── dashboard.ts
├── App.tsx
├── main.tsx
└── index.css
```
Design Approach

This project follows a modular structure:

pages contain screen-level views
components contain reusable UI and route protection
services handle data fetching logic
types define TypeScript interfaces for safer data handling

The goal was to keep the UI scalable, readable, and easy to extend with a real backend later.

How to Run Locally
1. Clone the repository
git clone https://github.com/SyedMohsinAliZaidi/analytics-dashboard.git
cd analytics-dashboard
2. Install dependencies
npm install
3. Start the app
npm run dev
4. Open in browser
http://localhost:5173
Future Improvements
Real backend integration with Node.js or .NET
JWT-based authentication
Role-based access control
Refresh tokens
Real-time analytics updates
CSV/PDF export from live data
Deployment to Vercel
Author

Syed Mohsin Ali Zaidi

LinkedIn: https://www.linkedin.com/in/mohsinalizaidi/
GitHub: https://github.com/SyedMohsinAliZaidi
