## 📦 Introduction

This is the backend application for the developer browser, built with **Spring Boot**. It provides RESTful APIs to support frontend functionalities, handling data processing, authentication, and other server-side logic.

## Notes

- Tests are now only configured (to be changed in th future)
- This is a portfolio project. No plans of deploying it long term.

## ⚙️ Prerequisites

Before running the backend application, ensure you have the following installed and configured:

- [Java 21](https://www.oracle.com/java/technologies/javase/jdk21-archive-downloads.html) (JDK 21 or higher)
- [Maven](https://maven.apache.org/) (for building and managing dependencies)
- [PostgreSQL](https://www.postgresql.org/) database (make sure it is installed and running or use the one provided in docker-compose (see main readme))

> **Note:** Configure the database connection settings in `application.properties` or set appropriate environmental variables before starting the application.

## 🚀 Installation

Follow these steps to set up and run the backend application locally:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/JJacobPR/Developer_CV_Browser.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd Developer_CV_Browser/backend
   ```

3. **Configure the database connection:**

   ```java
    spring.datasource.url=jdbc:postgresql://url:port/your_database
    spring.datasource.username=your_username
    spring.datasource.password=your_password
   ```

4. **Build the project using Maven:**

   ```bash
   mvn clean install
   ```

5. **Run the Spring Boot application**

   ```bash
    mvn spring-boot:run
   ```

6. **Verify the backend is running:**

   ```
   http://localhost:8080/api/v1
   ```

## 📚 Swagger API Documentation

This backend application includes Swagger UI for interactive API documentation and testing.

### Accessing Swagger UI

Once the backend server is running, you can access the Swagger UI at:

```bash
http://localhost:8080/api/v1/swagger.html
```

## 🔧 Environment Variables

The backend application uses the following environment variables with default values (suitable for local or Docker setups). You can override these in your deployment environment.

```properties
spring.application.name=backend

server.servlet.context-path=/api/v1

# PostgreSQL connection settings
spring.datasource.url=${SPRING_DATASOURCE_URL:jdbc:postgresql://localhost:5432/mydatabase}
spring.datasource.username=${SPRING_DATASOURCE_USERNAME:postgres}
spring.datasource.password=${SPRING_DATASOURCE_PASSWORD:postgres}

spring.jpa.hibernate.ddl-auto=update

# Logging configuration
logging.level.root=warn
logging.level.org.springframework.web.filter.CommonsRequestLoggingFilter=DEBUG

# Swagger UI path
springdoc.swagger-ui.path=/swagger.html

# JWT and credentials
app.jwt.secret=${JWT_SECRET:bewbewjhbhwjbhihe2ery32932hfu1dsadadsadad1dsasadsadsadacadcsacsahfu2esdfhshfhdsusfdsfsdadsfd}

app.admin.email=${ADMIN_EMAIL:admin@example.com}
app.admin.password=${ADMIN_PASSWORD:defaultAdminPass}
app.user.password=${USER_PASSWORD:defaultUserPass}
```

## 🌱 Database Seeding (Default Data)

The backend automatically seeds initial data on startup if the database is empty. This is handled by the `DataInitializer` class.

### What is seeded?

- **Roles:** Admin, User, and Guest roles are created if missing.
- **Users:**
  - An **Admin** user with credentials defined by environment variables (`app.admin.email` and `app.admin.password`).
  - Three default standard users with predefined emails and profiles with passwords defined by environment variable (`app.user.password`):
    - Alice (Frontend Developer)
    - Bob (Fullstack Developer)
    - Carol (DevOps Engineer)
  - All passwords are hashed using the configured password encoder.
- **Technologies:** A curated list of 30 popular technologies across categories:
  - Frontend (React, Angular, Vue.js, etc.)
  - Backend (Spring Boot, Node.js, Django, etc.)
  - DevOps (Docker, Kubernetes, Jenkins, etc.)
  - Databases (PostgreSQL, MySQL, MongoDB, etc.)
- **Projects:** Sample projects are created and assigned to the default users with roles such as Developer, Lead Developer, Architect, and Tester.

### How does it work?

- On application startup, if no users exist in the database, the initializer inserts the data.
- Roles are ensured to exist before users and projects are created.
- Technologies and projects are created only once.
- Users are assigned projects with specific roles and associated technologies.

---

> **Note:** You can customize default admin credentials and passwords via environment variables:
>
> - `app.admin.email`
> - `app.admin.password`
> - `app.user.password`
