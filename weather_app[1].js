// Get references to HTML elements
const locationElem = document.getElementById('location');
const temperatureElem = document.getElementById('temperature');
const descriptionElem = document.getElementById('description');
const favoriteLocationsElem = document.getElementById('favorite-locations');
const searchResultsElem = document.getElementById('search-results');
const detailLocationElem = document.getElementById('detail-location');
const detailTemperatureElem = document.getElementById('detail-temperature');
const detailDescriptionElem = document.getElementById('detail-description');
const forecastElem = document.getElementById('forecast');

// Fetch weather data for user's current location
navigator.geolocation.getCurrentPosition(position => {
    const {
        latitude,
        longitude
    } = position.coords;
    const apiKey = 'YOUR_API_KEY_HERE';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const {
                name,
                main,
                weather
            } = data;
            locationElem.textContent = name;
            temperatureElem.textContent = `${Math.round(main.temp)}°C`;
            descriptionElem.textContent = weather[0].description;
        })
        .catch(error => console.error(error));
});

// Function to display favorite locations
function displayFavoriteLocations(locations) {
    favoriteLocationsElem.innerHTML = ''; // clear the list
    locations.forEach(location => {
        const li = document.createElement('li');
        li.textContent = location;
        li.addEventListener('click', () => {
            displayDetailScreen(location);
        });
        favoriteLocationsElem.appendChild(li);
    });
}

// Fetch favorite locations from local storage
let favoriteLocations = JSON.parse(localStorage.getItem('favoriteLocations')) || [];

// Display favorite locations
displayFavoriteLocations(favoriteLocations);

// Function to display search results
function displaySearchResults(results) {
    searchResultsElem.innerHTML = ''; // clear the list
    results.forEach(result => {
        const li = document.createElement('li');
        li.textContent = result.name;
        li.addEventListener('click', () => {
            addFavoriteLocation(result.name);
            displayFavoriteLocations(favoriteLocations);
            displayDetailScreen(result.name);
        });
        searchResultsElem.appendChild(li);
    });
}

// Function to add a location to favorites
function addFavoriteLocation(location) {
    if (!favoriteLocations.includes(location)) {
        favoriteLocations.push(location);
        localStorage.setItem('favoriteLocations', JSON.stringify(favoriteLocations));
    }
}

// Function to display the detail screen for a location
function displayDetailScreen(location) {
    const apiKey = 'YOUR_API_KEY_HERE';
    const url = "https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric";
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const {
                name,
                main,
                weather
            } = data;
            locationElem.textContent = name;
            temperatureElem.textContent = `${Math.round(main.temp)}°C`;
            descriptionElem.textContent = weather[0].description;
        })
        .catch(error => console.error(error));
};