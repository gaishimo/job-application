import { combineReducers, createStore, applyMiddleware } from "redux"
import thunkMiddleware from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import * as auth from "./reduxModules/auth"

export type State = {
  auth: auth.State
}

const combinedReducer = combineReducers({
  auth: auth.reducer,
})

const middlewares = [thunkMiddleware]
const enhancer =
  process.env.NODE_ENV === "development"
    ? composeWithDevTools(applyMiddleware(...middlewares))
    : applyMiddleware(...middlewares)

const store = createStore(combinedReducer, enhancer)

export default store
