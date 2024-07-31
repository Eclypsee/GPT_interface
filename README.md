# CodeGPT Interface

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Dependency Versions
----
**Node.js**: v20.11.0 or later\
**npm**: 10.8.2 or later
> [!CAUTION]\
> The project has been known to be buggy on older versions of Node.js, make sure you are up to date.\
> Before running the server, make sure your OpenAI key is set in the .env file.\
> Make sure port 3000 is available as the server defaults to it, **you can also set your own port in the .env file. (Manual install only)**

Script Install
------
> [!TIP]
> Make sure to `fetch` latest updates and be on the correct `react` branch prior to running script(s).
> ```bash
> git fetch
> git checkout react
> ```

### To _build and run_:
```bash
cd /path/to/GPT_interface/scripts
chmod +x build+start.sh
./build+start.sh
```
Open http://localhost:3001 to view it in your browser.


### To _run and not build_ execute `start.sh` script instead:
```bash
chmod +x start.sh
./start.sh
```
By default scripts run `node` on port `3000` and `npm` on port `3001`.

### To terminate servers, in CLI:
```bash
CTRL + C
```
Manual Install
-----
1. `cd` to the `server` directory, run:
```
npm install
node index.js
```

2. `cd` to `client` directory, run:
```
`npm install`
`npm start`
```

> [!WARNING]
> Unless you changed any ports in your `.env` file it will ask you `[Y/n]` to run on another port. Which in this case will default to `:3001`.

Open [http://localhost:3001](http://localhost:3001) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

Extras
-----
### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
