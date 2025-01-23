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

    const actors = fetchMovieActors()

    movieDetailContainer.innerHTML = `
        <div class="movie-detail">
            <div class="details-right">
                <img class="poster" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            </div>
            <div class="details-left">
                <h1>${movie.title}</h1>
                <p>${movie.overview}</p>
                <div class="details-left">
                    <p class="paragraph-left"><strong>Release Date:</strong> ${movie.release_date}</p>
                    <p class="paragraph-left"><strong>Director:</strong> ${movie.release_date}</p>
                </div>
                <div class="details-right">
                    <p class="paragraph-right"><strong>Rating:</strong> ${movie.vote_average} / 10</p>
                </div>
                <div class="icon">
                    <a href="index.html">
                    <img src="back-arrow.png" alt="Back to Home}">
                    </a>
                </div>
            </div>
        </div>
    `;
})
.catch((error) => {
    movieDetailContainer.innerHTML = `<p>Failed to load movie details. Please try again.</p>`;
    console.error(error);
});

async function fetchMovieActors() {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json;charset=utf-8',
    }})
    .then((response) => response.json())
    .then((person));

    const actors = jsonList.filter(item => item.hasOwnProperty("character"));

    return actors;
}



