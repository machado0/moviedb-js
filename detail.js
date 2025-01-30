const urlParams = new URLSearchParams(window.location.search)
const movieId = urlParams.get('id')
const bearerToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMDE1ZjMyZmM5M2IzZTY5MTBlYmMwMjBhYWU1ZTExYSIsIm5iZiI6MTczNzEzMzIwMi4zNjUsInN1YiI6IjY3OGE4YzkyMDljMzFkYWVhNDk3NzM0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eVyMaQILPnC6IG-jupQ-3YgbVIRN8HesFzkNPWfK1Zs'

const movieDetailContainer = document.getElementById('movie-detail-container')

fetch(`https://api.themoviedb.org/3/movie/${movieId}`, {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json;charset=utf-8',
    }
})
.then((response) => response.json())
.then(async (movie) => {
    const { cast, crew } = await fetchMovieCrew()
    const actors = getActors(cast)
    const director = getDirector(crew)

    movieDetailContainer.innerHTML = `
        <div class="movie-detail">
            <div class="details-left">
                <h1>${movie.title}</h1>
                <p>${movie.overview}</p>
                <p class="paragraph-left"><strong>Release Date:</strong> ${movie.release_date}</p>
                <p class="paragraph-left"><strong>Director:</strong> ${director}</p>
                <p class="paragraph-right"><strong>Rating:</strong> ${movie.vote_average} / 10</p>

                <div class="actors-container">
                    <h2>CAST</h2>
                    <div class="actors-list">
                        ${actors.length ? actors.map(actor => `<span class="actor-tag">${actor}</span>`).join(" ") : "Unknown"}
                    </div>
                </div>

                <div class="icon">
                    <a href="index.html">
                        <img src="back-arrow.png" alt="Back to Home">
                    </a>
                </div>
            </div>
            <div class="details-right">
                <img class="poster" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            </div>
        </div>
    `;
})
.catch((error) => {
    movieDetailContainer.innerHTML = `<p>Failed to load movie details. Please try again.</p>`
    console.error(error)
});

async function fetchMovieCrew() {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
                'Content-Type': 'application/json;charset=utf-8',
            }
        });

        const data = await response.json();
        return { cast: data.cast, crew: data.crew }
    } catch (error) {
        console.error("Failed to fetch movie crew:", error)
        return { cast: [], crew: [] }
    }
}

function getActors(cast) {
    if (!cast || !Array.isArray(cast)) return []

    const actorNames = cast.slice(0, 10).map(actor => actor.name)
    return actorNames.length ? actorNames : []
}

function getDirector(crew) {
    if (!crew || !Array.isArray(crew)) return "Unknown"

    const director = crew.find(person => person.job === "Director")
    return director ? director.name : "Unknown"
}
