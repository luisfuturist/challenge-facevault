# Contributing

## Tools

To set up the development environment, ensure you have the following tools installed:

- [Vscode](https://code.visualstudio.com/download) (optional)
- [OpenJDK 21](https://openjdk.org/install/)
- [Node.js 21](https://nodejs.org/en)
- [Gradle](https://gradle.org/install/) (optional)

For Visual Studio Code, consider installing the following extensions:

- [Language Support for Java(TM) by Red Hat for Vscode](https://marketplace.visualstudio.com/items?itemName=redhat.java)
- [IntelliCode for Vscode](https://marketplace.visualstudio.com/items?itemName=VisualStudioExptTeam.vscodeintellicode) (optional)
- [Angular Language Service for Vscode](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template) (optional)
- [SQLTools](https://marketplace.visualstudio.com/items?itemName=mtxr.sqltools) (optional)
  - [SQLTools PostgreSQL Driver](https://marketplace.visualstudio.com/items?itemName=mtxr.sqltools-driver-pg)
- [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) (optional)

## Installation

- Backend Setup:
   - Start the PostgreSQL database using Docker:
     ```sh
     docker compose -f compose.dev.yml up -d
     ```
   - Run the Spring Boot API:
     ```sh
     gradle bootRun
     ```

- Frontend Setup:
   - Open a new terminal in `challenge-facevault/web`
   - Install dependencies:
     ```sh
     npm install
     ```
   - Start the Angular development server:
     ```sh
     ng serve
     ```

## Testing API

For testing the API, I utilized the [Vscode REST Client extension](https://marketplace.visualstudio.com/items?itemName=humao.rest-client). You can find all the API requests in the [client.rest](../api/client.rest) file.

Additionally, for your convenience, I've created a public Postman workspace where you can test the API if you prefer using Postman. You can access the Postman workspace [here](https://www.postman.com/luisfuturist/workspace/facevault/overview).

## Committing

- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
  - [Angular Commit Convention](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit)

### Useful Scripts

Backend:

- `gradle bootRun`: Start API.
- `docker compose -f compose.dev.yml up -d`: Start DB container in the background.
- `docker compose -f compose.dev.yml down`: Stop DB container.

Front-end:

- `ng serve`: Serve frontend using Angular CLI.

## Reference

For further reference, please consider the following sections:

### Backend

* [Official Gradle documentation](https://docs.gradle.org)
* [Spring Boot](https://spring.io/projects/spring-boot)
* [Lambok](https://projectlombok.org/)
* [PostgreSQL](https://www.postgresql.org/)
* [Docker Docs](https://docs.docker.com/)

#### Additional Links

These additional references should also help you:

* [Useful Springboot Tutorials](https://docs.spring.io/spring-boot/tutorial/index.html)

### Frontend

* [Angular 17 Docs](https://angular.dev/overview)
* [Angular Signals](https://angular.io/guide/signals)
* [Angular Signal Forms](https://timdeschryver.dev/blog/bringing-the-power-of-signals-to-angular-forms-with-signal-forms)
* [Ant Design Docs](https://ng.ant.design/)
