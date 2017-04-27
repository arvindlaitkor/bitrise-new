# Footprint Demo Management

Demo management (CMS) of Footprint messaging system. It uses React.js, Redux, Babel, PostCSS, Webpack and Jest.

-----

## Install

1. Install Node.js.
2. Install npm `sudo npm install npm -g`.
3. Install dependencies `npm install`.
4. Now you can run development server, test or build the app.

## Development

Run `npm start`. It runs the app in development mode on `localhost:8080` with hot loading. Also the app is available by IP address of the host with port 8080 from devices, connected to the current local network for testing on mobile devices.

## Test
  ##
* `npm run test` for tests.
* `npm run test -- --watch` for running tests in watch mode.
* `npm run test -- --coverage` for check test coverage.

## Build

Run `npm run build`. It creates public directory `build`, containing static files.

## Directory Structure

`jest` – files for Jest configuration

`src` – sources
* `actions` – Redux actions
* `api` – static JSON data
* `components` – stateless components
* `constants` – UI strings, options and Redux action types
* `containers` – components which contain another components
* `shared` – fonts, icons, images, shared styles, HTML template and shared scripts
* `store` – store combiner (index.js) and reducers
* `index.js` – entry point of the app

## Deployment

To update staging http://dev.footprintdemo.com push to `dev` branch.

To update production http://footprintdemo.com push to `master` branch.
