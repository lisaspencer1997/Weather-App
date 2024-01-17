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

        })
    });

}