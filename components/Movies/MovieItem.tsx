import React, { CSSProperties, MouseEvent } from 'react';
import { Movie } from '../../interfaces/Movie';
import Link from 'next/link';
interface Props {
    showImage: (img: string) => void
}

const MovieItem: React.FC<Movie & Props> = (props): JSX.Element => {
    return (
        <div className="rounded-lg overflow-hidden shadow">
            <div onClick={() => props.showImage(props.Poster)} className="bg-gray-600 h-96 md:h-80 bg-cover block" style={{backgroundImage: `url(${props.Poster !== 'N/A' ? props.Poster : 'https://popcornsg.s3.amazonaws.com/movies/300/1745-10843-LostInHo.png'})`}}></div>

            <div className="p-4 bg-gray-700 text-white h-44 flex flex-col justify-between">
                <div>
                    <h4 className="text-xl font-semibold">{props.Title.substring(0, 30)}</h4>
                    <h6>{props.Year}</h6>
                </div>
                <Link href={'detail?id='+props.imdbID}>
                    <button className="px-3 py-2 bg-blue-600 text-white font-semibold rounded">Show Detail</button>
                </Link>
            </div>
        </div>
    )
}

export default MovieItem;