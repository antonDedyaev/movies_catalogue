import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import IMovie from '@/models/IMovie';

interface FilterPayload {
    filterType: "rating" | "duration";
    filterValue: number;
}

interface IInitialState {
    movies: IMovie[];
    searchedMovies: IMovie[];
    filteredMovies: IMovie[];
    userRating: number;
    currentPage: number;
    isFiltered: boolean;
}
const initialState: IInitialState = {
    movies: [],
    searchedMovies: [],
    filteredMovies: [],
    userRating: 0,
    currentPage: 1,
    isFiltered: false,
}

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        addMovies: (state, action: PayloadAction<IMovie[]>) => {
            state.movies = [...state.movies, ...action.payload];
        },
        addNewMovie: (state, action: PayloadAction<IMovie>) => {
            state.movies.push(action.payload);
        },
        sortMovies: (state, action: PayloadAction<string>) => {
            switch(action.payload) {
                case 'Дате добавления':
                    (state.isFiltered ? state.filteredMovies : state.movies).sort((a, b) => b.year - a.year);
                    break;
                case 'Рейтингу':
                    (state.isFiltered ? state.filteredMovies : state.movies).sort((a, b) => b.kpRating - a.kpRating);
                    break;
                case 'Длительности':
                    (state.isFiltered ? state.filteredMovies : state.movies).sort((a, b) => b.movieLength - a.movieLength);
                    break;
            }
            
        },
        getSearchedMovies: (state, action: PayloadAction<IMovie[]>) => {
            state.searchedMovies = action.payload;
        },
        getFilteredMovies: (state, action: PayloadAction<FilterPayload>) => {
            const { filterType, filterValue } = action.payload
            switch(filterType) {
                case 'duration':
                    state.filteredMovies = state.movies.filter((movie) => movie.movieLength >= filterValue);
                    break;
                case 'rating':
                    state.filteredMovies = state.movies.filter((movie) => movie.kpRating >= filterValue);
                    break;
            }
            
        },
        turnPage: (state) => {
            state.currentPage += 1;
        },
        setUserRating: (state, action: PayloadAction<number>) => {
            state.userRating = action.payload;
        },
        setIsFiltered: (state, action: PayloadAction<boolean>) => {
            state.isFiltered = action.payload;
        },
    }
})

export const { 
    addMovies,
    addNewMovie,
    sortMovies,
    getSearchedMovies,
    getFilteredMovies,
    turnPage,
    setUserRating,
    setIsFiltered 
} = moviesSlice.actions;

export default moviesSlice.reducer;