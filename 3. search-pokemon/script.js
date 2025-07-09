let inp = document.querySelector(".input")
let btn = document.querySelector(".btn")
let cont = document.querySelector("#pokemonCardContainer")
console.log(cont)
console.log(inp)

const typeColors = {
  normal: 'bg-gray-400',
  fire: 'bg-red-500',
  water: 'bg-blue-500',
  electric: 'bg-yellow-400',
  grass: 'bg-green-500',
  ice: 'bg-blue-200',
  fighting: 'bg-red-700',
  poison: 'bg-purple-500',
  ground: 'bg-yellow-700',
  flying: 'bg-indigo-300',
  psychic: 'bg-pink-400',
  bug: 'bg-lime-500',
  rock: 'bg-yellow-800',
  ghost: 'bg-indigo-700',
  dragon: 'bg-indigo-900',
  dark: 'bg-gray-800',
  steel: 'bg-gray-500',
  fairy: 'bg-pink-300'
};



async function pokemon(data) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${data}`);
    
    if (!response.ok) {
      throw new Error("Pokémon not found");
    }

    const details = await response.json();
    decorate(details)
    console.log(details);
  } catch (error) {
    console.log("Nothing Found", error);
  }
}

function decorate(data){
    const gettypes = data.types.map((t,index)=>{
        console.log(t.type.name)
        return t.type.name
        
    })
    console.log(gettypes)
    const typeBadges = gettypes.map(type => {
    const colorClass = typeColors[type] ;
    return `<span class="px-2 py-1 rounded-full ${colorClass} text-white text-xs font-semibold capitalize">${type}</span>`;
  }).join('');

    let div = `<div
          class="bg-white rounded-2xl shadow-xl p-6 border border-gray-200 text-gray-800"
        >
          <div class="flex justify-between items-center mb-2">
            <h2 class="text-xl font-bold capitalize">${data.name}</h2>
            <span class="text-sm font-semibold text-gray-500">#${data.id}</span>
          </div>
          <div class="flex justify-center mb-4">
            <img
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png"
              alt="${data.name}"
              class="w-32 h-32 object-contain"
            />
          </div>
          <div class="flex flex-wrap gap-2 justify-center mb-4">
            ${typeBadges}
          </div>
          <div class="space-y-1 text-sm">
            <div class="flex justify-between">
              <span>HP</span><span>${data.stats[0].base_stat}</span>
            </div>
            <div class="flex justify-between">
              <span>Attack</span><span>${data.stats[1].base_stat}</span>
            </div>
            <div class="flex justify-between">
              <span>Defense</span><span>${data.stats[2].base_stat}</span>
            </div>
          </div>
        </div>`
    cont.innerHTML = div
}

function getData(){
    const data = inp.value.trim()
    pokemon(data)
}

btn.addEventListener("click",(e)=>{
    e.preventDefault()
    getData()
})