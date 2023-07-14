document.querySelectorAll(".home-nav").forEach(Element =>{
    Element.addEventListener("click",function(){
        location.href = "index.html"
    })

})

//Mi creo una funzione per i comma
function numberWithCommas(number) 
    {
        var parts = number.toString().split(".");
        parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g,".");
        return parts.join(",");
    }

const closeFriendPanel = document.querySelector("#activities").lastElementChild.lastElementChild
closeFriendPanel.setAttribute("style", "cursor:pointer")

closeFriendPanel.addEventListener("click", function(){
    document.querySelector("#right-column").classList.toggle("d-lg-block")
    document.querySelector("#central-column").classList.toggle("col-lg-10")
})