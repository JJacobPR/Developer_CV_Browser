# Developer Portfolio Browser

## Introduction

This project is a full-stack application designed to **browse developers and their projects, CVs, and portfolios** in an organized and user-friendly way.

It consists of two main parts:

- **Frontend:** A React + TypeScript web app providing an intuitive interface for exploring developer profiles and their work.
- **Backend:** A Spring Boot REST API managing user data, projects, technologies, and authentication.

Both parts are integrated and can be easily run together using Docker Compose, enabling quick setup and deployment.

🔴 **Warning:**  
If you restart the backend service, previously issued authentication tokens may become invalid.  
To avoid login issues, **manually remove the token from your browser’s local storage**. (To be fixed)

---

## 🚀 Running with Docker Compose

This project includes frontend, backend, PostgreSQL database, and pgAdmin services configured with Docker Compose.

### Prerequisites

- Docker and Docker Compose installed
- A `.env` file in the root folder (or environment variables set) with these variables:

```env
POSTGRES_USER=your_postgres_username
POSTGRES_PASSWORD=your_postgres_password
POSTGRES_DB=your_database_name

SPRING_DATASOURCE_USERNAME=your_postgres_username
SPRING_DATASOURCE_PASSWORD=your_postgres_password
SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/your_database_name

PGADMIN_USER=your_pgadmin_email // Must be an email
PGADMIN_PASSWORD=your_pgadmin_password

```

### How to run

From the project root directory, run:

```bash
docker-compose up --build
```

This will:

- Build and start the React frontend (available on port 5173)

- Build and start the Spring Boot backend API (port 8080)

- Start PostgreSQL database on port 5434

- Start pgAdmin for database management on port 5050

### Access URLs

    Frontend UI: http://localhost:5173

    Backend API: http://localhost:8080/api/v1

    Swagger UI: http://localhost:8080/api/v1/swagger.html

    pgAdmin: http://localhost:5050 (login with your pgAdmin credentials)
        - Host: postgres
        - Port: 5432
        - Username: <your POSTGRES_USER>
        - Password: <your POSTGRES_PASSWORD>

### Stopping services

Stop and remove all containers:

```bash
docker-compose down
```

### Persistent Data

PostgreSQL data is persisted in a Docker volume named pgdata to survive container restarts.

## 🛠 Development

For detailed development instructions, see the individual README files located in each service folder:

- Frontend: `./frontend/README.md`
- Backend: `./backend/README.md`
