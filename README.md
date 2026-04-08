# Calendar

An interactive wall calendar web application built with Next.js, React, and Tailwind CSS.

## Overview

This calendar app displays a monthly view with navigation between months, date selection for creating event ranges, notes for each month, and public holiday integration. Each month features a distinct visual theme with unique accent colors applied throughout the UI.

## Tech Stack

- **Next.js 16** - React framework with app directory
- **React 19** - UI library with hooks
- **Tailwind CSS 4** - Utility-first CSS framework
- **TypeScript** - Static typing

## Project Structure

```
src/
├── app/               # Next.js app directory
├── components/        # React components
│   └── calendar/     # Calendar specific components
├── lib/             # Utility functions
│   └── calendar/   # Calendar logic (dates, storage, theme)
└── types/           # TypeScript definitions
```

## Setting Up

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Features

- Monthly calendar view with smooth animations
- Date range selection
- Month and range specific notes.
- Public holiday display (from tallyfy API)
- Custom events
- Keyboard shortcuts
- Theme per month
