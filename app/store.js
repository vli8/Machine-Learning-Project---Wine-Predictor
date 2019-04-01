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
// {"points": "87",
//   "title": "Nicosia 2013 Vulk\u00e0 Bianco  (Etna)",
//   "description": "Aromas include tropical fruit, broom, brimstone and dried herb. The palate isn't overly expressive, offering unripened apple, citrus and dried sage alongside brisk acidity.",
//   "taster_name": "Kerin O\u2019Keefe",
//   "taster_twitter_handle": "@kerinokeefe",
//   "price": 15,
//   "designation": "Vulk\u00e0 Bianco",
//   "variety": "White Blend",
//   "region_1": "Etna", "region_2": null,
//   "province": "Sicily & Sardinia",
//   "country": "Italy",
//   "winery": "Nicosia"}
