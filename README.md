# Baseweight.xyz

A web application for ultralight backpackers to track and optimize their gear weight distribution. Built for the backpacking community to help achieve the perfect pack setup.

## About

Baseweight helps ultralight backpackers meticulously track their gear weights across different categories, visualize weight distribution through interactive pie charts, and optimize their pack configurations. Whether you're planning a thru-hike or fine-tuning your weekend setup, Baseweight provides the tools to analyze every ounce.

## Features

- **Gear Weight Tracking** - Add and categorize your gear with precise weights
- **Visual Analytics** - Pie charts showing weight distribution across categories
- **Multiple Pack Configurations** - Create different setups for various trips
- **Gear Library** - Reuse previously entered gear across different packs
- **Community Profiles** - Share your gear lists with other ultralight enthusiasts

## Tech Stack

- **Frontend**: React 18 with Vite
- **Backend**: Supabase
- **Styling**: Styled Components
- **Testing**: Vitest
- **Documentation**: Storybook

## Available Scripts

### Development

```bash
npm run dev
```

Starts the development server with hot reload at `http://localhost:5173`

### Build

```bash
npm run build
```

Creates an optimized production build in the `dist` folder

### Linting

```bash
npm run lint
```

Runs ESLint to check code quality and style

### Testing

```bash
npm run test
```

Runs the test suite using Vitest

### Storybook

```bash
npm run storybook
```

Starts Storybook development server at `http://localhost:6006`

```bash
npm run build-storybook
```

Builds Storybook for production deployment

## Project Structure

```
src/
├── api/             # Queries, mutations, mappers
├── components/      # Reusable UI components
├── contexts/        # Shared Contexts
├── features/        # Page components
├── hooks/           # Custom React hooks
├── lib/             # External library configurations
├── styles/          # Global themes
└── utils/           # Utility functions
```
