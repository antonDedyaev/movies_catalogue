"use client";

import { FC, MouseEvent, useEffect, useState } from "react";
import styles from "./RatingStars.module.scss";
import Image from "next/image";
import { useAppDispatch } from "@/redux/hooks";
import { setUserRating } from "@/redux/features/moviesSlice";
import saveCustomData from "@/helpers/saveCustomData";
import ICustomData from "@/models/ICustomData";

interface ISingleStarProps {
	count: number;
	selected: boolean;
}

const SingleStar: FC<ISingleStarProps> = ({ count, selected }) => {
	return (
		<button className={styles.singleStar}>
			<Image
				src={selected ? "/rating-star_filled.png" : "/rating-star.png"}
				// width={20}
				// height={20}
				width={0}
				height={0}
				sizes='100vw'
				style={{ width: "20px", height: "auto" }}
				alt='Звезда для оценки'
				data-id={count}
			/>
		</button>
	);
};

interface IRatingStarsProps {
	movieId?: number;
}

const RatingStars: FC<IRatingStarsProps> = ({ movieId }) => {
	const dispatch = useAppDispatch();
	const [ratingValue, setRatingValue] = useState(0);

	useEffect(() => {
		const customData = localStorage.getItem("customData");
		if (customData) {
			const parsedData: ICustomData[] = JSON.parse(customData);
			const matchedMovie = parsedData.find((item) => item.movieId === movieId);
			matchedMovie && setRatingValue(matchedMovie.userRating);
		}
	}, []);

	const arrayOfStars = Array.from({ length: 5 }, (_, index) => index + 1);

	const handleStarClick = (e: MouseEvent<HTMLDivElement>) => {
		e.preventDefault();
		const target = e.target as HTMLButtonElement;
		const rating = target.dataset.id;
		setRatingValue(Number(rating));
		dispatch(setUserRating(Number(rating)));
		movieId && saveCustomData(movieId, Number(rating));
	};
	return (
		<div
			className={styles.starsContainer}
			onClick={handleStarClick}
		>
			{arrayOfStars.map((num) => (
				<SingleStar
					count={num}
					selected={num <= ratingValue}
					key={num}
				/>
			))}
		</div>
	);
};

export default RatingStars;
