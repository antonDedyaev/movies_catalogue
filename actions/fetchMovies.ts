import IMovie from '@/models/IMovie';

const fetchMovies = async (pageNumber: number) => {
    const response = await fetch(`https://api.kinopoisk.dev/v1.3/movie?page=${pageNumber}&limit=20`, 
        { 
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": `${process.env.NEXT_PUBLIC_API_KEY}`
            },
        }
    )
    const data = await response.json();

    const movies: IMovie[] = data.docs.map((movie: any) => {
        return {
            id: movie.id,
            name: movie.name,
            movieLength: movie.movieLength,
            description: movie.description,
            shortDescription: movie.shortDescription,
            year: movie.year,
            poster: { 
                url: movie.poster.url,
                previewUrl: movie.poster.previewUrl,
            },
            genres: movie.genres,
            countries: movie.countries,
            kpRating: movie.rating.kp,
            userRating: 0,
        }
    });
    console.log('fetchedMovies', movies);

    return movies;
} 

export default fetchMovies;