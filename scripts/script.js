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
