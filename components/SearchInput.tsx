import { useRouter } from 'next/dist/client/router';
import React, { ChangeEvent, FormEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useDidMount } from '../config/helper';
import { doFetch } from '../config/http';
import { Movie, MovieResponse } from '../interfaces/Movie';
import { RootState } from '../store';
import { fetchMovie } from '../store/actions/movieActions';
import { MovieState } from '../store/reducers/movieReducer';

interface AutocompleteProps {
    movies: Movie[],
    hide: Function
}

function Autocomplete(props: AutocompleteProps) {
    const [pointer, setPointer] = useState(-1);
    const router = useRouter();

    const handleKeydown = (e: KeyboardEvent) => {
        let key;

        if (e.keyCode !== undefined) {
            key = e.keyCode;
        } else if (e.which !== undefined) {
            key = e.which;
        }

        if (key === 38 || key === 40) {
            e.preventDefault();

            if (key === 40 && props.movies.length-1 > pointer)
            setPointer(prev => prev+1);
            
            if (key === 38 && pointer > -1)
            setPointer(prev => prev-1);

        }

        if (key === 13 && pointer > -1) {
            e.preventDefault();
            router.push('/detail?id='+props.movies[pointer].imdbID);
        } else if (key === 13 && pointer === -1) {
            props.hide();
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeydown);
        return () =>  document.removeEventListener('keydown', handleKeydown);
    })
    
    return (
        <div className="absolute py-2 bg-white w-full rounded overflow-hidden z-50">
            {props.movies.map((movie, index) => (
                <div className={'px-2 '+(pointer === index ? 'bg-red-500 text-white' : '')} key={index}>{movie.Title}</div>
            ))}
        </div>
    )
}

const LiveSearch = React.memo(Autocomplete);

interface Props {
}

const SearchInput: React.FC<Props> = (props): JSX.Element => {
    const searchInputRef = useRef<HTMLInputElement>(null);
    const [showAutocomplete, setShowAutocomplete] = useState(false);
    const [inProgress, setInProgress] = useState(false);
    const [searchResult, setSearchResult] = useState<Movie[]>([]);
    const movie = useSelector((state: RootState): MovieState => state.movie, shallowEqual);
    const dispatch = useDispatch();
    const didMount = useDidMount();
    
    function doSearch(e: FormEvent) {
        e.preventDefault();
        let query = searchInputRef.current?.value ?? '';
        dispatch(fetchMovie({isFetching: true, s: query}));
        setInProgress(true);
    }


    const delay = (() => {
        let timer: any = 0;

        return (callback: Function) => {
            clearTimeout(timer);
            timer = setTimeout(callback, 500);            
        }
    })()

    function autocomplete(e: FormEvent<HTMLInputElement>) {
        let query = e.currentTarget.value;

        if (query.length >= 4) {
            delay(() => {
                doFetch('/', {params: {page: 1, s: query}}, (response: MovieResponse) => {
                    if (response.Response === 'True') {
                        setSearchResult(response.Search);
                    }
                })
            })
        }
    }

    useEffect(() => {
        if (didMount && ! inProgress) {
            setShowAutocomplete(true);
        }

        if (! movie.isFetching) {
            setInProgress(false);
        }
    }, [searchResult])

    const hideAutocomplete = useCallback(() => {
        setShowAutocomplete(false);
    }, []);

    return (
        <form className="w-full mt-20 relative" onSubmit={doSearch}>
            <input onChange={autocomplete} placeholder="Search your favorite movies e.g Spongebob" ref={searchInputRef} className="border-4 rounded-lg p-3 w-full text-red-400 focus:border-red-400 outline-none border-gray-500 block text-2xl bg-transparent"/>
            {showAutocomplete && <LiveSearch hide={hideAutocomplete} movies={searchResult}/>}
        </form>
    )
}

export default SearchInput;