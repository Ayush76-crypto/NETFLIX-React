import React, { useEffect, useState } from "react";
import axios from "../axios";
import "./Row.css";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";

const baseurl = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

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

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    }
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl('')
    } else {
      movieTrailer(movie?.name || "")
      .then((url) => {
        // https://www.youtube.com/watch?v=XMThy8QKqU
        const urlParams = new URLSearchParams(new URL(url).search)
        setTrailerUrl(urlParams.get('v'));
      }).catch(error => console.error(error))
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__Posters">
        {/* several row__poster(s) */}
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${baseurl}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} /> }
    </div>
  );
}

export default Row;
