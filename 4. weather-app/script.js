let inp = document.querySelector(".inp");
let btn = document.querySelector(".btn");
let div = document.querySelector(".display");

async function getData(cityname) {
  try {
    const weather = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${API_CALL}&units=metric`
    );
    const render = await weather.json();

    if (render.cod !== 200) {
      div.innerHTML = `<p class="text-red-200">City not found. Please try again.</p>`;
      div.classList.remove("hidden");
      return;
    }

    decorate(render);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

btn.addEventListener("click", (e) => {
  e.preventDefault();
  const city = inp.value.trim();
  if (!city) {
    alert("Please enter a city name.");
    return;
  }
  getData(city);
});

function decorate(details) {
  const iconName = details.weather[0].main.toLowerCase();

  const html = `
    <img class="mx-auto w-24 h-24 mb-6" src="./images/${iconName}.png" alt="${iconName}" />

    <h1 class="text-5xl font-extrabold">${details.main.temp}°<span class="text-3xl align-top">C</span></h1>
    <h2 class="text-2xl font-semibold mt-2">${details.name}</h2>
    
    <p class="mt-2 text-base capitalize">${details.weather[0].description}</p>

    <div class="mt-6 flex justify-around items-center text-sm">
      <div class="flex flex-col items-center">
        <img src="./images/humidity.png" class="w-6 h-6 mb-1" alt="Humidity" />
        <p class="font-medium">${details.main.humidity}%</p>
        <span class="text-xs">Humidity</span>
      </div>
      <div class="flex flex-col items-center">
        <img src="./images/wind.png" class="w-6 h-6 mb-1" alt="Wind" />
        <p class="font-medium">${details.wind.speed} km/h</p>
        <span class="text-xs">Wind Speed</span>
      </div>
    </div>
  `;

  div.innerHTML = html;
  div.classList.remove("hidden");
}
