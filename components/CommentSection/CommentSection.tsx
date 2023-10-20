import Image from "next/image";
import styles from "./CommentSection.module.scss";
import PopUp from "../UI/PopUp/PopUp";
import { FC, useState } from "react";
import CommentForm from "../CommentForm/CommentForm";
import CommentCloud from "../CommentCloud/CommentCloud";
import IMovie from "@/models/IMovie";
import ICustomData from "@/models/ICustomData";

interface ICommentSection {
	movie: IMovie;
}

const CommentSection: FC<ICommentSection> = ({ movie }) => {
	const [modalActive, setModalActive] = useState(false);

	const savedData = localStorage.getItem("customData");
	const parsedData: ICustomData[] = savedData && JSON.parse(savedData);
	const matchedData = parsedData && parsedData.find((item) => item.movieId === movie.id);

	const handleAddComment = () => {
		setModalActive(true);
	};
	return (
		<div className={styles.commentsContainer}>
			<div className={styles.commentsContainer__heading}>
				<h3>Комментарии</h3>
				<button
					className={styles.commentsContainer__addComment}
					onClick={handleAddComment}
				>
					<Image
						src='/add-icon.png'
						width={45}
						height={45}
						alt={"Кнопка 'Добавить комментарий'"}
					/>
					<span>Оставить комментарий</span>
				</button>
			</div>
			{matchedData &&
				matchedData.userComments.reverse().map((comment, i) => (
					<CommentCloud
						date={comment.date}
						username={comment.username}
						comment={comment.comment}
						key={i}
					/>
				))}

			<PopUp
				isActive={modalActive}
				setIsActive={setModalActive}
			>
				<CommentForm
					movie={movie}
					setIsActive={setModalActive}
				/>
			</PopUp>
		</div>
	);
};

export default CommentSection;
