# Testerloop App Demo

This example shows how to create a simple npm package project to create a dockerfile.

# Add your Testerloop Github Token to gain access to the Testerloop's NPM Modules

- Create a file called `.npmrc` at the root of your user and add the
  following code:

```
@testerloop:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=__TESTERLOOP_GITHUB_TOKEN__
```

# Steps to create the testerloop-app in a docker container

- Create a dockerfile with the following configuration

```
FROM node:18-alpine
WORKDIR /var/task

# Copy your package.json, package-lock.json, tsconfig.json, and index.ts from the host machine to the working directory in the container
COPY package.json package-lock.json tsconfig.json index.ts ./

# Mount a Docker secret named npmrc (which should contain an NPM authentication token) as a file at .npmrc. Then, run the npm ci command to install the project's dependencies.
RUN --mount=type=secret,id=npmrc,target=.npmrc npm ci

# Run the build script defined in package.json using npm run build.
RUN npm run build

# Expose port 8080 to allow external connections to the container
EXPOSE 8080

# Specify the command that should be run when the container is started. In this case, it runs node dist/index.js, which presumably starts the server listening on port 8080.
CMD node dist/index.js

```

- You can specify your own entry point instead of `node:18-alpine`

* Build the docker container
  `docker build --secret id=npmrc,src=.npmrc --no-cache  -t testerloop-app -f Dockerfile .`

- If you are running from a mac os container add the `--platform=linux/amd64`

* Run the docker container locally
  `docker run -d -p 8080:8080 --env-file .env testerloop-app`

* Visit the `localhost:8080` to view the application

# Steps to install the testerloop app locally

- Use node 18
- Create an npm init project
- Add the .npmrc file to the project directory
- Add in the .npmrc file the following line
  `@testerloop:registry=https://npm.pkg.github.com`
  This will allow you to grab the testerloop-app from the private repository
- In your package.json file add the following scripts

  ```
  "scripts": {
    "start": "node --loader ts-node/esm -r dotenv/config ./index.ts",
    "build": "tsc --project tsconfig.json"
  },
  ```

- Install the testerloop app using
  `npm install @testerloop/testerloop-app`

- Change the .env.shaddow to .env and configure the env variables to match your project

  ```
  PORT=8080
  AWS_SESSION_TOKEN=
  AWS_BUCKET_REGION=eu-west-3
  AWS_ACCESS_KEY_ID=__YOUR_ACCESS_KEY_ID__
  AWS_SECRET_ACCESS_KEY=__YOUR_AWS_ACCESS_KEY__
  AWS_BUCKET_NAME=otf-lambda-results
  EXPIRES_IN=3600
  ```

- Build your application
  `npm run build`

- Tun your application
  `npm run start`
