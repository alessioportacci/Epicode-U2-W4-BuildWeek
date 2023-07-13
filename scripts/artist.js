const artistId = new URL(window.location.href).searchParams.get("id")
//Mi prendo l'url dell'artista
const myUrl = "https://striveschool-api.herokuapp.com/api/deezer/artist/" + artistId;

let artistName

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

      //Carico la tracklist ed i brani likati
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
                                    <span class="p-2 text-hover playable-song" onclick="loadAudio(${track.id})"> ${track.title} <span>
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

const loadDiscography = function(discographyURL)
{
    fetch(discographyURL, 
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
          //Carico gli album del tipo
          .then((albums) => {
            console.log(albums.data);
            document.getElementById("spinner-container-discography").classList.toggle("d-none")
            const discographyList = document.querySelector(".discography")
            albums.data.forEach(album => {
                let card = document.createElement("div")
                card.classList.add("col-6", "col-md-3", "my-3", "p-5", "p-md-1","h-100",)
                card.innerHTML = `<div class="bg-spotify-card spotify-card"> 
                                    <div class="card h-100 bg-card card-container">
                                        <img src="${album.cover_big}" class="card-img-top p-2 spotify-card-image" alt="copertina">
                                        <div class="card-body">
                                        <h5 class="card-title album-redirect text-hover text-truncate" id="card-title" value="${album.id}">${album.title}</h5>
                                        <p class="card-text artist-redirect text-hover  text-truncate" id="card-text" value="${artistId}">${artistName}</p>
                                        </div>
                                    </div>
                                </div>`

                discographyList.appendChild(card)
            })
          })
    
          .then(() => {
                // Percorso per arrivare alla pagina dell'artista tramite l'id
                document.querySelectorAll(".artist-redirect").forEach((title) =>
                title.addEventListener("click", function () {
                    location.href = "artist.html" + "?id=" + title.getAttribute("value");
                }));
                // Percorso per arrivare alla pagina album tramite l'id
                document.querySelectorAll(".album-redirect").forEach((title) =>
                title.addEventListener("click", function () {
                    location.href = "album.html" + "?id=" + title.getAttribute("value");
                }));                
          } )

          .catch((err) => {
          console.log("Errore!", err);
          });

}

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
      document.getElementById("spinner-container-liked").classList.toggle("d-none")        

      //Immagine in alto
      document.querySelector(".artist-img").setAttribute("src", artist.picture_xl)
      //Nome artista
      artistName = artist.name
      document.querySelector(".artist-name").innerHTML = artistName
      //Ascoltatori mensili
      document.querySelector(".monthly-listeners").innerHTML = numberWithCommas(artist.nb_fan) + " ascoltatori Mensili"
    
      //Aggiungo i brani likati
      //Iconcina
      document.querySelector(".liked-artist-image").setAttribute("src", artist.picture_small)
      document.querySelector(".number-of-likes").innerHTML = `Hai messo Mi piace a ${artist.nb_album} brani`
      document.querySelector(".liked-artist").innerHTML = `Di ${artist.name}`

      //Carico la tracklist
      loadTracks(artist.tracklist)
      //Carico la discografia
      loadDiscography(`https://striveschool-api.herokuapp.com/api/deezer/artist/${artist.id}/albums`)
      
    })
    .catch((err) => {
    console.log("Errore!", err);
    });
};

loadArtist()
