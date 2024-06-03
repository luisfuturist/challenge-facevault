# Docs

## Guide: Installation

### Environment Setup

Before proceeding with the installation, ensure you have the following prerequisites installed on your system:

- [Git](https://git-scm.com/downloads)
- [Docker](https://docs.docker.com/)
- [Docker Compose](https://docs.docker.com/compose)

> [!NOTE]
> If you prefer not to install Gradle locally, you can use the `gradlew` script provided within this repository.

Clone the repository to your local machine:

```sh
git clone https://github.com/luisfuturist/challenge-facevault
cd challenge-facevault/
```

### Stage Environment

While the project is not yet production-ready, you can set up a staging environment using Docker Compose:

```sh
docker compose -f compose.stage.yml up
```

> [!NOTE]
> The initial setup may take some time to pull and build the necessary images. Subsequent runs will be faster due to caching.

#### Stopping the Stage Environment

To stop the Docker containers running in the staging environment, use the following command:

```sh
docker compose -f compose.stage.yml down
```

## Guide: Usage

### Person Photo Generation

For generating synthetic person photos, consider using [ThisPersonDoesNotExist](https://this-person-does-not-exist.com/en).

### Testing the API Endpoints

Please refer to the [Guide: Testing the API](../CONTRIBUTING.md#testing-api).

## Guide: Development

Refer to the [Contributing Guide](../CONTRIBUTING.md) for instructions on contributing to this project or more insights on how it was developed.

