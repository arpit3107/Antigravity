# Build stage
FROM maven:3.9.6-eclipse-temurin-17-alpine AS build
WORKDIR /app
COPY pom.xml pom.xml
COPY billing-service/pom.xml billing-service/
COPY billing-service/src billing-service/src
RUN mvn -f billing-service/pom.xml clean package -DskipTests

# Run stage
FROM eclipse-temurin:17-jdk-alpine
COPY --from=build /app/billing-service/target/*.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
