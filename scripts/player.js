
//Funzione per il delay
const delay = function (time) 
{
  return new Promise(resolve => setTimeout(resolve, time));
}

//Funzione per far partire la musica
const audioPlayer = document.getElementById("myAudio"); 
const sliderAudio = document.querySelector("#slider")
function playAudio() 
{ 
  audioPlayer.volume = sliderAudio.value / 100
  if(!audioPlayer.paused)
  {
    audioPlayer.pause()
  }
  else
  {
    audioPlayer.play();  
  }

  document.querySelectorAll(".play-player-image").forEach(image => image.classList.toggle("d-none")) 
  document.querySelectorAll(".pause-player-image").forEach(image => image.classList.toggle("d-none")) 
} 

//Alla fine della riproduzione
audioPlayer.onended = function() 
{
  document.querySelector(".play-player-image") .classList.remove("d-none")
  document.querySelector(".pause-player-image").classList.add("d-none")
}

//Funzione per caricare le canzoni nel player
function loadAudio(id)
{
  sessionStorage.setItem("song-id", id)
  fetch("https://striveschool-api.herokuapp.com/api/deezer/track/" + id, 
    {
      headers: 
      {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGFkMWZhNWNhMTA2NTAwMTQzMWU2ZTIiLCJpYXQiOjE2ODkwNjc0MjksImV4cCI6MTY5MDI3NzAyOX0.FL8mUJf9S_KVjNoDFWB16CJ0Ik-fXXPOzyH5-oETFdw",
          "Content-Type": "application/jason",
      },
    })

      .then((res) => {
        if (res.ok) return res.json();
        else throw new Error("Errore nella chiamata");
      })
      
      .then((song) => {
        //Imposto le visualizzazioni a schermo in basso a destra
        document.querySelector(".footer-album-song").innerHTML = song.title
        document.querySelector(".footer-album-song").setAttribute("onclick", "location.href='album.html?id=" + song.album.id + "'")
        document.querySelector(".footer-album-artist").innerHTML = song.artist.name
        document.querySelector(".footer-album-artist").setAttribute("value", song.artist.id)
        document.querySelector(".footer-album-cover").setAttribute("src", song.album.cover_medium)
        //Lo imposto anche per il mini player
        document.querySelector(".scroll-text").innerHTML = `${song.title.replaceAll(" ", "&nbsp;")}&nbsp;-&nbsp;${song.artist.name.replaceAll(" ", "&nbsp;")}&nbsp;(${song.album.title.replaceAll(" ", "&nbsp;")}&nbsp;)`
        //Imposto l'audioplayer
        document.querySelector(".audio-player-source").setAttribute("src", song.preview)
        audioPlayer.load()

        document.querySelectorAll(".play-player-image").forEach(image => image.classList.remove("d-none"))
        document.querySelectorAll(".pause-player-image").forEach(image => image.classList.add("d-none"))
      })

      .then(() => {
          delay(500).then(() =>  document.querySelector(".song-duration").innerHTML = "00:" + audioPlayer.duration.toString().substring(0,2));
        })

      .catch((err) => {
      console.log("Errore!", err);
      });
}

//Funzione che aggiorna il timestamp
const songTimestamp = document.querySelector(".song-timestamp")
const audioSlider =  document.querySelector(".audio-slider")
const updateTime = function()
{
  if(!audioPlayer.paused)
  if (audioPlayer.currentTime < 10)
    songTimestamp.innerHTML =  "00:0" + Math.floor(audioPlayer.currentTime)
  else 
    songTimestamp.innerHTML =  "00:" + Math.floor(audioPlayer.currentTime)
  audioSlider.setAttribute("value", Math.floor(audioPlayer.currentTime))
}
setInterval(updateTime, 1000)

//Funzione che aggiorna il volume
sliderAudio.addEventListener("change", function()
{
  audioPlayer.volume = sliderAudio.value / 100
})

if(sessionStorage.getItem("song-id"))
    loadAudio(sessionStorage.getItem("song-id"))