import { FC } from "react";
import Image from "next/image";
import styles from "./CatalogueSection.module.scss";
import IMovie from "@/models/IMovie";
import MovieCard from "../MovieCard/MovieCard";
import ControlPanel from "../ControlPanel/ControlPanel";
import { useAppDispatch } from "@/redux/hooks";
import { getSearchedMovies } from "@/redux/features/moviesSlice";

interface ICatalogueProps {
	movies: IMovie[];
	search: boolean;
}

const CatalogueSection: FC<ICatalogueProps> = ({ movies, search }) => {
	const dispatch = useAppDispatch();
	return (
		<div className={styles.catalogueContainer}>
			<div className={styles.catalogueContainer__control}>
				{search ? (
					<div className={styles.catalogueContainer__searchControl}>
						<h1>Найденные совпадения</h1>
						<button
							onClick={() => dispatch(getSearchedMovies([]))}
							data-testid='remove-button'
						>
							<Image
								src='/add-icon.png'
								width={50}
								height={50}
								alt='Кнопка сброса'
							/>
						</button>
					</div>
				) : (
					<h1>Каталог</h1>
				)}

				{!search && <ControlPanel />}
			</div>
			<ul className={styles.catalogueContainer__list}>
				{movies.map((movie) => (
					<MovieCard
						movie={movie}
						key={movie.id}
						data-testid='movie-card'
					/>
				))}
			</ul>
		</div>
	);
};

export default CatalogueSection;
