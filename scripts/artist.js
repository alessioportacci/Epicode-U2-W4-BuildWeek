//Mi prendo l'url dell'artista
const myUrl = "https://striveschool-api.herokuapp.com/api/deezer/artist/" + new URL(window.location.href).searchParams.get("id");

//Mi creo una funzione per i comma
function numberWithCommas(number) 
    {
    var parts = number.toString().split(".");
    parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g,".");
    return parts.join(",");
    }


//Carico la tracklist
const loadTracks = function(trackURL) 
{
    fetch(trackURL, 
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
  
      .then((tracks) => {
        console.log(tracks.data);
        //Levo lo spinner
        document.getElementById("spinner-container-tracks").classList.toggle("d-none")
        const trackListHTML = document.getElementById("popular-songs")
        //Mi scorro le tracce
        tracks.data.forEach(track => 
        {
            let li = document.createElement("li")
            li.innerHTML = `<div class="row row-cols-3 mb-1 p-1 align-items-center">
                                <div class="col-9 text-truncate text-white">
                                    <img src="${track.album.cover_small}">
                                    <span class="p-2"> ${track.title} <span>
                                </div>
                                <div class="col-2">${numberWithCommas(track.rank)}</div>
                                <div class="col-1">${(track.duration / 60).toFixed(2).toString().replace(".",":")}</div>
                            </div>`
            trackListHTML.appendChild(li)
        });
      })
      .catch((err) => {
      console.log("Errore!", err);
      });
};

//Carico Artista
const loadArtist = function () 
{
  fetch(myUrl, 
  {
    headers: 
    {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGFkMWZhNWNhMTA2NTAwMTQzMWU2ZTIiLCJpYXQiOjE2ODkwNjc0MjksImV4cCI6MTY5MDI3NzAyOX0.FL8mUJf9S_KVjNoDFWB16CJ0Ik-fXXPOzyH5-oETFdw",
        "Content-Type": "application/jason",
    },
  })
    .then((res) => 
    {
      if (res.ok) return res.json();
      else throw new Error("Errore nella chiamata");
    })

    .then((artist) => {
      console.log(artist);

      //Levo lo spinner
      document.getElementById("spinner-container-image").classList.toggle("d-none")
      
      //Immagine in alto
      document.querySelector(".artist-img").setAttribute("src", artist.picture_xl)
      //Nome artista
      document.querySelector(".artist-name").innerHTML = artist.name
      //Ascoltatori mensili
      document.querySelector(".monthly-listeners").innerHTML = artist.nb_fan + " ascoltatori Mensili"
    
      //Carico la tracklist
      loadTracks(artist.tracklist)
    })
    .catch((err) => {
    console.log("Errore!", err);
    });
};

loadArtist()