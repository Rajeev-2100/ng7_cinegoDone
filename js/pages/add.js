import { apiAddCinema } from "../api/apiAddCinema.js";

function AddForm() {
  return `
  <h2>What moive did you watch recently?</h2>
    <hr />
    <form id="add-movie-form">
      <input type="text" id="movie-title" placeholder="Title"/>
      <input type="text" id="movie-director" placeholder="Director"/>
      <select id="movie-genre">
          <option value="" disabled selected>Genre</option>
          <option value="Action">Action</option>
          <option value="Comedy">Comedy</option>
          <option value="Drama">Drama</option>
          <option value="Thriller">Thriller</option>
          <option value="Sci-fi">Sci-fi</option>
          <option value="Documentary">Documentary</option>
          <option value="Other">Other</option>
      </select>
      <input type="datetime-local" id="movie-datetime"/>
      <input type="text" placeholder="Additional Details" id="about-movie"/>
  
      <button type="submit">Add Moive</button>
    </form>
  
    <div id="result"></div>
    `;
}

async function handleSubmit(event) {
  event.preventDefault();

  const payLoad = {
    title: document.getElementById("movie-title").value,
    director: document.getElementById("movie-director").value,
    genre: document.getElementById("movie-genre").value,
    review: document.getElementById("about-movie").value,
    dateWatched: document.getElementById("movie-datetime").value, // ✅ fixed here
    action: "View",
  };

  const result = document.getElementById("result");

  const { error } = await apiAddCinema(payLoad);

  const form = document.getElementById("add-movie-form");

  if (!error) {
    result.innerText = "Movie added Successfully";
    result.style.color = "green";
    form.reset();
  } else {
    result.innerText = "Error adding Lending Data.";
    result.style.color = "red";
  }
}

export default function render() {
  document.getElementById("app").innerHTML = AddForm();

  const form = document.getElementById("add-movie-form");
  form.addEventListener("submit", handleSubmit);
}
