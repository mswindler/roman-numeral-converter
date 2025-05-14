# Roman Numeral Converter

A full-stack web application that converts integers to Roman numerals, built with React and Node.js.

## Features

- RESTful API endpoint for converting numbers to Roman numerals
- Modern React UI using Adobe's React Spectrum components
- Dark/Light mode support based on system settings
- Full observability implementation (logs, metrics, traces)
- Containerized deployment
- Comprehensive test coverage

## Technology Stack

### Backend
- Node.js with Express.js for the web server
- Winston for logging
- Prometheus for metrics
- OpenTelemetry for distributed tracing
- Jest for testing

### Frontend
- React 18
- Adobe React Spectrum for UI components
- React Query for API calls
- Jest and React Testing Library for testing

### DevOps
- Docker for containerization
- Docker Compose for local development

## Prerequisites

- Node.js 18+
- Docker
- Docker Compose

## Quick Start with Docker

1. Clone the repository:
   ```bash
   git clone https://github.com/mswindler/roman-numeral-converter.git
   cd roman-numeral-converter
   ```

2. Build and start all services:
   ```bash
   docker-compose up --build
   ```

3. Access the application components:
   - Frontend UI: http://localhost:3000
   - Backend API: http://localhost:8080/romannumeral?query={number}
   - Jaeger UI (Tracing): http://localhost:16686
   - Prometheus UI (Metrics): http://localhost:9090

4. To stop the application:
   ```bash
   docker-compose down
   ```

## Development Mode (Without Docker)

1. Start the backend:
   ```bash
   cd backend
   npm install
   npm run dev
   ```

2. In a new terminal, start the frontend:
   ```bash
   cd frontend
   npm install
   npm start
   ```

3. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080

## API Documentation

### Convert Number to Roman Numeral

```
GET /romannumeral?query={integer}
```

Parameters:
- query (required): Integer between 1 and 3999

Success Response:
```json
{
  "input": "1",
  "output": "I"
}
```

Error Response:
```
400 Bad Request
Invalid input. Number must be between 1 and 3999.
```

## Observability

The application implements the three pillars of observability:

1. Logs (Winston):
   - Console output
   - File-based logging
   - Error logs: `error.log`
   - Combined logs: `combined.log`

2. Metrics (Prometheus):
   - Endpoint: http://localhost:9090
   - Custom metrics:
     - roman_numeral_conversions_total
     - roman_numeral_conversion_errors_total
     - http_request_duration_seconds

3. Traces (Jaeger):
   - UI: http://localhost:16686
   - Traces all API requests
   - Includes conversion operation spans
   - Error tracking

## Development

### Project Organization
```
roman-numeral-converter/
├── frontend/                 # React frontend application
│   ├── src/                 # Source code
│   │   ├── components/      # React components
│   │   │   ├── RomanNumeralConverter.js  # Main converter component
│   │   │   └── ErrorBoundary.js          # Error handling
│   │   └── App.js          # Application entry point
│   ├── cypress/            # End-to-end tests
│   │   ├── e2e/           # Test specifications
│   │   └── support/       # Test helpers
│   ├── public/            # Static assets
│   └── package.json       # Frontend dependencies
│
├── backend/               # Node.js backend service
│   ├── middleware/       # Express middleware
│   │   ├── logging.js    # Winston logger setup
│   │   ├── metrics.js    # Prometheus metrics
│   │   └── tracing.js    # OpenTelemetry configuration
│   ├── routes/          # API endpoints
│   │   └── converter.js  # Roman numeral conversion route
│   ├── utils/           # Utility functions
│   │   └── romanNumeralConverter.js  # Core conversion logic
│   ├── tests/          # Unit and integration tests
│   └── package.json    # Backend dependencies
│
├── docker/             # Docker configuration
│   ├── Dockerfile.frontend  # Frontend container definition
│   ├── Dockerfile.backend   # Backend container definition
│   └── prometheus.yml      # Prometheus configuration
│
├── docker-compose.yml  # Service orchestration
├── DEPENDENCIES.md    # Dependency documentation
└── README.md         # Project documentation
```

### Key Architectural Decisions

1. **Service Separation**: Frontend and backend are separate services to allow independent scaling and deployment.

2. **Observability First**: Each component includes built-in support for:
   - Logging (Winston)
   - Metrics (Prometheus)
   - Tracing (OpenTelemetry)

3. **Testing Strategy**:
   - Backend: Unit tests with Jest, API tests with Supertest
   - Frontend: Component tests with React Testing Library, E2E with Cypress

4. **Container-Ready**: Docker configuration for both development and production environments

5. **Developer Experience**:
   - Hot reloading for both services
   - Comprehensive documentation
   - Consistent code style and structure

### Making Changes

1. Backend Development:
   - Edit files in the `backend` directory
   - Run `npm test` to verify changes
   - Use `npm run dev` for hot-reloading

2. Frontend Development:
   - Edit files in the `frontend/src` directory
   - Run `npm start` for development server
   - Use React Developer Tools for debugging

## Troubleshooting

1. If the frontend can't connect to the backend:
   - Verify the backend is running on port 8080
   - Check CORS settings in backend/server.js
   - Verify API_URL in frontend/src/components/RomanNumeralConverter.js

2. If Docker containers fail to start:
   - Check if ports 3000, 8080, 9090, or 16686 are in use
   - Run `docker-compose down` and try again
   - Check Docker logs: `docker-compose logs`

3. If tests fail:
   - Ensure all dependencies are installed
   - Check test environment variables
   - Run tests with verbose output: `npm test -- --verbose` 