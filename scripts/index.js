//Mi prendo lo spinner
const spinnerContainer = document.getElementById("spinner-container");



//Mi prendo l'url per i gruppi rock
const myUrl = "https://striveschool-api.herokuapp.com/api/deezer/search?q=rock";
const getRemoteData = function () {
  fetch(myUrl, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGFkMWZhNWNhMTA2NTAwMTQzMWU2ZTIiLCJpYXQiOjE2ODkwNjc0MjksImV4cCI6MTY5MDI3NzAyOX0.FL8mUJf9S_KVjNoDFWB16CJ0Ik-fXXPOzyH5-oETFdw",
      "Content-Type": "application/jason",
    },
  })
    .then((res) => {
      if (res.ok) return res.json();
      else throw new Error("Errore nella chiamata");
    })

    .then((elements) => {
      console.log(elements);
      spinnerContainer.classList.toggle("d-none");
      const row = document.getElementById("row-to-append-children");
      elements.data.forEach((element) => {
        let newCol = document.createElement("div");
        newCol.classList.add(
          "col-6",
          "col-md-3",
          "my-3",
          "p-5",
          "p-md-1",
          "h-100"
        );
        newCol.innerHTML = `<div class="bg-spotify-card spotify-card"> 
        <div class="card h-100 bg-card bg-light-subtle-hover my-cards">
        <div class="p-2 d-flex">
                              <img src="${element.album.cover_big}" class="card-img-top spotify-card-image z-1 position-relative" alt="copertina">
                              <img src="../assets/imgs/logo.png" class="z-2 position-absolute">
                              </div>
                              <div class="card-body">
                                <h5 class="card-title album-redirect text-hover text-truncate" id="card-title" value="${element.album.id}">${element.title}</h5>
                                <p class="card-text artist-redirect text-hover text-truncate" id="card-text" value="${element.artist.id}">${element.artist.name}</p>
                              </div>
                            </div>
                            </div>`;
        row.appendChild(newCol);
      });
    })

    .then(() => {
      //Per ogni elemento classe .artist-redirect mettiamo un redirect a artist.html con l'id contenuto nel suo value
      document.querySelectorAll(".artist-redirect").forEach((artist) =>
        artist.addEventListener("click", function () {
          location.href = "artist.html" + "?id=" + artist.getAttribute("value");
        })
      );
      // Percorso per arrivare alla pagina album tramite l'id
      document.querySelectorAll(".album-redirect").forEach((title) =>
        title.addEventListener("click", function () {
          location.href = "album.html" + "?id=" + title.getAttribute("value");
        })
      );
    })

    .catch((err) => {
      console.log("Errore!", err);
    });
};

getRemoteData();

//Nascondo main
const collapser = document.getElementById("collapser");
const mainSection = document.getElementById("main-a");

const hide = function (el) {
  el.classList.toggle("d-none");
  if (el.classList.contains("d-none")) {
    collapser.textContent = "Mostra annunci";
  } else {
    collapser.textContent = "Nascondi annunci";
  }
};

collapser.addEventListener("click", function () {
  hide(mainSection);
});

//Nascondi album
const collapser2 = document.getElementById("collapser-2");
const rowToAppendChildren = document.getElementById("row-to-append-children");

const hideSection = function (el) {
  el.classList.toggle("d-none");
  if (el.classList.contains("d-none")) {
    collapser2.textContent = "Mostra album";
  } else {
    collapser2.textContent = "Nascondi album";
  }
};

collapser2.addEventListener("click", function () {
  hideSection(rowToAppendChildren);
});

//Saluto in base all'orario
function salutoInBaseAllOrario() {
  var data = new Date();
  var ora = data.getHours();
  var titolo = document.getElementById("saluto");

  if (ora >= 0 && ora < 12) {
      titolo.innerText = "Buongiorno";
  } else if (ora >= 12 && ora < 19) {
      titolo.innerText = "Buon pomeriggio";
  } else {
      titolo.innerText = "Buonasera";
  }
}

