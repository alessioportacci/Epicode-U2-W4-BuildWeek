const mesi = 
{
  "01": "Gennaio",
  "02": "Febbraio",
  "03": "Marzo",
  "04": "Aprile",
  "05": "Maggio",
  "06": "Giugno",
  "07": "Luglio",
  "08": "Agosto",
  "09": "Settembre",
  "10": "Ottobre",
  "11": "Novembre",
  "12": "Dicembre"
}


const albumId = new URL(window.location.href).searchParams.get("id");
//Mi prendo l'url dell'album
const myUrl =
  "https://striveschool-api.herokuapp.com/api/deezer/album/" + albumId;


//Mi creo una funzione per i comma
function numberWithCommas(number) {
  let parts = number.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return parts.join(",");
}

//Calcolo durata brani
const albumDuration = function(tracks)
{
  let total = 0
  tracks.forEach(track => 
  {
    total += track.duration
  });
  return (total / 60).toFixed(2)
}


//Carico album
const loadAlbum = function () {
  fetch(myUrl, {
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

    //Parte alta
    .then((album) => {
      console.log(album);
 
      //Levo lo spinner
      document
        .getElementById("spinner-container-album-top")
        .classList.toggle("d-none");
      
      //Immagine album
      console.log(album)
      document.querySelector("#album-image").innerHTML = `<img src= "${album.cover_big}"                    alt="album"
                                                          id="album-cover-img"
                                                          class="mx-3 my-4 p-2 get-hex"
                                                          crossorigin="anonymous"
                                                          onload="start()"
                                                        >`   
      //Nome Album
      document.querySelector(".album-name").innerHTML = album.title;
      //Nome artista
      document.querySelector(".artist-name").innerHTML = album.artist.name
      document.querySelector(".artist-name").setAttribute("value", album.artist.id)
      document.querySelector(".artist-name").classList.add("text-shadow")
      //Anno album
      document.querySelector(".album-year").innerHTML = album.release_date
      //Numero brani
      document.querySelector(".tracks-number").innerHTML = album.tracks.data.length + " brani"
      //Durata album
      document.querySelector(".album-duration").innerHTML = albumDuration(album.tracks.data).toString().replace("."," min ") + " sec"

      return album
    })

    //Carico il colore di sfondo e crediti
    .then((album) => {
      //Sfondo
      console.log(sessionStorage.getItem("hex"))
      //Ho bisogno di questo mini delay per far coincidere le cose
      delay(10).then(() => 
        document.querySelector("#main").style.backgroundColor = "#" + sessionStorage.getItem("hex")
      );
      
      
      //Crediti
      const dateList = album.release_date.split("-")
      document.querySelector(".date").innerHTML = `${dateList[2]} ${mesi[dateList[1]]} ${dateList[0]}`
      document.querySelector(".label").innerHTML = `Ⓟ ${album.release_date.toString().substring(0,4)} ${album.label}`

      return album
    })

    //Carico le tracce
    .then((album) => 
    {
      //Levo lo spinner
      document
        .getElementById("spinner-container-tracks")
        .classList.toggle("d-none");

      const table = document.querySelector(".table-tracks")
      let number = 1
      //Ci scorriamo tutte le tracce dell'album
      album.tracks.data.forEach((track) =>
      {
        //1- Ci appendiamo il numero di traccia
        let trackNumber = document.createElement("div")
        trackNumber.classList.add("my-2", "col-1")
        trackNumber.innerHTML = number
        table.appendChild(trackNumber)  
        number ++
      
        //2- Appendiamo il titolo
        let trackName = document.createElement("div")
        trackName.classList.add("my-2", "col-10", "col-md-7")
        trackName.innerHTML = `<span class="text-hover text-white" onclick="loadAudio(${track.id})">${track.title}</span> <br> 
                               <span class="text-hover" onclick="location.href='artist.html?id=${track.artist.id}'"> ${track.artist.name} </span`
        table.appendChild(trackName)  

        //3- Appendiamo le riproduzioni
        let trackReproductions = document.createElement("div")
        trackReproductions.classList.add("my-2", "col-2", "d-none", "d-md-block") 
        trackReproductions.innerHTML = numberWithCommas(track.rank)
        table.appendChild(trackReproductions)  

        //4- Mettiamo il cuore
        let trackLikes = document.createElement("div")
        trackLikes.classList.add("my-2", "col-1","d-none", "d-md-block")
        trackLikes.innerHTML = `<img
                                  src="assets/imgs/icons/heart_icon.png"
                                  style="width: 17px"
                                  id="cuore"
                                />`
        table.appendChild(trackLikes)

        //5- Mettiamo la durata della canzone
        let trackDuration = document.createElement("div")
        trackDuration.classList.add("my-2", "col-1", "text-end")
        trackDuration.innerHTML = (track.duration/60).toFixed(2).toString().replace(".", ":")
        table.appendChild(trackDuration)

        return album
      })
    })

    .catch((err) => {
      console.log("Errore!", err);
    });
};

loadAlbum();
