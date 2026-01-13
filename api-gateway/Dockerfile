# Build Stage
FROM maven:3.9.6-eclipse-temurin-17-alpine AS build
WORKDIR /app
COPY pom.xml pom.xml
COPY api-gateway/pom.xml api-gateway/
COPY api-gateway/src api-gateway/src
RUN mvn -f api-gateway/pom.xml clean package -DskipTests

# Run Stage
FROM eclipse-temurin:17-jdk-alpine
COPY --from=build /app/api-gateway/target/*.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
