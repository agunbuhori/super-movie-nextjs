import { Action } from "redux"
import { Movie } from "../../interfaces/Movie";

export interface MovieState {
    s: string,
    isFetching: boolean,
    data: Movie[],
    page: number,
    total: number
}

const INITIAL_STATE: MovieState = {
    s: "batman",
    isFetching: false,
    data: [],
    page: 1,
    total: 0
}

export default function movieReducer(state: MovieState = INITIAL_STATE, action: any) {
    switch (action.type) {
        case 'fetchMovies':
            return {...state, ...action.payload};
        case 'addMovies':
            return {...state, data: [...state.data, ...action.payload.data]}
        default:
            return state;
    }
}