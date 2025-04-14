# Medal Count App

A simple Next.js application to display Olympic medal counts with sorting functionality.

## Key Features

-   Display top 10 countries by medal count
-   Sort by gold, silver, bronze, or total medals
-   URL parameter-based sorting
-   Cached data fetching
-   Simple and clean UI

## Implementation Approach

This project was intentionally kept minimal to demonstrate simplicity while still fulfilling all requirements. The entire application is built with just 3 main files:

1. **medalUtils.ts** - Contains all data fetching and business logic:

    - Medal data fetching with error handling
    - Data caching to prevent unnecessary refetching
    - Sorting functionality with proper tiebreakers
    - Custom React hook for easy state management

2. **api/medals.ts** - Simple API endpoint to serve medal data:

    - Reads from medals.json
    - Provides proper error handling

3. **index.tsx** - The main page with UI implementation:
    - URL parameter handling
    - Table rendering with column sorting
    - Flag display using sprite sheet
    - Error and loading states

## Design Decisions

### Simplicity First

The implementation prioritizes simplicity and readability over unnecessary abstractions. By keeping the application in just a few files, it's easy to understand the entire codebase quickly.

### Data Caching

Medal data is fetched once and cached in memory to prevent unnecessary API calls when the sort type changes. This improves performance and user experience.

### Functional Approach

The code uses a functional approach with hooks, making it easy to reason about state changes and side effects.

### URL-Based State

Sort preferences are stored in the URL, allowing for bookmarking and sharing specific views.

## Future Improvements

If expanding this project in the future, I would consider:

1. **Testing** - Add Jest tests for utility functions and React Testing Library tests for components
2. **Responsive Design Enhancements** - Improve mobile experience with responsive table design
3. **Accessibility** - Add ARIA attributes and keyboard navigation support
4. **Flag Implementation** - Improve flag sprite calculation for more accurate display
5. **Error Recovery** - Add retry mechanisms for failed API calls
6. **Performance Metrics** - Add analytics to measure and improve performance
7. **Internationalization** - Support for multiple languages

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Technologies Used

-   Next.js
-   TypeScript
-   React Hooks
