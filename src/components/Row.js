import React, { useEffect, useState } from "react";
import axios from "../axios";
import "./Row.css";

const baseurl = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);

  //React provides a snippet of code to run a statement when a condition runs

  useEffect(() => {
    
    // If [], then run once else if ![] run as movie changes.
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      //   console.log(request.data.results);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

//   console.log(movies);

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__Posters">
        {/* several row__poster(s) */}
        {movies.map((movie) => (
          <img
            key={movie.id}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${baseurl}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {/* Container */}
    </div>
  );
}

export default Row;
