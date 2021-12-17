import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { reducers } from "../reducers/index";
import { composeWithDevTools } from "redux-devtools-extension";

const middleware = [thunk]; 

let storeConfig;

if (process.env.NODE_ENV === "development") {
	storeConfig = createStore(
		reducers,
		undefined,
		composeWithDevTools(applyMiddleware(...middleware))
	);
} else {
	storeConfig = createStore(
		reducers,
		undefined,
		compose(applyMiddleware(...middleware))
	);
}

export const store = storeConfig;
