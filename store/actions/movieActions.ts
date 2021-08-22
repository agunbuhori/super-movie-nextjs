import { useDispatch } from "react-redux";
import { MovieState } from "../reducers/movieReducer";


export const fetchMovie = (payload: any) => {
    return {type: 'fetchMovies', payload}
}
export const addMovie = (payload: any) => {
    return {type: 'addMovies', payload}
}
