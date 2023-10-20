"use client";

import styles from "./page.module.scss";
import CatalogueSection from "@/components/CatalogueSection/CatalogueSection";
import PreviewSection from "@/components/PreviewSection/PreviewSection";
import TopNavbar from "@/components/TopNavbar/TopNavbar";
import fetchMovies from "@/actions/fetchMovies";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addMovies, turnPage } from "@/redux/features/moviesSlice";
import { useEffect, useState } from "react";
import IMovie from "@/models/IMovie";
import Spinner from "@/components/UI/Spinner/Spinner";

const Homepage = () => {
	const dispatch = useAppDispatch();
	const { movies, searchedMovies, filteredMovies, currentPage, isFiltered } = useAppSelector(
		(state) => state.movies,
	);

	const renderedMovies = isFiltered ? filteredMovies : movies;

	console.log("page", currentPage);

	const [fetching, setFetching] = useState(false);

	useEffect(() => {
		const fetchMovieList = async () => {
			const movies = await fetchMovies(currentPage);

			const savedMovies = localStorage.getItem("customMovies");
			const customMovies: IMovie[] = savedMovies ? JSON.parse(savedMovies) : [];
			dispatch(addMovies(movies.concat(customMovies)));
			dispatch(turnPage());
		};
		!renderedMovies.length && fetchMovieList();
	}, []);

	const scrollHandler = (e: Event) => {
		if (!(e.target instanceof Document)) return;
		if (
			e.target.documentElement.scrollHeight -
				(e.target.documentElement.scrollTop + window.innerHeight) <
				100 &&
			currentPage
		) {
			setFetching(true);
		}
	};

	useEffect(() => {
		document.addEventListener("scroll", scrollHandler);

		return function () {
			document.removeEventListener("scroll", scrollHandler);
		};
	}, []);

	useEffect(() => {
		if (fetching) {
			const fetchMoviesOScroll = async () => {
				try {
					const moviesPortion = await fetchMovies(currentPage);
					dispatch(addMovies(moviesPortion));
					dispatch(turnPage());
				} catch (e) {
					console.log("All data has been fetched!");
				} finally {
					setFetching(false);
				}
			};
			fetchMoviesOScroll();
		}
	}, [fetching]);

	console.log(movies);
	return (
		<main className={styles.main}>
			<PreviewSection>
				<TopNavbar />
			</PreviewSection>
			<CatalogueSection
				movies={searchedMovies.length ? searchedMovies : renderedMovies}
				search={!!searchedMovies.length}
			/>
			<Spinner />
		</main>
	);
};

export default Homepage;
