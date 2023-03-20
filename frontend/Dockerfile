FROM node:14-alpine as module-install-stage
# set working directory
WORKDIR /frontend
# add `/app/node_modules/.bin` to $PATH
ENV PATH /frontend/node_modules/.bin:$PATH

COPY package.json /frontend/package.json

RUN apk add yarn
RUN yarn install --production

# build
FROM node:14-alpine as build-stage
COPY --from=module-install-stage /frontend/node_modules/ /frontend/node_modules
WORKDIR /frontend
COPY . .
RUN yarn build

# serve
FROM node:14-alpine
COPY --from=build-stage /frontend/build /frontend/build
RUN npm install -g serve
EXPOSE 3000
# start app
CMD serve -s /frontend/build -l 3000