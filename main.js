let btn = document.getElementById("up-btn");

window.onscroll = function () {
  if (window.scrollY >= 600) {
    btn.style.display = "block";
  } else {
    btn.style.display = "none";
  }
};

btn.onclick = function () {
  window.scrollTo({
    left: 0,
    top: 0,
    behavior: "smooth",
  });
};

function toggleLoader(show = true)
{
    if(show)
    {
        document.getElementById("loader").style.visibility = "visible"
    }else
    {
        document.getElementById("loader").style.visibility = "hidden"
    }
}

getSuwar()

let arrayOfSuwar = []

function getSuwar()
{
    toggleLoader(true)
    axios.get("https://mp3quran.net/api/v3/suwar")
    .then((response) => {
    const suwar = response.data.suwar

    document.getElementById("main-content").innerHTML = ""
    let content = ""
    for(surah of suwar)
    {
        if(surah.id < 10)
        {
            content += `
            <a id="${surah.id}" href="https://server10.mp3quran.net/jleel/00${surah.id}.mp3" target="_blank"> <span>${surah.id}</span>سورة ${surah.name}</a>
            `
        }else if(surah.id >= 10 && surah.id <100)
        {
            content += `
            <a id="${surah.id}" href="https://server10.mp3quran.net/jleel/0${surah.id}.mp3" target="_blank"> <span>${surah.id}</span>سورة ${surah.name}</a>
            `
        }else{
            content += `
            <a id="${surah.id}" href="https://server10.mp3quran.net/jleel/${surah.id}.mp3" target="_blank"> <span>${surah.id}</span>سورة ${surah.name}</a>
            `
        }

        arrayOfSuwar.push(surah)
    }
    document.getElementById("main-content").innerHTML += content

    }).catch((error) => {
      console.log(error)
    }).finally(() => {
      toggleLoader(false)
    })

}


document.getElementById("search-btn").addEventListener("click",() => {

    let inputValue = document.getElementById("search-input").value
    
    for(surah of arrayOfSuwar)
    {

        if(inputValue == surah.name)
        {
            document.getElementById(`${surah.id}`).scrollIntoView()
        }
    }
    
})



