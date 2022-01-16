import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import UserReducer from "./User/UserReducer";

const reducers = combineReducers({
    user: UserReducer
});

export type TRootState = ReturnType<typeof reducers>;

const composeEnhancers = typeof window != "undefined" && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));