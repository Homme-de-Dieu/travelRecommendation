// Event listener for search button
document.getElementById('searchButton').addEventListener('click', function() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    fetchRecommendations(searchTerm);
});

// Event listener for clear button
document.getElementById('clearButton').addEventListener('click', function() {
    document.getElementById('searchInput').value = '';
    document.getElementById('recommendations').innerHTML = '';
});

// Function to fetch recommendations from the JSON file
function fetchRecommendations(searchTerm) {
    fetch('travel_recommendation_api.json')
        .then(response => {
            // Check if the response is OK
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            let recommendations = [];

            // Filter based on search term and categories
            if (searchTerm.includes('beach')) {
                recommendations = data.beaches.filter(place => place.name.toLowerCase().includes(searchTerm));
            } else if (searchTerm.includes('temple')) {
                recommendations = data.temples.filter(place => place.name.toLowerCase().includes(searchTerm));
            } else if (searchTerm.includes('country')) {
                recommendations = data.countries.flatMap(country =>
                    country.cities.filter(city => city.name.toLowerCase().includes(searchTerm))
                );
            }

            // If no recommendations found, show a message
            if (recommendations.length === 0) {
                document.getElementById('recommendations').innerHTML = '<p>No recommendations found.</p>';
            } else {
                displayRecommendations(recommendations);
            }
        })
        .catch(error => {
            console.error('Error fetching data: ', error);
            document.getElementById('recommendations').innerHTML = '<p>Error loading recommendations. Please try again later.</p>';
        });
}

// Function to display recommendations
function displayRecommendations(recommendations) {
    const recommendationsSection = document.getElementById('recommendations');
    recommendationsSection.innerHTML = ''; // Clear any previous results

    recommendations.forEach(place => {
        const placeElement = document.createElement('div');
        placeElement.classList.add('recommendation');
        placeElement.innerHTML = `
            <h2>${place.name}</h2>
            <img src="${place.imageUrl}" alt="${place.name}">
            <p>${place.description}</p>
        `;
        recommendationsSection.appendChild(placeElement);
    });
}

