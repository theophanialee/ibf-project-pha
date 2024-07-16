# Build Angular
FROM node:22 AS ngbuild

WORKDIR /frontend

# Install angular 
RUN npm i -g @angular/cli@17.3.8

COPY ibfproj/angular.json .
COPY ibfproj/package*.json .
COPY ibfproj/tsconfig*.json .
COPY ibfproj/src src
COPY ibfproj/proxy.config.json .
COPY ibfproj/tailwind.config.js .

# Install modules
RUN npm ci 
RUN ng build

# Build Spring Boot
FROM openjdk:21 AS javabuild

WORKDIR /backend

COPY backend/mvnw .
COPY backend/pom.xml .
COPY backend/.mvn .mvn
COPY backend/src src

# copy angular files to spring boot
COPY --from=ngbuild /frontend/dist/ibfproj/ src/main/resources/static

# produce target/giphy-0.0.1-SNAPSHOT.jar
RUN ./mvnw package -Dmaven.test.skip=true

# Run container
FROM openjdk:21 

WORKDIR /app

COPY --from=javabuild /backend/target/backend-0.0.1-SNAPSHOT.jar app.jar

ENV PORT=8080 

EXPOSE ${PORT}

ENTRYPOINT SERVER_PORT=${PORT} java -jar app.jar