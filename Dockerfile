# Use this file as a template with the project files

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
