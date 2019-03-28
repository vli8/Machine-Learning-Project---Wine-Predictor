import { createStore, combineReducers, applyMiddleware } from "redux";
import loggingMiddleware from "redux-logger";
import thunkMiddleware from "redux-thunk";
import axios from "axios";
import { composeWithDevTools } from "redux-devtools-extension";

const reducer = combineReducers({});
const middleware = composeWithDevTools(
  applyMiddleware(
    // `withExtraArgument` gives us access to axios in our async action creators!
    // https://github.com/reduxjs/redux-thunk#injecting-a-custom-argument
    thunkMiddleware.withExtraArgument({ axios }),
    loggingMiddleware
  )
);
const store = createStore(reducer, middleware);
export default store;
