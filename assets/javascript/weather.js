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
        localStorage.setItem("city", cityName);

        // fetch weather info of city named
        var apiUrl = "api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=8b2ff7d80fb33fb5fa7171ccd4d16620"
        console.log(apiUrl);

        // make a get request to url
        fetch(apiUrl).then(function(response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function(data) {
                    console.log(data)
                })
            } else {
                alert ("There was a problem with your request!")
            }
        })

        // add cityName to search history 
    var searchHistoryItem = document.createElement("button");
        searchHistoryItem.classList.add("btn", "btn-secondary");
        searchHistoryItem.textContent = cityName;
        searchHistoryList.appendChild(searchHistoryItem)
    } else {
        alert("Please enter a city name in the search input field");
    }
    
    
        // clear input field and focus
        citySearched.value = "";
        citySearched.focus();

}
                                                                                                                                                                                                                                        
// Add event listeners for search submit

searchButton.addEventListener("click", buttonClickHandler);


