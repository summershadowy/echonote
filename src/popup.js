document.addEventListener('DOMContentLoaded', function () {
    const searchButton = document.getElementById('search-button');
    const searchText = document.getElementById('search-text');

    searchButton.addEventListener('click', async () => {
        const query = searchText.value;
        const response = await fetch(`https://api.example.com/search?query=${query}`);
        const results = await response.json();
        displayResults(results);
    });

    function displayResults(results) {
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = '';
        results.forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.textContent = result.title;
            resultsDiv.appendChild(resultItem);
        });
    }
});
