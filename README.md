# Multi-Tenant SaaS Application with Hexagonal Architecture

This project is a **multi-tenant SaaS application** built with **NestJS** using **Hexagonal Architecture** principles. Each tenant has an isolated database schema, and centralized tenant metadata is stored in a separate schema (`saas_admin`). The application follows Hexagonal Architecture to separate the core business logic from infrastructure concerns, making it more modular, testable, and maintainable.

## Table of Contents
- [Project Structure](#project-structure)
- [Key Features](#key-features)
- [Getting Started](#getting-started)
- [Environment Configuration](#environment-configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Middleware](#middleware)
- [Architectural Principles](#architectural-principles)

---

## Project Structure

The application follows **Hexagonal Architecture** with the following main layers:

1. **Domain Layer**: Contains the core business logic and models, independent of any framework or database.
2. **Application Layer**: Defines use cases and services that orchestrate the business logic.
3. **Adapters**:
   - **In Adapters**: Handle incoming requests (HTTP controllers).
   - **Out Adapters**: Interface with external systems, including the database.

   The structure is organized as follows:

   ```bash
    src/
    ├── application/
    │   ├── saas_admin-cases/           # saas admin use cases
    │   ├── saas_tenant-cases/          # saas tenant use cases    
    │   └── application.module.ts       # Application module setup
    │
    ├── domain/
    │   ├── models/                     # Core business models
    │   ├── services/                   # Business logic services
    │   ├── repositories/               # Repository interfaces
    │   └── domain.module.ts            # Domain module setup
    │
    ├── adapters/
    │   ├── in/
    │   │   └── http/                   # HTTP controllers for incoming requests
    │   │       └── saas_admin         
    │   │         └── admin.controller.ts # saas_admin controller for tenant management
    │   │       └── saas_tenant  
    │   │         └── customer.controller.ts # Controller for tenant customer operations
    │   │
    │   └── out/
    │       ├── database/
    │       │   ├── entities/           # TypeORM entities mapped to database tables
    │       │   ├── migrations/         # Database migrations
    │       │   ├── tenant.middleware.ts# Middleware for handling tenant context
    │       │   ├── database.module.ts  # Database module and providers
    │       │   └── typeorm-customer.repository.ts # TypeORM-based repository for customers
    │       └── multi-tenant/
    │           └── tenant-connection.service.ts # Manages tenant-specific database connections
    │
    └── app.module.ts                   # Root module


## Key Features

- **Multi-Tenancy with Isolated Schemas**: Each tenant has its own schema, isolating data and providing tenant-level customization.
- **Centralized Metadata**: The `saas_admin` schema stores metadata for all tenants, making it easy to manage and retrieve tenant information.
- **Hexagonal Architecture**: Separates business logic from infrastructure to enhance testability, flexibility, and maintainability.
- **Tenant-Specific Connections**: Dynamically connects to tenant schemas based on the `tenantId` passed in each request.
- **Extensible Application Layers**: Clearly defined application layers allow easy extension and modification of business logic and infrastructure.

## Getting Started

### Prerequisites

- **Node.js** (v16 or later)
- **PostgreSQL** (supports multiple schemas)
- **pnpm** (recommended for dependency management)

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/multi-tenant-saas-app.git
   cd multi-tenant-saas-app

2. **Install Dependencies**

   ```bash
   pnpm install

## Environment Configuration
  Create a .env file in the root directory and add the following environment variables. Adjust values as needed:

   ```bash
    DATABASE_HOST='localhost'
    DATABASE_NAME='multi_tenant_app'
    DATABASE_USER='postgres'
    DATABASE_PASSWORD='postgres'
    DATABASE_PORT=5432
    COMPANY_DATABASE_PREFIX=saas_tenant
   ```

## Usage

  ```base
    pnpm run start:dev
  ```

## API Endpoints

### Admin Endpoints (saas_admin schema)
- **Get All Tenants**: GET /admin/tenants - Lists all registered tenants.

### Tenant-Specific Endpoints (Tenant Schemas)
These endpoints require a x-tenant-id header with each request to identify the tenant context:
- **Get Customer**: GET /customers/:id - Retrieves customer information for the specified tenant.

## Middleware
The application uses TenantMiddleware to handle multi-tenancy. This middleware checks the x-tenant-id header in each request, dynamically connecting to the appropriate tenant schema.

## Architectural Principles
This project follows **Hexagonal Architecture** to keep core business logic independent from the external systems, such as databases and HTTP. The benefits include:

- **Testability**: Easily test each layer in isolation.
- **Flexibility**: Replace infrastructure dependencies (e.g., database) without changing the core logic.
- **Scalability**: Easily extend business logic and application services.
