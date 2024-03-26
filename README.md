# Backend Temlate

To install dependencies:
```sh
bun install
```

To run:
```sh
bun run dev
```

## Folder Structure

1. Helpers - Handles helping us connect to do something. Use cases like AWS SES Helper, AWS S3 Helper etc
2. Utils - Contains utility functions that can be shared and imported from any parts of the application
3. Config - Contains configuration to setup the application
4. App - Core codebase containing the application routes, controllers, services (business logic), models (data models)
