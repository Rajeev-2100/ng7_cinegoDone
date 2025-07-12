import { apiGetMovieDetails } from "../api/apiGetCinemaDetails.js";
import { apiDeleteMovie } from "../api/apiDeleteCinema.js";

function getHash() {
  const hash = window.location.hash.replace("#", "");
  return Number(hash);
}

function ErrorBanner(error) {
  return `<hgroup>
            <h2>Error Occured</h2>
            <p>${error.message}</p>
        </hgroup>`;
}

function MovieDetails(movie) {
  const dateTime = movie.dateWatched;
  const onlyDate = dateTime.split("T")[0];
  return `<article>
            <header>
                <h2>${movie.title}</h2>
            </header>
            <p>Director: ${movie.director}</p>
            <p>Genre: ${movie.genre}</p>
            <p>Date Watched: ${onlyDate}</p>
            <p>Review: ${movie.review}</p>
            <footer>
                 <button id="remove-btn">Remove</button>    
            </footer>
        </article>`;
}

function MovieDetailsSuccess() {
  return `<hgroup>
            <h2>Movie Deleted</h2>
            <a href="/">Back to Movie List</a>
        </hgroup>`;
}

async function DeleteMovieDetail() {
  const id = getHash();

  const { error } = await apiDeleteMovie(id);

  if (error) {
    document.getElementById("app").innerHTML = ErrorBanner();
    return;
  }

  document.getElementById("app").innerHTML = MovieDetailsSuccess();
}

function removeClickHandler() {
  const removeBtn = document.getElementById("remove-btn");
  removeBtn.addEventListener("click", DeleteMovieDetail);
}

export default async function render() {
  const id = getHash();
  const { error, data } = await apiGetMovieDetails(id);

  if (error) {
    document.getElementById("app").innerHTML = ErrorBanner(error);
    return;
  }

  document.getElementById("app").innerHTML = MovieDetails(data);

  removeClickHandler();
}
