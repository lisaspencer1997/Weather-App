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

// TODO: Add Api key, city and query url
const APIKey = "e610d1ee0c1652aebf27c6bf71a547e3";
const city = "London";

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
        
        $('.city').text(`${city}`);
        $('.todaysDate').text(`Today's Date: ${todaysDate}`);
        //$('.todaysWeatherIcon').setAttr(`${}`);
        $('.todaysTemp').text(`Temperature: ${data.main.temp} ºC`);
        $('.todaysWind').text(`Wind Speed: ${data.wind.speed} KPH`);
        $('.todaysHumidity').text(`Humidity: ${data.main.humidity}%`);

    });

});



// $(document).ready(function() {
//     $('.btn-primary').on('click', function () {
//         const city = $('#citySearchInput').val();
//         fetchWeatherData(city);
//     });
// });

// function fetchWeatherData(city) {
//     // const apiKey = "e610d1ee0c1652aebf27c6bf71a547e3";
//     // const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

//     fetch(queryURL)
//     .then(function (response) {
//         return response.json()
//     }).then (function (data) {
//         console.log(data);

//         function data(){
//             const temperature = data.main.temp;
            
//             $('.weather-container').html(`<p>Temperature: ${temperature} K</p>`);
//         }

//     });
// }




// // function showPreviousEntries() {
// //     const city = $(this).text();

// // }