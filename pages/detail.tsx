import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import { useDidMount } from "../config/helper";
import { useFetch } from "../config/http";
import { MovieDetail } from "../interfaces/Movie";
import Link from 'next/link';
export default function Detail() {
  const [movie, setMovie] = useState<MovieDetail>({});
  const [isFetching, setIsFetching] = useState(true);
  const router = useRouter();
  const didMount = useDidMount();

  useEffect(() => {
    if (router.query['id'])
      useFetch('/', {params: {i: router.query['id']}}, (response: MovieDetail) => {
        if (response.Response === 'True')
          setMovie(response);
        setIsFetching(false);
      });
  }, [router.query]);

  return (
    <div className="container">
      {isFetching && <Loading/>}
      {! isFetching && (
        <div className="flex flex-col md:flex-row lg:flex-row py-10">
 
          <div className="w-full md:w-1/3 lg:w-1/3">
            <img className="w-full" src={movie.Poster} alt=""/>
          </div>
          <div className="w-full md:w-2/3 lg:w-2/3 pl-8 text-white">
            <h1 className="text-4xl font-black text0white mb-2">{movie.Title} ({movie.Year})</h1>
            <p>{movie.Plot}</p>

            <div className="py-4">
              <p className="text-lg text-gray-300"><strong>Actors : </strong>{movie.Actors}</p>

              <table className="mt-4 table">
                <tr>
                  <td width="100px">Genre</td>
                  <td>{movie.Genre}</td>
                </tr>
                
                <tr>
                  <td width="100px">Writer</td>
                  <td>{movie.Writer}</td>
                </tr>
                
                <tr>
                  <td width="100px">Director</td>
                  <td>{movie.Director}</td>
                </tr>


                
                <tr>
                  <td>Country</td>
                  <td>{movie.Country}</td>
                </tr>
                
                <tr>
                  <td>Language</td>
                  <td>{movie.Language}</td>
                </tr>

                <tr>
                  <td>Released</td>
                  <td>{movie.Released}</td>
                </tr>

                
                <tr>
                  <td>Website</td>
                  <td>{movie.Website}</td>
                </tr>
                
                <tr>
                  <td>Awards</td>
                  <td>{movie.Awards}</td>
                </tr>
                
                <tr>
                  <td>Runtime</td>
                  <td>{movie.Runtime}</td>
                </tr>



              </table>
            </div>
          </div>
        </div>
      )}

            <Link href="/">
                    <button className="px-3 py-2 bg-blue-600 text-white font-semibold rounded">Back To Search</button>
                </Link>
      
    </div>
  )
}