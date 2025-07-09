let searchbtn = document.querySelector(".search");
let submitbtn = document.querySelector(".submit");
let movie = document.querySelector(".movie");

function getMovie(query) {
  return fetch(`https://www.omdbapi.com/?t=${query}&apikey=${OMDB_API_KEY}`)
    .then((res) => res.json())
    .then((data) => {
      if (!data.Response) throw new Error("Wrong Title");
      return data;
    });
}

function moviedata(details) {
  let data = `<div data-id="${details.imdbID}" class="movie-card  cursor-pointer bg-[#1a1a1d] rounded-xl overflow-hidden shadow-md hover:scale-[1.03] transition transform">
        <img src="${details.Poster}" alt="Poster" class="w-full h-72 object-cover" />
        <div class="p-4">
          <h2 class="text-sm font-semibold truncate">${details.Title}</h2>
          <p class="text-xs text-gray-400">${details.Year}</p>
        </div>
      </div>`;
  movie.innerHTML = data;
  const card = document.querySelector(".movie-card");
  card.addEventListener("click", (event) => {
    const imdbID = event.currentTarget.getAttribute("data-id");
    sessionStorage.setItem("selectedMovieID", imdbID);
    window.location.href = "details.html";
  });
}

submitbtn.addEventListener("click", (event) => {
  event.preventDefault();
  let name = searchbtn.value.trim();
  if (name.length > 0) {
    getMovie(name).then((data) => {
      moviedata(data);
    });
  } else {
    alert("Enter a movie name");
  }
});
