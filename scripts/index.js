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
      console.log("Fetch finita!");
      console.log(res);
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Errore nella chiamata");
      }
    })

    .then((elements) => {
      console.log(elements);
      let spinnerContainer = document.getElementById("spinner-container");
      spinnerContainer.classList.add("d-none");
      let row = document.getElementById("row-to-append-children");
      elements.forEach((element) => {
        let newCol = document.createElement("div");
        newCol.classList.add("col", "col-4");
        newCol.innerHTML = `
                         <div class="card" style="width: 18rem;">
                   <img src="${element.img}" class="card-img-top" alt="copertina">
                   <div class="card-body">
                     <h5 class="card-title">${element.title}</h5>
                     <p class="card-text">${element.price}</p>
                     <a href="#" class="btn btn-primary" id='delete-button'>Scarta</a>
                     <a href="#" class="btn btn-primary" id='buy-now'>Compra ora</a>
                   </div>
                 </div>
                         `;
        row.appendChild(newCol);
        const deleteButton = function () {
          const dButton = document.getElementById("delete-button");
          newCol.classList.add("d-none");
        };
        const buyMovies = function () {
          const buyButton = document.getElementById("buy-now");
          const getUl = document.querySelector("ul");
          const newLi = document.createElement("li");
          newLi.innerHTML = `<h4>${element.title}</h4>
                    <p>${element.price}</p>`;
          getUl.appendChild(newLi);
          localStorage.setItem("Elementi nel carrello", element.title);
        };

        newCol.addEventListener("click", deleteButton);
        newCol.addEventListener("click", buyMovies);
      });
    })

    .catch((err) => {
      console.log("Errore!", err);
    });
};
getRemoteData();
