# Docs

## Installation Guide

### Environment Setup

To set up the development environment, ensure you have the following tools installed:

- [Git](https://git-scm.com/downloads)
- [OpenJDK](https://openjdk.org/install/)
- [Node.js v21.7.2](https://nodejs.org/en)
- [Gradle](https://gradle.org/install/)
- [Vscode](https://code.visualstudio.com/download) (optional)

For Visual Studio Code, consider installing the following extensions:

- [Language Support for Java(TM) by Red Hat for Vscode](https://marketplace.visualstudio.com/items?itemName=redhat.java)
- [IntelliCode for Vscode](https://marketplace.visualstudio.com/items?itemName=VisualStudioExptTeam.vscodeintellicode) (optional)
- [Angular Language Service for Vscode](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template) (optional)
- [SQLTools](https://marketplace.visualstudio.com/items?itemName=mtxr.sqltools) (optional)
  - [SQLTools PostgreSQL Driver](https://marketplace.visualstudio.com/items?itemName=mtxr.sqltools-driver-pg)
- [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) (optional)

### Installation

- Clone the repository:
   ```sh
   git clone https://github.com/luisfuturist/challenge-facevault
   cd challenge-facevault/
   ```

- Backend Setup:
   - Start the PostgreSQL database using Docker:
     ```sh
     docker compose up -d
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

### Stopping PostgreSQL

To stop the PostgreSQL database container, run:

```sh
docker compose down
```

## Testing API

For testing the API, I utilized the [Vscode REST Client extension](https://marketplace.visualstudio.com/items?itemName=humao.rest-client). You can find all the API requests in the [client.rest](../api/client.rest) file.

Additionally, for your convenience, I've created a public Postman workspace where you can test the API if you prefer using Postman. You can access the Postman workspace [here](https://www.postman.com/luisfuturist/workspace/facevault/overview).

## Reference

For further reference, please consider the following sections:

### Backend

* [Official Gradle documentation](https://docs.gradle.org)

#### Additional Links

These additional references should also help you:

* [Useful Springboot Tutorials](https://docs.spring.io/spring-boot/tutorial/index.html)

### Frontend

* [Angular 17 Docs](https://angular.dev/overview)
* [Angular Signals](https://angular.io/guide/signals)
* [Angular Signal Forms](https://timdeschryver.dev/blog/bringing-the-power-of-signals-to-angular-forms-with-signal-forms)
* [Ant Design Docs](https://ng.ant.design/)
