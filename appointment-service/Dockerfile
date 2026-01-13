# Build stage
FROM maven:3.9.6-eclipse-temurin-17-alpine AS build
WORKDIR /app
COPY pom.xml pom.xml
COPY appointment-service/pom.xml appointment-service/
COPY appointment-service/src appointment-service/src
RUN mvn -f appointment-service/pom.xml clean package -DskipTests

# Run stage
FROM eclipse-temurin:17-jdk-alpine
COPY --from=build /app/appointment-service/target/*.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
