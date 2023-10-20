import { FC } from "react";
import styles from "./MovieCard.module.scss";
import Image from "next/image";
import IMovie from "@/models/IMovie";
import { useRouter } from "next/navigation";

interface IMovieProps {
	movie: IMovie;
}
const MovieCard: FC<IMovieProps> = ({ movie }) => {
	const router = useRouter();
	return (
		<div
			className={styles.cardContainer}
			onClick={() => router.push(`/movie/${movie.id}`)}
		>
			{movie.poster.previewUrl ? (
				<Image
					src={movie.poster.previewUrl}
					width={0}
					height={0}
					sizes='100vw'
					style={{ width: "100%", height: "auto" }}
					alt='Постер фильма'
				/>
			) : (
				<Image
					src='/custom-poster.png'
					style={{ objectFit: "contain" }}
					width={250}
					height={350}
					alt='Постер фильма'
				/>
			)}
			<span>{movie.name}</span>
			<p>{movie.shortDescription}</p>
		</div>
	);
};

export default MovieCard;
