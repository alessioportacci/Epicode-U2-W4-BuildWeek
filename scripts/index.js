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
      let row = document.getElementById("row-to-append-children");
      elements.data.forEach((element) => {
        let newCol = document.createElement("div");
        newCol.classList.add("col", "col-3", "my-5");
        newCol.innerHTML = `
                         <div class="card h-100 bg-dark" style=";">
                            <img src="${element.album.cover}" class="card-img-top p-2" alt="copertina">
                            <div class="card-body">
                              <h5 class="card-title" id="card-title">${element.title}</h5>
                              <a href="../album.html"><p class="card-text" id="card-text">${element.artist.name}</p></a>
                            </div>
                          </div>
                         `;
        row.appendChild(newCol);
        const artistsId = elements.data.map((element) => {
          return element.id;
        });
        console.log("artisti id", artistsId);
      });

      // .catch((err) => {
      //   console.log("Errore!", err);
      // });
    });
};

getRemoteData();
