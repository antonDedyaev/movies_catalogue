import IMovie from '@/models/IMovie';

const findMovie = async (queryText: string) => {
    const response = await fetch(`https://api.kinopoisk.dev/v1.2/movie/search?page=1&limit=20&query=${queryText.trim().toLowerCase()}`,
        { 
            method: "GET",
            headers: {
                    "Content-Type": "application/json",
                    "X-API-KEY": `${process.env.NEXT_PUBLIC_API_KEY}`
            },
        }
    );
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
                url: movie.poster,
                previewUrl: movie.poster,
            },
            genres: movie.genres,
            countries: movie.countries,
            rating: movie.rating.kp,
        }
    });



    return movies;
};
export default findMovie;