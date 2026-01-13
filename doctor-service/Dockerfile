# Build stage
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom-docker.xml pom.xml
COPY doctor-service/pom.xml doctor-service/
COPY doctor-service/src doctor-service/src
RUN mvn -f doctor-service/pom.xml clean package -DskipTests

# Run stage
FROM eclipse-temurin:17-jdk
COPY --from=build /app/doctor-service/target/*.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
