# Stage 1: Build the JAR using Maven and Amazon Corretto 21
FROM maven:3.9.4-amazoncorretto-21 AS build

WORKDIR /app

COPY pom.xml .
RUN mvn dependency:go-offline

COPY src ./src

RUN mvn clean package -DskipTests

# Stage 2: Run the JAR using only the JDK
FROM amazoncorretto:21

WORKDIR /app

COPY --from=build /app/target/*.jar application.jar


ENTRYPOINT ["java", "-Xmx2048M", "-jar", "application.jar"]
