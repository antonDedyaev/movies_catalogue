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

    console.log(data);


    
    const movies: IMovie[] = data.docs.map((movie: any) => {
        const genres = movie.genres.map((genre: string) => {
            return { name: genre }
        });
        console.log('genres', genres);
        const countries = movie.countries.map((country: string) => {
            return { name: country }
        });
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
            genres,
            countries, 
            kpRating: movie.rating,
        }
    });

    



    return movies;
};
export default findMovie;