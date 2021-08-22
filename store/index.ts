import { Reducer } from "react";
import { applyMiddleware, CombinedState, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import movieReducer from "./reducers/movieReducer";


const rootReducer: Reducer<CombinedState<any>, any> = combineReducers({
    movie: movieReducer
})
const store: ReturnType<typeof createStore> = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof rootReducer>
export default store;