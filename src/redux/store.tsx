import { createStore, combineReducers, applyMiddleware } from "redux"
import { createPromise } from "redux-promise-middleware"
import { articles, submit } from "./reducers"

const reducers = combineReducers({
    articles,
    submit
})
const enhancer = applyMiddleware(createPromise())

export const store = createStore(reducers, enhancer)


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch