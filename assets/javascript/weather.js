// declaree HTML elements as vars

var citySearched = document.querySelector("#city")
console.log(citySearched);

var searchButton = document.querySelector("#btnSearch")
console.log(searchButton);

// Add event for search click

searchButton.addEventListener("click", function(){
    console.log("clicked search");
})


// var getWeather = function() {
    
// }

// console.log(getWeather)