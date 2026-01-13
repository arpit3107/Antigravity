# Build stage
FROM maven:3.9.6-eclipse-temurin-17-alpine AS build
WORKDIR /app
COPY pom.xml pom.xml
COPY patient-service/pom.xml patient-service/
COPY patient-service/src patient-service/src
RUN mvn -f patient-service/pom.xml clean package -DskipTests

# Run stage
FROM eclipse-temurin:17-jdk-alpine
COPY --from=build /app/patient-service/target/*.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
