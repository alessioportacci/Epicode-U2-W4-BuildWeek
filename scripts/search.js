
const input = document.getElementById("search-input")
const button = document.getElementById("search-button")

button.addEventListener("click", function()
{
    if(input.value)
        location.href = "index.html?q=" + input.value
})