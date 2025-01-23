const apiUrl = 'https://api.themoviedb.org/3/search/movie';
const bearerToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMDE1ZjMyZmM5M2IzZTY5MTBlYmMwMjBhYWU1ZTExYSIsIm5iZiI6MTczNzEzMzIwMi4zNjUsInN1YiI6IjY3OGE4YzkyMDljMzFkYWVhNDk3NzM0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eVyMaQILPnC6IG-jupQ-3YgbVIRN8HesFzkNPWfK1Zs';

async function fetchMovies(query) {
    try {
        const response = await fetch(`${apiUrl}?query=${encodeURIComponent(query)}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
                'Content-Type': 'application/json;charset=utf-8',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        displayMovies(data.results);
    } catch (error) {
        console.error('Error:', error);
    }
}

async function fetchPopularMovies() {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?page=1`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'Authorization': `Bearer ${bearerToken}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        displayMovies(data.results);
    } catch (error) {
        console.error('Error:', error);
    }
}

function displayMovies(movies) {
    const moviesContainer = document.getElementById('movies-container');

    if (!moviesContainer) {
        console.error('Error: Could not find the element with ID "movies-container".');
        return;
    }

    moviesContainer.innerHTML = '';

    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');

        const posterPath = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'placeholder.jpg';
        const releaseDate = movie.release_date || 'Unknown';
        const overview = movie.overview || 'No description available.';
        movieId = movie.id;        

        if (!movieId) {
            console.error(`Movie ID is missing for the movie: ${movie.title}`);
            return;
        }

        movieElement.innerHTML = `
            <a href="details.html?id=${movieId}">
                <img src="${posterPath}" alt="${movie.title}">
                <div class="movie-info">
                    <h3>${movie.title}</h3>
                    <p><strong>Release Date:</strong> ${releaseDate}</p>
                    <p><strong>Rating:</strong> ${movie.vote_average} / 10</p>
                    <p>${overview}</p>
                </div>
            </a>
        `;

        moviesContainer.appendChild(movieElement);
    });
}

document.getElementById('search-button').addEventListener('click', () => {
    const query = document.getElementById('query-input').value.trim();
    if (query) {
        fetchMovies(query);
    } else {
        alert('Please enter a movie title.');
    }
});

document.getElementById('query-input').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const query = event.target.value.trim();
        if (query) {
            fetchMovies(query);
        } else {
            alert('Please enter a movie title.');
        }
    }
});

fetchPopularMovies();