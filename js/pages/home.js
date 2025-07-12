import { apiGetCinema } from "../api/apiGetCinema.js";

function renderCinemaRow(movie) {
  return `<tr>
            <td>${movie.id}</td>
            <td>${movie.title}</td>
            <td>${movie.director}</td>
            <td>${movie.genre}</td>
            <td><a href="details#${movie.id}">View</a></td>
        </tr>`;
}

function MovieTable(cinema) {
  const cinemaRow = cinema.map(renderCinemaRow);
  const cinemaRowHtml = cinemaRow.join("");
  // console.log(cinema.review);
  return `<table>
                <thead>
                    <tr>
                       <th>ID</th>
                       <th>Title</th>
                       <th>Director</th>
                       <th>Genre</th>
                       <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    ${cinemaRowHtml}
                </tbody>
            </table>`;
}

function ErrorDetails(error) {
  return `<hgroup>
            <h2>Error loading lendings</h2>
            <p>${error.message}</p>
         </hgroup>`;
}

export default async function render() {
  const { error, data } = await apiGetCinema();

  if (error) {
    document.getElementById("app").innerHTML = ErrorDetails(error);
    return;
  }

  document.getElementById("app").innerHTML = MovieTable(data);
}
