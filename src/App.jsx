import "./App.css";
import { useState } from "react";
import { LiaSearchSolid } from "react-icons/lia";
import FilmDelisiLogo from "./assets/film-delisi-logo.gif";

const apiUrl = "http://www.omdbapi.com/?i=tt3896198&apikey=e556b3d7";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [movies, setMovies] = useState([]);
  const handleInputValue = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== "") fetchMovies(inputValue);
    setInputValue("");
  };

  const fetchMovies = async (title) => {
    const response = await fetch(`${apiUrl}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };

  return (
    <main className="main">
      <form onSubmit={handleSubmit} className="form">
        <img src={FilmDelisiLogo} alt="logo" className="logo" />
        <div className="searchWrapper">
          <input
            type="text"
            placeholder="Film ara"
            value={inputValue}
            onChange={handleInputValue}
          />
          <LiaSearchSolid
            fontSize={"2rem"}
            onClick={handleSubmit}
            cursor={"pointer"}
            color="white"
            className="searchIcon"
          />
        </div>
      </form>
      <section className="movieContainer">
        {movies.map((movie) => (
          <article key={movie.imdbID} className="movie">
            <img src={movie.Poster} alt={movie.Title} />
            <h2>{movie.Title}</h2>
            <p>{movie.Year}</p>
          </article>
        ))}
      </section>
    </main>
  );
}

export default App;
