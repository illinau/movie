const KEY = '0e1cfa482a1f2f4b143f88f8d4b3089a';

const URL = 'https://api.themoviedb.org/3';

export default class SwapiService {
    async gerResource(url) {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(
                `Could not fetch ${url}` + `, received ${res.status}`
            );
        }

        return res.json();
    }

    async getMovies(movie) {
        const response = await this.gerResource(
            `${URL}/search/movie?api_key=${KEY}&query=${movie}&language=en-US&page=1&include_adult=false`
        );
        return response.results;
    }

    async getGenres() {
        const response = await this.gerResource(
            `${URL}/genre/movie/list?api_key=${KEY}&language=en-US`
        );
        return response.genres;
    }
}
