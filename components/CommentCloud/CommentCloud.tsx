import Image from "next/image";
import styles from "./CommentCloud.module.scss";
import { alphabet } from "@/utils/alphabet";
import { FC } from "react";

interface ICommentCloud {
	username: string;
	comment: string;
	date: string;
}
const CommentCloud: FC<ICommentCloud> = ({ username, comment, date }) => {
	return (
		<div className={styles.cloudContainer}>
			<Image
				src={`${alphabet[username.slice(0, 1).toLowerCase()]}`}
				width={40}
				height={40}
				alt={"Имя пользователя"}
			/>
			<div className={styles.cloudContainer__content}>
				<span>
					{username} - <i>{date}</i>
				</span>
				<p>{comment}</p>
			</div>
		</div>
	);
};
export default CommentCloud;
