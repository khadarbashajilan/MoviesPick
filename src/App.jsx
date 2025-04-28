import React from "react";
import Search from "./components/Search";
import { useEffect, useState } from "react";
import Moviecard from "./components/Moviecard";
import { MOVIES } from "./Moviesid";
import { useDebounce } from "react-use";
import { getTrendingmovies } from "../src/appwrite";
import { updateSearchCount } from "../src/appwrite";
const API_KEY = import.meta.env.VITE_API_KEY;

const App = () => {
  const [search, setSearch] = useState("");
  const [debounceSearch, setDebounceSearch] = useState("");

  const [trendingMovies, setrendingMovies] = useState([]);

  const [isLoading, setisLoading] = useState(true);

  const [Movielist, setMovielist] = useState([]);

  const [error, setError] = useState("");

  useDebounce(() => setDebounceSearch(search), 500, [search]);

  const fetchMovies = async (query = "") => {
    setisLoading(true);
    setError("");
    try {
      let result;
      if (query) {
        const response = await fetch(
          `https://www.omdbapi.com/?s=${decodeURIComponent(query)}&apikey=${API_KEY}`);
        const data = await response.json();

        if (data.Response === "True") {
          result = data.Search;
        } else {
          throw new Error(data.Error || "No movies found");
        }
        updateSearchCount(query, result[0]);
      } else {
        const results = await Promise.all(
          MOVIES.map((id) =>
            fetch(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`)
              .then((res) => res.json())
          )
        );
        result = results;
      }
      setMovielist(result);
      if (!result) {
        throw new Error("Failed to fetch Movies");
      }
    } catch (err) {
      console.error(err);
      setError("Movie Not Found!");
    } finally {
      setisLoading(false);
    }
  };

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingmovies();
      setrendingMovies(movies);
    } catch (e) {
      console.error(`Error Fetching moviees : ${e}`);
    }
  };

  useEffect(() => {
    fetchMovies(debounceSearch);
  }, [debounceSearch]);

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">

        <header>
          <img src="./hero.svg" alt="hero-ng" />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Love
            Without the Hassle{" "}
          </h1>
          <Search search={search} setSearch={setSearch}></Search>
        </header>

        <h2 className="mt-[35px]">Trending Movies</h2>
        {isLoading?(
          <div className="loading"></div>
        ): (
          <section className="trending">
          {trendingMovies.length > 0 && (
              <ul>{trendingMovies.map((movie, idx) => (
                <li key={movie.$id}>
                  <p>{idx + 1}</p>
                  <img src={movie.poster_url} alt={movie.Title} />
                </li>
              ))}
            </ul>)}
          </section>
        )}

        <section className="all-movies">
          <h2 className="mt-8">All Movies</h2>

          {isLoading ? (
            <div className="loading"></div>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <ul>
              {Movielist.map((movie) => (
                <Moviecard key={movie.imdbID} movie={movie}></Moviecard>
              ))}
            </ul>
          )}
          
        </section>
      </div>
    </main>
  );
};
export default App;
