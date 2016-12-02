FROM node:7.2.0-alpine

# We need webpack as a our bundler
RUN npm install --global webpack webpack-dev-server

# Cache the npm install layer and point npm to a registry
WORKDIR /tmp
COPY package.json /tmp/
RUN npm config set registry http://registry.npmjs.org/ && npm install

# Move app files into the container
WORKDIR /usr/src/app
COPY . /usr/src/app/

# Copy contents from our tmp directory containing our installed node modules
RUN cp -a /tmp/node_modules /usr/src/app/
