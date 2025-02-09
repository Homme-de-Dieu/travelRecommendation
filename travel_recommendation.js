document.getElementById('searchButton').addEventListener('click', function() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    fetchRecommendations(searchTerm);
});

document.getElementById('clearButton').addEventListener('click', function() {
    document.getElementById('searchInput').value = '';
    document.getElementById('recommendations').innerHTML = '';
});

function fetchRecommendations(searchTerm) {
    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            const recommendations = data.filter(place => {
                return place.name.toLowerCase().includes(searchTerm) || place.type.toLowerCase().includes(searchTerm);
            });
            displayRecommendations(recommendations);
        })
        .catch(error => console.log('Error fetching data: ', error));
}

function displayRecommendations(recommendations) {
    const recommendationsSection = document.getElementById('recommendations');
    recommendationsSection.innerHTML = '';  // Clear any previous results

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
