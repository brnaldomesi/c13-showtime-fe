This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Technologies Used

- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/) for state management
- [axios](https://github.com/axios/axios) for REST API call
- [Material-UI](https://material-ui.com/) for UI components and layout.
- [Redux-saga](https://redux-saga.js.org/) to make asynchronous things like data fetching easier to manage, more efficient to execute.
- [reselect](https://github.com/reduxjs/reselect) to create reusable redux state selector.
- [redux-actions](https://redux-actions.js.org/) to define action creators and reducers in flux standard action compliant way.
- [React-Router](https://reacttraining.com/react-router/web/guides/quick-start) for managing page routes.
- [formik](https://jaredpalmer.com/formik/docs/overview) for form state management
- [yup](https://github.com/jquense/yup) for formik form values and schema validation.
- [lodash](https://lodash.com/) for utility functions.
- [date-fns](https://date-fns.org/) to manipulate date & time.

## Coding Conventions

### Component folder structure

- `components/` contains the commonly used components through the app. Each component has own folder with the same name, and contains all component specific files including definition, styles and other static assets like images or videos,etc.
- `config/` contains the defintion of constants used in this app.
- `hocs/` contains [Higher Order Components](https://reactjs.org/docs/higher-order-components.html).
- `icons/` contains svg icon components.
- `routes/` contains the page route components and sub components used within their routes only.
  - `routes/<RouteComponent>/components` contains the sub components used within this route only.
  - `routes/<RouteComponent>/routes` contains the sub route components that belongs to this route path.
- `redux/` contains redux store modules including actions, sagas, reducers, API call modules.
  - `middlewares/` contains the custom [redux middlewares](https://redux.js.org/advanced/middleware). e.g. handlers for auto logout or refresh after the token is expired.
  - `modules/` contains redux action types, action creators, reducers, redux-sagas, state selectors. Each module represents a data model similar to backend model except `api` folder.
    - `modules/<module-name>/actions.js` contains [redux action creators](https://redux.js.org/basics/actions#action-creators)
    - `modules/<module-name>/reducers.js` contains redux state [reducer](https://redux.js.org/basics/reducers) for the module.
    - `modules/<module-name>/sagas.js` contains [redux saga](https://redux-saga.js.org/) definitions for handling actual API calls
    - `modules/<module-name>/selectors.js` contains functions to select partial state from redux store to be used in [react-redux connect](https://react-redux.js.org/api/connect) functions, inspired by [reselect](https://github.com/reduxjs/reselect) library.
    - `modules/api` contains action creators to update API data & status related sub fields of redux state, a saga utility function that wraps API call with axios, reducer to keep all the API response with response status, etc.
- `styles/` contains the global css styles.
- `utils/` contains utility and helper functions.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
