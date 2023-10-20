import { FC, MouseEvent } from "react";
import styles from "./CustomMovieCard.module.scss";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addNewMovie, setUserRating } from "@/redux/features/moviesSlice";
import IMovie from "@/models/IMovie";
import saveCustomMovie from "@/helpers/saveCustomMovie";
import RatingStars from "../UI/RatingStars/RatingStars";

interface ICustomMovieCardProps {
	setIsActive: (state: boolean) => void;
}

const CustomMovieCard: FC<ICustomMovieCardProps> = ({ setIsActive }) => {
	const dispatch = useAppDispatch();
	const rating = useAppSelector((state) => state.movies.userRating);
	const handleAddMovie = (e: MouseEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const newMovie: IMovie = {
			id: Date.now(),
			name: String(formData.get("name")),
			movieLength: Number(formData.get("length")),
			description: String(formData.get("description")),
			shortDescription: String(formData.get("short-description")),
			year: Number(formData.get("year")),
			poster: {
				url: String(formData.get("poster")),
				previewUrl: String(formData.get("poster")),
			},
			genres: [{ name: String(formData.get("genre")) }],
			countries: [{ name: String(formData.get("country")) }],
			kpRating: 0,
			userRating: rating,
		};

		saveCustomMovie(newMovie);
		dispatch(addNewMovie(newMovie));
		dispatch(setUserRating(0));
		setIsActive(false);
	};
	return (
		<form
			className={styles.formContainer}
			onSubmit={handleAddMovie}
		>
			<h2>Данные о фильме</h2>
			<div className={styles.formContainer__inputs}>
				<label htmlFor='name'>Название</label>
				<input
					type='text'
					id='name'
					name='name'
					defaultValue={"Название фильма"}
					required
				/>
			</div>
			<div className={styles.formContainer__inputs}>
				<label htmlFor='length'>Продолжительность</label>
				<input
					type='text'
					id='length'
					name='length'
					defaultValue={60}
					required
				/>
			</div>
			<div className={styles.formContainer__inputs}>
				<label htmlFor='description'>Описание</label>
				<input
					type='text'
					id='description'
					name='description'
					defaultValue={"Здесь должно быть краткое описание фильма"}
					required
				/>
			</div>
			<div className={styles.formContainer__inputs}>
				<label htmlFor='short-description'>Краткое описание</label>
				<input
					type='text'
					id='short-description'
					name='short-description'
					defaultValue={"Здесь должно быть полное описание фильма"}
					required
				/>
			</div>
			<div className={styles.formContainer__inputs}>
				<label htmlFor='year'>Год релиза</label>
				<input
					type='text'
					id='year'
					name='year'
					defaultValue={2023}
				/>
			</div>
			<div className={styles.formContainer__inputs}>
				<label htmlFor='poster'>Постер</label>
				<input
					type='text'
					id='poster'
					name='poster'
					defaultValue={""}
				/>
			</div>
			<div className={styles.formContainer__inputs}>
				<label htmlFor='genre'>Жанр</label>
				<input
					type='text'
					id='genre'
					name='genre'
					defaultValue={[]}
				/>
			</div>
			<div className={styles.formContainer__inputs}>
				<label htmlFor='country'>Страна производства</label>
				<input
					type='text'
					id='country'
					name='country'
					defaultValue={[]}
				/>
			</div>
			<div className={styles.formContainer__inputs}>
				<span>Рейтинг</span>
				<RatingStars />
			</div>
			<button
				className={styles.formContainer__saveButton}
				type='submit'
				data-testid='save-movie'
			>
				Сохранить
			</button>
		</form>
	);
};
export default CustomMovieCard;
