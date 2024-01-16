// & What I want to see visually

    // * Set up normal html components (inc. head, header, body etc) make sure to attach bootstrap (if using) and connect css and javascript files to the html
    
    // * On the page we should see:
        // ? Title block with 'Weather Dashboard' in the middle

        // ? Left block
            // Header: 'Search for a city', with search bar underneath where user's would be able to type inside
            // Below should then list previous entries made (store in local storage)
            // The previous entries should be available as buttons that can be clicked again rather than retyping the search entry box

        // ? Middle/right block
            //First box should display title of searched for city followed by today's date and an icon displaying a visual representation of the current weather forecast in that city
            //Underneath should list the local temperature, wind speed and humidity

        // ? Lower middle blocks
            //Header: 5-Day Forecast
            //Should display 5 cards with the following 5 days in order
            //Each card should display:
                // ^the date
                // ^an icon representing the weather
                // ^temperature
                // ^wind speed
                // ^humidity

$(document).ready(function() {
    $('.btn-primary').on('click', function () {
        const city = $('#citySearchInput').val();
        fetchWeatherData(city);
    });
});

function fetchWeatherData(city) {
    const APIKey = "e610d1ee0c1652aebf27c6bf71a547e3";
    const queryURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${APIKey}`
    const todaysDate = dayjs().format("DD MMMM YYYY")
        console.log(todaysDate);

    // TODO: fetch query and display in console log
    fetch(queryURL)
    .then(function (response) {
        return response.json()
    })
    .then (function (data) {
        const newQueryURL = `https://api.openweathermap.org/data/2.5/weather?lat=${data[0].lat}&lon=${data[0].lon}&units=metric&appid=${APIKey}`

        fetch(newQueryURL)
        .then (function (response) {
            return response.json()
        }).then (function (data) {

            console.log(data);
            
            $('.city').text(`${city}`);
            $('.todaysDate').text(`Today's Date: ${todaysDate}`);
            //$('.todaysWeatherIcon').setAttr(`${}`);
            $('.todaysTemp').text(`Temperature: ${data.main.temp} ºC`);
            $('.todaysWind').text(`Wind Speed: ${data.wind.speed} KPH`);
            $('.todaysHumidity').text(`Humidity: ${data.main.humidity}%`);

        });

        const fiveDayForecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&units=metric&appid=${APIKey}`

        fetch(fiveDayForecastURL)
        .then (function (response) {
            return response.json()
        }).then (function (fiveData) {

            console.log(fiveData)

            const forecastContainer = $('.forecast-container');
            forecastContainer.empty();

            for (let i = 0; i < fiveData.list.length; i += 8) {
                const forecastDate = dayjs(fiveData.list[i].dt_txt).format("DD MMMM YYYY")
                const forecastIcon = fiveData.list[i].weather[0].icon;
                const forecastTemp = fiveData.list[i].main.temp;
                const forecastWind = fiveData.list[i].wind.speed;
                const forecastHumidity = fiveData.list[i].main.humidity;

                console.log(dayjs(fiveData.list[1].dt_text).format("DD MMMM YYYY"))


                const forecastCard = `
                    <div class="forecast-card">
                        <div class="forecast-date">${forecastDate}</div>
                        <div class="forecast-icon"><img src="http://openweathermap.org/img/wn/${forecastIcon}.png" alt="Weather Icon"></div>
                        <div class="forecast-temp">Temp: ${forecastTemp} ºC</div>
                        <div class="forecast-wind">Wind: ${forecastWind} KPH</div>
                        <div class="forecast-humidity">Humidity: ${forecastHumidity}%</div>
                    </div>
                `;
                

                forecastContainer.append(forecastCard);
            }

            // $('.forecastDate').text(`${todaysDate}`);
            // //$('.forecastWeatherIcon').setAttr(`${}`);
            // $('forecastTemp').text(`Temperature: ${data.main.temp} ºC`);
            // $('.forecastWind').text(`Wind Speed: ${data.wind.speed} KPH`);
            // $('.forecastHumidity').text(`Humidity: ${data.main.humidity}%`);

        })
    });

}