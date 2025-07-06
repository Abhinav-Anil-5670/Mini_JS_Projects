

const imdbID = sessionStorage.getItem("selectedMovieID");
let div2 = document.querySelector("#movieDetails")

function getdetails(imdbID) {
  return fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${OMDB_API_KEY}`)
  .then((res)=>res.json())
  .then((data)=>{
    return data
  })
}

getdetails(imdbID)
  .then(data => {
    console.log(data)
    return filldata(data)
  })
  .catch(err => {
    div2.innerHTML = `<p class="text-red-500">Failed to load movie details.</p>`;
    console.error(err);
  });


function filldata(data){
    let details = `<div class="flex flex-col md:flex-row gap-10">
        
        <!-- Poster -->
        <img src="${data.Poster}" alt="Movie Poster" class="w-full md:w-64 h-auto object-cover rounded-xl shadow-lg" />

        <!-- Info -->
        <div class="flex-1 space-y-4">
          <h1 class="text-3xl font-bold">${data.Title}</h1>
          <p class="text-sm text-gray-400">${data.Year} • ${data.Genre} • ${data.Runtime}</p>

          <p class="text-sm text-gray-300 leading-relaxed">
           ${data.Plot}
          </p>

          <div class="border-t border-white/10 pt-4 space-y-1 text-sm">
            <p><span class="font-semibold text-white">Actors:</span> ${data.Actors}</p>
            <p><span class="font-semibold text-white">Director:</span> ${data.Director}</p>
            <p><span class="font-semibold text-yellow-400">IMDb:</span> ${data.imdbRating}/10</p>
          </div>
        </div>`
    div2.innerHTML = details
}
