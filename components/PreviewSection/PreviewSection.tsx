import { FC, ReactNode } from "react";
import styles from "./PreviewSection.module.scss";
import Image from "next/image";

interface IPreviewSectionProps {
	children?: ReactNode;
}

const PreviewSection: FC<IPreviewSectionProps> = ({ children }) => {
	return (
		<div className={styles.previewContainer}>
			<Image
				src='/movie-collage.jpg'
				fill
				alt='Poster'
			/>
			{children}
		</div>
	);
};
export default PreviewSection;
