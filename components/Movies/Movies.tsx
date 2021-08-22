import { useCallback, useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useDidMount } from "../../config/helper";
import { useFetch } from "../../config/http";
import { MovieResponse } from "../../interfaces/Movie";
import { RootState } from "../../store";
import { addMovie, fetchMovie } from "../../store/actions/movieActions";
import { MovieState } from "../../store/reducers/movieReducer";
import { Loading } from "../Loading";
import MovieItem from "./MovieItem";
import ShowPoster from "./ShowPoster";

const Movies: React.FC = () => {
    const movie = useSelector((state: RootState): MovieState => state.movie, shallowEqual);
    const dispatch = useDispatch();
    const didMount = useDidMount();
    const [loadMore, setLoadMore] = useState(false);
    const [poster, setPoster] = useState("");

    const handleScroll = (e: Event) => {
        let scroll = Math.floor(window.scrollY + window.innerHeight);
        let height = document.body.scrollHeight;

        if (scroll - 40 >= height && ! loadMore && movie.data.length < movie.total) {
            dispatch(fetchMovie({page: movie.page+1}));
            setLoadMore(true);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    });

    function handleError() {
        
    }

    async function fetchMovies(params: any, callback: (response: MovieResponse) => void, errorHandler = handleError) {
        await useFetch('/', {params: {...params}}, callback, errorHandler);
        dispatch(fetchMovie({isFetching: false}));
    }

    useEffect(() => {
        if (didMount && movie.isFetching) {
            fetchMovies({s: movie.s, page: 1}, (response: MovieResponse) => {
                if (response.Response === 'True') {
                    dispatch(fetchMovie({data: response.Search, page: 1, total: +response.totalResults}));
                } else {
                    dispatch(fetchMovie({data: [], page: 1, total: 0}));
                }
            });
        }
    }, [movie.isFetching]);

    useEffect(() => {
        if (didMount && loadMore && movie.total > movie.data.length) {
            fetchMovies({s: movie.s, page: movie.page}, (response: MovieResponse) => {
                if (response.Response === 'True') {
                   dispatch(addMovie({data: response.Search}));
                   setTimeout(() => {
                       setLoadMore(false);
                   }, 500);
                }
            });
        }
    }, [loadMore]);

    function RenderMessage() {
        return (
            <div className="py-2">
                {movie.data.length > 0 
                    ? <div className="text-xl text-white text-center">Show {movie.data.length}/{movie.total} results for "{movie.s}"</div>
                    : <div className="text-xl text-white text-center">Movie not found</div>
                }
            </div>
        )
    }

    const showImage = useCallback((poster: string) => {
        if (poster !== "N/A")
          setPoster(poster);
    }, [])

    return (
        <div className="relative">
            {! movie.isFetching && <RenderMessage/> }
            {! movie.isFetching && (
                <div className="movies">
                    {movie.data.map((movie, index) => (
                        <MovieItem showImage={showImage} {...movie} key={index}/>
                        ))}
                </div>
            )}
            {(movie.isFetching || loadMore) && <Loading/>}
            {poster !== "" && <ShowPoster close={() => setPoster("")} src={poster}/>}
        </div>
    )
}

export default Movies;