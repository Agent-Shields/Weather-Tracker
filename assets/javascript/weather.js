// declaree HTML elements as vars

var citySearched = document.querySelector("#city");

var searchButton = document.querySelector("#btnSearch");

var searchHistoryList = document.querySelector("#searchList")

// define button click handler 

var buttonClickHandler = function(event) {
    // prevent page from refreshing
    event.preventDefault();

    // get value from search element
    var cityName = citySearched.value.trim();
   
    if (cityName) {
        console.log(cityName);
        localStorage.setItem("cityNamed", cityName);

        // clear searched city from input field
        citySearched.value = "";
        citySearched.focus();
        // get lat-lon of city named
    } else {
        alert("Please enter a city name in the search input field");
    }

    // add cityName to search history 
    var searchHistoryItem = document.createElement("button");
    searchHistoryItem.classList.add("btn", "btn-secondary");
    searchHistoryItem.textContent = cityName;
    searchHistoryList.appendChild(searchHistoryItem)

}
                                                                                                                                                                                                                                        
// Add event listeners for search submit

searchButton.addEventListener("click", buttonClickHandler);


