let searchbtn = document.querySelector(".search")
let username = document.querySelector(".usernameinp")
let card  = document.querySelector(".card")

function getProfileData(username){
    return fetch(`https://api.github.com/users/${username}`).then((res) =>{
        if(!res.ok) throw new Error("User Not Found") 
        return res.json()
    })
}



function decorateProfile(details){
    let div = `<div class="flex items-center gap-4 ">
          <div class="w-16 h-16 bg-gray-700 rounded-full">
            <img src="${details.avatar_url?details.avatar_url:""}" class="w-16 h-16 bg-gray-700 rounded-full" alt="">
          </div>
          <div>
            <h2 class="text-xl font-semibold text-gray-500">${details.name?details.name:"--"}</h2>
            <p class="text-gray-600 text-sm">@${details.login?details.login:""}</p>
          </div>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 gap-6 text-center ">
          <div>
            <p class="text-gray-500 text-lg font-semibold">${details.public_repos?details.public_repos:"--"}</p>
            <p class="text-gray-600 text-sm">Repositories</p>
          </div>
          <div>
            <p class="text-gray-500 text-lg font-semibold">${details.followers?details.followers:"--"}</p>
            <p class="text-gray-600 text-sm">Followers</p>
          </div>
          <div>
            <p class="text-gray-500 text-lg font-semibold">${details.following?details.following:"--"}</p>
            <p class="text-gray-600 text-sm">Following</p>
          </div>
        </div>

        <div class="border-t border-gray-800 pt-4 text-sm text-gray-600 ">
          ${details.bio?details.bio:"N/A Bio"}
        </div>`
        card.innerHTML = div
}


searchbtn.addEventListener("click",(event)=>{
    event.preventDefault();
    let name = username.value.trim()
    
    if(name.length>0){
        getProfileData(name).then((data)=>{
            decorateProfile(data)
            console.log(data)
        })
    }
    else{
        alert("Enter a Valid Name")
    }
})


