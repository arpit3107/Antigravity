# Build stage
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom-docker.xml pom.xml
COPY billing-service/pom.xml billing-service/
COPY billing-service/src billing-service/src
RUN mvn -f billing-service/pom.xml clean package -DskipTests

# Run stage
FROM eclipse-temurin:17-jdk
COPY --from=build /app/billing-service/target/*.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
