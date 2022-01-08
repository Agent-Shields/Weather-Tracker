// declaree HTML elements as vars

var citySearched = document.querySelector("#city")


var searchButton = document.querySelector("#btnSearch")

// define click handler 

var buttonClickHandler = function(event) {
    // prevent page from refreshing
    event.preventDefault();

    // get value from search element
    var cityName = citySearched.value.trim();
   
    if (cityName) {
        console.log(cityName)
        localStorage.setItem("cityNamed", cityName)
        // get lat-lon of city named
    } else {
        alert("Please enter a city name in the search input field")
    }
}
                                                                                                                                                                                                                                        
// Add event listeners for search submit

searchButton.addEventListener("click", buttonClickHandler)


