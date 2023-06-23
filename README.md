# 2223-web-development-2

This repo contains my project for the Web Development 2 course. It is a monorepo consisting of the following packages:

- `api` - The backend API written in TypeScript using Express
- `app` - The frontend web app written in TypeScript using Vue
- `common` - Common code shared between the API and the web app

## Live version

The live version of the app is available at:

[Thttps://filmeye.datamining.party](https://filmeye.datamining.party)

## Users

The following accounts are available by default:

| Username  | Password |
| --------- | -------- |
| test      | test123  |

## Development

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [pnpm](https://pnpm.io/)
- [PM2](https://www.npmjs.com/package/pm2)

### Install packages

```sh
pnpm install
```

### Setup environment variables

Copy the `.env.example` file to `.env` and fill in the values.

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

This will start the API and the web app in development mode. The API will be available at http://localhost:8082 and the web app will be available at http://localhost:5173.

### Start API and Web App Separately

To start the API:
```sh
pnpm api:start
```

To start the web app in development mode:
```sh
pnpm app:dev
```

To build the web app for production:
```sh
pnpm app:build
```

### Build for Production

```sh
pnpm build
```

This will build the API and the web app for production. The API will be available at port 8082, but the web app will need to be served separately via nginx or the like.
