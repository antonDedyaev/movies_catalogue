"use client";

import Image from "next/image";
import styles from "./page.module.scss";
import { useAppSelector } from "@/redux/hooks";
import RatingStars from "@/components/UI/RatingStars/RatingStars";
import CommentSection from "@/components/CommentSection/CommentSection";
import Breadcrumbs from "@/components/UI/Breadcrumbs/Breadcrumbs";

const MoviePage = ({ params }: { params: { id: number } }) => {
	const { movies } = useAppSelector((state) => state.movies);
	const matchedMovie = movies.find((movie) => movie.id === Number(params.id));

	const joinedGenres = matchedMovie?.genres.map((genre) => genre.name).join(", ");
	const joinedCountries = matchedMovie?.countries.map((country) => country.name).join(", ");

	return (
		<div className={styles.pageContainer}>
			<div className={styles.pageContainer__movieData}>
				<div className={styles.pageContainer__moviePoster}>
					<Image
						src={
							matchedMovie?.poster.url.length
								? matchedMovie?.poster.url
								: "/custom-poster.png"
						}
						width={0}
						height={0}
						sizes='100vw'
						style={{ width: "100%", height: "auto" }}
						alt='Постер фильма'
					/>
				</div>
				<div className={styles.pageContainer__movieInfo}>
					<Breadcrumbs pathTail={matchedMovie?.name!} />
					<h1>{matchedMovie?.name}</h1>
					<table className={styles.pageContainer__movieDetails}>
						<tbody>
							<tr>
								<td>Жанр:</td>
								<td>{joinedGenres}</td>
							</tr>
							<tr>
								<td>Страна:</td>
								<td>{joinedCountries}</td>
							</tr>
							<tr>
								<td>Год:</td>
								<td>{matchedMovie?.year}</td>
							</tr>
							<tr>
								<td>Хронометраж:</td>
								<td>{matchedMovie?.movieLength} мин.</td>
							</tr>
							<tr>
								<td>Рейтинг Кинопоиска:</td>
								<td>{matchedMovie?.kpRating?.toFixed(1) ?? 0}</td>
							</tr>
							<tr>
								<td>Оценка зрителей:</td>
								<td>
									<RatingStars movieId={matchedMovie?.id} />
								</td>
							</tr>
						</tbody>
					</table>
					<h3>Сюжет:</h3>
					<p>{matchedMovie?.description}</p>
				</div>
			</div>
			<CommentSection movie={matchedMovie!} />
		</div>
	);
};
export default MoviePage;
