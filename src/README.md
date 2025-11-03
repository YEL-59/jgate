# MVC Folder Structure

This project follows an MVC (Model-View-Controller) pattern for better organization and easier debugging.

## Folder Structure

```
src/
├── models/          # Data models, types, and interfaces
├── views/           # UI components and pages (React components)
├── controllers/     # Business logic and data processing
├── services/        # API calls and external services
├── config/          # Configuration files (theme, constants, etc.)
├── components/      # Shared UI components (reusable)
├── hooks/           # Custom React hooks
└── lib/             # Utility functions
```

## Architecture Overview

### Models (`src/models/`)
Defines data structures, types, and business entity definitions.

- **menu.model.js**: Navigation menu structure and configuration
- **dashboard.model.js**: Dashboard data types and enums

**Usage Example:**
```javascript
import { menuItems } from '@/models/menu.model';
import { MetricType } from '@/models/dashboard.model';
```

### Views (`src/views/`)
Contains all UI components and presentation logic. This is where React components live.

- **components/**: Page-specific or feature-specific components
  - `app-sidebar.jsx`: Main sidebar navigation
  - `metric-card.jsx`: Dashboard metric card component
  - `growth-chart.jsx`: User/Project growth chart
  - `donut-chart.jsx`: Project status distribution chart

**Usage Example:**
```javascript
import { MetricCard } from '@/views/components/metric-card';
import { GrowthChart } from '@/views/components/growth-chart';
```

### Controllers (`src/controllers/`)
Handles business logic, data transformation, and coordinates between services and views.

- **dashboard.controller.js**: Dashboard data processing and formatting

**Usage Example:**
```javascript
import { dashboardController } from '@/controllers/dashboard.controller';
const data = await dashboardController.getDashboardData();
```

### Services (`src/services/`)
Contains API calls, external service integrations, and data fetching logic.

- **dashboard.service.js**: Fetches dashboard metrics and chart data

**Usage Example:**
```javascript
import { dashboardService } from '@/services/dashboard.service';
const metrics = await dashboardService.getMetrics();
```

### Config (`src/config/`)
Configuration files, constants, and theme settings.

- **theme.config.js**: Color scheme and theme configuration

**Usage Example:**
```javascript
import { theme } from '@/config/theme.config';
const color = theme.colors.sidebar.background;
```

## Data Flow

1. **View** → User interaction triggers an action
2. **Controller** → Processes the request, calls appropriate service
3. **Service** → Fetches data from API/external source
4. **Controller** → Transforms/formats the data
5. **View** → Receives formatted data and renders UI

## Benefits of MVC Pattern

1. **Separation of Concerns**: Each layer has a clear responsibility
2. **Easier Debugging**: Issues can be isolated to specific layers
3. **Maintainability**: Changes in one layer don't affect others
4. **Testability**: Each layer can be tested independently
5. **Scalability**: Easy to add new features following the same pattern

## Best Practices

1. **Models**: Keep them pure data structures, no business logic
2. **Views**: Only handle presentation, delegate logic to controllers
3. **Controllers**: Should be thin, mainly orchestrate services
4. **Services**: Handle all external communications (API, DB, etc.)
5. **Config**: Keep all magic numbers and constants here

## Adding New Features

When adding a new feature:

1. Create model in `models/` if new data types are needed
2. Create service in `services/` for API calls
3. Create controller in `controllers/` for business logic
4. Create view components in `views/components/`
5. Update config if needed

Example: Adding a new "Reports" feature

```
models/report.model.js        # Report data types
services/report.service.js    # Fetch report data
controllers/report.controller.js  # Process report logic
views/components/report-chart.jsx # Report visualization
```

