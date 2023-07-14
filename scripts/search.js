
const input = document.getElementById("search-input")
const button = document.getElementById("search-button")

//Search bar
button.addEventListener("click", function()
{
    if(input.value)
        location.href = "index.html?q=" + input.value
})

//Al premere di enter
input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      document.getElementById("search-button").click();
    }
  });


const boxes = document.querySelectorAll(".sfoglia-box")
boxes.forEach((box) =>{
    
    start(box.firstElementChild)
    box.setAttribute("style", "background-color:#" +  sessionStorage.getItem("hex") + "!important")
})