import { FC, MouseEvent } from "react";
import styles from "./CommentForm.module.scss";
import IUserComment from "@/models/IUserComment";
import saveCustomData from "@/helpers/saveCustomData";
import IMovie from "@/models/IMovie";

interface ICommentFormProps {
	movie: IMovie;
	setIsActive: (state: boolean) => void;
}

const CommentForm: FC<ICommentFormProps> = ({ movie, setIsActive }) => {
	const handleSaveComment = (e: MouseEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const newComment: IUserComment = {
			date: new Date().toLocaleDateString("ru-RU", {
				year: "numeric",
				month: "long",
				day: "numeric",
			}),
			username: String(formData.get("username")),
			comment: String(formData.get("comment")),
		};

		saveCustomData(movie.id, movie.userRating, newComment);
		setIsActive(false);
	};
	return (
		<form
			className={styles.formContainer}
			onSubmit={handleSaveComment}
		>
			<div className={styles.formContainer__inputs}>
				<label htmlFor='user-name'>Ваше имя</label>
				<input
					type='text'
					id='user-name'
					name='username'
					required
				/>
			</div>
			<div className={styles.formContainer__inputs}>
				<label htmlFor='user-comment'>Ваш комментарий</label>
				<textarea
					id='user-comment'
					name='comment'
					required
				/>
			</div>
			<button
				type='submit'
				className={styles.formContainer__saveButton}
			>
				Сохранить
			</button>
		</form>
	);
};

export default CommentForm;
