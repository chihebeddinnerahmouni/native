# API Types Generation

This directory contains auto-generated TypeScript types and API client code from your backend Swagger/OpenAPI documentation.

## Usage

### Generate from local backend server

```bash
npm run generate:api
```

_Requires backend server running on http://localhost:3000_

### Generate from a local swagger.json file

```bash
npm run generate:api:local
```

_Requires swagger.json file in the project root_

### Generate from a custom URL

```bash
API_URL="https://your-api-domain.com/api-json" npm run generate:api:url
```

## Generated Files

- `casaikos-api.ts` - Contains all TypeScript types and API client methods
- Import and use in your React Native components like:

```typescript
import { Api } from "./backend/casaikos-api";

const api = new Api({
  baseURL: "http://localhost:3000", // or your production URL
});

// Use in components
const { data } = await api.auth.login({ email, password });
```

## Requirements

- Backend server must be running and accessible
- Backend must expose Swagger/OpenAPI documentation at `/api-json` endpoint
- Network connectivity to the backend server
