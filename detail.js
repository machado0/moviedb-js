const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');
const bearerToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMDE1ZjMyZmM5M2IzZTY5MTBlYmMwMjBhYWU1ZTExYSIsIm5iZiI6MTczNzEzMzIwMi4zNjUsInN1YiI6IjY3OGE4YzkyMDljMzFkYWVhNDk3NzM0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eVyMaQILPnC6IG-jupQ-3YgbVIRN8HesFzkNPWfK1Zs';

const movieDetailContainer = document.getElementById('movie-detail-container');
fetch(`https://api.themoviedb.org/3/movie/${movieId}`, {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json;charset=utf-8',
    }})
    .then((response) => response.json())
    .then((movie) => {
        // Build the movie detail view
        movieDetailContainer.innerHTML = `
            <div class="movie-detail">
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                <h1>${movie.title}</h1>
                <p>${movie.overview}</p>
                <p><strong>Release Date:</strong> ${movie.release_date}</p>
                <p><strong>Rating:</strong> ${movie.vote_average} / 10</p>
                <a href="index.html">Back to Home</a>
            </div>
        `;
    })
    .catch((error) => {
        movieDetailContainer.innerHTML = `<p>Failed to load movie details. Please try again.</p>`;
        console.error(error);
    });