import IMovie from '@/models/IMovie';

const saveCustomMovie = (movie: IMovie): void => {
    const savedMovies = localStorage.getItem("customMovies");
		if (savedMovies) {
			const customMovies = JSON.parse(savedMovies);
			customMovies.push(movie);
			localStorage.setItem("customMovies", JSON.stringify(customMovies));
		} else {
			localStorage.setItem("customMovies", JSON.stringify([movie]));
		}
};

export default saveCustomMovie;