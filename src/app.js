const form = document.getElementById('weather-form');
const latitudeInput = document.getElementById('latitude');
const longitudeInput = document.getElementById('longitude');
const metricSelect = document.getElementById('metric');
const resultDiv = document.getElementById('weather-result');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const latitude = latitudeInput.value.trim();
    const longitude = longitudeInput.value.trim();
    const metric = metricSelect.value;

    if (!latitude || !longitude) {
        resultDiv.textContent = 'Please enter valid latitude and longitude.';
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=2ea4854f0b91b947fcad41de0e96aec3&units=${metric}&lang=fr`;

    try {
        resultDiv.textContent = 'Loading...';
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();

        // Extraire et afficher des parties spécifiques du JSON
        const { name, weather, main } = data;
        const description = weather[0]?.description || 'No description available';
        const temperature = main?.temp || 'N/A';
        const feelsLike = main?.feels_like || 'N/A';

        // Déterminer l'unité en fonction du choix de metric
        let unit;
        switch (metric) {
            case 'metric':
                unit = '°C';
                break;
            case 'imperial':
                unit = '°F';
                break;
            default:
                unit = 'K'; // Standard unit
        }

        resultDiv.innerHTML = `
            <h3>Weather Information for ${name || 'Unknown Location'}</h3>
            <p><strong>Description:</strong> ${description}</p>
            <img src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png"
            <p><strong>Temperature:</strong> ${temperature}${unit}</p>
            <p><strong>Feels Like:</strong> ${feelsLike}${unit}</p>
        `;
    } catch (error) {
        resultDiv.textContent = 'Error fetching data: ' + error.message;
    }
});