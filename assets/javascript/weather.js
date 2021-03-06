// declaree HTML elements as vars

var citySearched = document.querySelector("#city");

var searchButton = document.querySelector("#btnSearch");

var searchHistoryList = document.querySelector("#searchList");

var curWeatherEl = document.querySelector("#curWeather");

var futureWeatherEl = document.querySelector("#weeklyForecast")

// define search click handler 

var searchClickHandler = function(event) {
    // prevent page from refreshing
    event.preventDefault();

    if (curWeatherEl.hasChildNodes()){
        curWeatherEl.removeChild(curWeatherEl.firstElementChild)
    }

    if (futureWeatherEl.hasChildNodes()) {
        futureWeatherEl.removeChild(futureWeatherEl.firstElementChild);
    }
 

    // get city value from search element

    var cityName = citySearched.value.trim();

    if (cityName) {
        console.log(cityName);
        localStorage.setItem("city", cityName);

        // fetch current weather info of city named
        var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=8b2ff7d80fb33fb5fa7171ccd4d16620"
        console.log(apiUrl);

        // make a get request to url
        var getApiInfo = fetch(apiUrl);
        
        getApiInfo.then(function(response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function(data) {
                    console.log(data);

                    // coord values for city requested
                    console.log(data.coord);

                    // set coord values for city requested 
                    var cityLat = data.coord.lat ;
                    localStorage.setItem("cityLat", cityLat);
                    console.log(cityLat);
                    var cityLon = data.coord.lon ;
                    localStorage.setItem("cityLon", cityLon);
                    console.log(cityLon);
                    
                     // add cityName to search history 
                    var searchHistoryItem = document.createElement("button");
                    searchHistoryItem.classList.add("btn", "btn-secondary");
                    searchHistoryItem.id = "searchHistoryButton"
                    searchHistoryItem.textContent = cityName;
                    searchHistoryList.appendChild(searchHistoryItem);

                    oneCallApi(cityLat, cityLon);
                })
            } else {
                alert ("There was a problem with your current weather request!");
            }
        }) 
           
    } else {
        alert("Please enter a city name in the search input field");
    }

    

}

// define one call API function

