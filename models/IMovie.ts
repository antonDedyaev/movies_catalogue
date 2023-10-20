interface IGenre {
    name: string;
}

interface ICountry {
    name: string;
}

export default interface IMovie {
    id: number;
    name: string;
    movieLength: number;
    description: string;
    shortDescription: string;
    year: number;
    poster: { 
        url:string;
        previewUrl: string; 
    };
    genres: IGenre[];
    countries: ICountry[];
    kpRating: number;
    userRating: number;
}