var oneCallApi = function(cityLat, cityLon) {

    // define one Call Api url
    var oneCallApiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLat + "&lon=" + cityLon + "&units=imperial&appid=8b2ff7d80fb33fb5fa7171ccd4d16620";
    console.log(oneCallApiUrl);
    
    // make get request to url
    var getOneCall = fetch(oneCallApiUrl);

    // get city value from search element

    var cityName = localStorage.getItem("city");

    getOneCall.then(function(response){
        if (response.ok) {
            console.log(response);
            response.json().then(function(data){
                console.log(data);            
                
                // stylize curWeather element
                curWeatherEl.classList.add("border", "border-dark", "mt-2")

                // get current date from one Call API
                var unix_timestamp = data.current.dt

                // date object based on unix timestamp
                var curTime = new Date(unix_timestamp * 1000);

                // get current date
                var curDate = curTime.getDate();

                // get current month
                var curMonth = curTime.getMonth() + 1;
                
                // get current year
                var curYear = curTime.getFullYear();

                // concat today's date format
                var formattedCurDate = curMonth + " / " + curDate + " / " + curYear;

                // create city current weather
                var curWeatherHeader = document.createElement("h1");
                curWeatherHeader.classList.add("fs-3", "fw-bold", "ps-1");
                curWeatherHeader.id = "weatherHeader";
                curWeatherHeader.textContent = cityName + " " + formattedCurDate
                curWeatherEl.appendChild(curWeatherHeader);
                
                // create current weather icon
                // var curWeatherIcon = document.createElement("img");
                // curWeatherEl.appendChild(curWeatherIcon);
                // format weather icon
               
                // add temp / wind / humidity / UV Index 
                var curWeatherTemp = document.createElement("p");
                curWeatherTemp.classList.add("fs-2", "fw-normal");
                curWeatherTemp.textContent = "Temp: " + data.current.temp + " \xB0 F";
                curWeatherHeader.appendChild(curWeatherTemp);

                var curWeatherWind = document.createElement("p");
                curWeatherWind.classList.add("fs-2", "fw-normal");
                curWeatherWind.textContent = "Wind: " + data.current.wind_speed + " MPH";
                curWeatherHeader.appendChild(curWeatherWind);

                var curWeatherHumidity = document.createElement("p");
                curWeatherHumidity.classList.add("fs-2", "fw-normal");
                curWeatherHumidity.textContent = "Humidity: " + data.current.humidity + " %";
                curWeatherHeader.appendChild(curWeatherHumidity);


                if (data.current.uvi <= 3) {

                var curWeatherUVIEl = document.createElement("p");
                curWeatherUVIEl.classList.add("fs-2", "fw-normal");
                curWeatherUVIEl.textContent = "UV Index: ";
                curWeatherHeader.appendChild(curWeatherUVIEl);

                var curWeatherUVIValue = document.createElement("button");
                curWeatherUVIValue.classList.add("fs-2", "fw-normal", "btn", "btn-success");
                curWeatherUVIValue.textContent = data.current.uvi;
                curWeatherUVIEl.appendChild(curWeatherUVIValue);

                } else if (data.current.uvi > 3 && data.current.uvi < 6) {

                var curWeatherUVIEl = document.createElement("p");
                curWeatherUVIEl.classList.add("fs-2", "fw-normal");
                curWeatherUVIEl.textContent = "UV Index: ";
                curWeatherHeader.appendChild(curWeatherUVIEl);

                var curWeatherUVIValue = document.createElement("button");
                curWeatherUVIValue.classList.add("fs-2", "fw-normal", "btn", "btn-warning");
                curWeatherUVIValue.textContent = data.current.uvi;
                curWeatherUVIEl.appendChild(curWeatherUVIValue);

                } else if (data.current.uvi > 6) {

                var curWeatherUVIEl = document.createElement("p");
                curWeatherUVIEl.classList.add("fs-2", "fw-normal");
                curWeatherUVIEl.textContent = "UV Index: ";
                curWeatherHeader.appendChild(curWeatherUVIEl);

                var curWeatherUVIValue = document.createElement("button");
                curWeatherUVIValue.classList.add("fs-2", "fw-normal","btn", "btn-danger");
                curWeatherUVIValue.textContent = data.current.uvi;
                curWeatherUVIEl.appendChild(curWeatherUVIValue);

                }

                 // populate weather forecast cards

                 var futureWeatherHeaderEl = document.createElement("h1")
                 futureWeatherHeaderEl.classList.add("fs-3", "fw-bold", "ps-1", "d-flex", "flex-row");
                 futureWeatherHeaderEl.textContent = "5-Day Forecast:";
                 futureWeatherEl.appendChild(futureWeatherHeaderEl);
                 
                 var i = 0
                 for (i=0; i < 5;) {

                    // Get next 5 days
                    var getDay = data.daily[i+1].dt

                    // date object based on unix timestamp
                    var weekDayTime = new Date(getDay * 1000);

                    // get current date
                    var weekDayDate = weekDayTime.getDate();

                    // get current month
                    var weekDayMonth = weekDayTime.getMonth() + 1;

                    // get current year
                    var weekDayYear = weekDayTime.getFullYear();    

                    //format week day date
                    var formatWeekDayDate = weekDayMonth + " / " + weekDayDate + " / " + weekDayYear;

                    console.log(formatWeekDayDate);

                    // define data for each day
                    console.log(data.daily[i+1].temp.day);

                    // create card for date
                    var dateCard = document.createElement("div")
                    // dateCard.style = "width"
                    dateCard.classList.add("bg-primary", "col")
                    dateCard.textContent = "placeholder";
                    futureWeatherEl.appendChild(dateCard);
                    
                    i++;
                 }
 
 

            })
        } else {
            alert ("There was a problem with your one call API request!");
        }

        // clear input field and focus
        citySearched.value = "";
        citySearched.focus();
    })
}

                                                                                                                                                                                                                                        
// Add event listeners for search submit

searchButton.addEventListener("click", searchClickHandler);

// add event listener for search history click

document.addEventListener("click", function(e){
    if (e.target && e.target.id == "searchHistoryButton") {
        var searchHistoryClickHandler = function(){
        
            if (curWeatherEl.hasChildNodes()){
                curWeatherEl.removeChild(curWeatherEl.firstElementChild);
            }

            if (futureWeatherEl.hasChildNodes()) {
                futureWeatherEl.removeChild(futureWeatherEl.firstElementChild);
            }
        
            var getCityName = e.target.textContent;
            console.log(getCityName);
        
            localStorage.setItem("city", getCityName);
        
            // fetch current weather info of city named
            var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + getCityName + "&appid=8b2ff7d80fb33fb5fa7171ccd4d16620";
        
             // make a get request to url
             var getApiInfo = fetch(apiUrl);
        
             getApiInfo.then(function(response) {
                if (response.ok) {
                    console.log(response);
                    response.json().then(function(data) {
                        console.log(data);
        
                        // coord values for city requested
                        console.log(data.coord);
        
                        // set coord values for city requested 
                        var cityLat = data.coord.lat ;
                        localStorage.setItem("cityLat", cityLat);
                        console.log(cityLat);
                        var cityLon = data.coord.lon ;
                        localStorage.setItem("cityLon", cityLon);
                        console.log(cityLon);
        
                        oneCallApi(cityLat, cityLon);
                    })
                }
            })
        
        };
        
        searchHistoryClickHandler();
    }
});
