import { ReactNode } from "react";
import styles from "./PopUp.module.scss";

interface IPopUpProps {
	isActive: boolean;
	setIsActive: (state: boolean) => void;
	children: ReactNode;
}
const PopUp = ({ isActive, setIsActive, children }: IPopUpProps) => {
	return (
		<div
			className={
				isActive
					? [styles.popupContainer, styles.popupContainer_active].join(" ")
					: styles.popupContainer
			}
			onClick={() => setIsActive(false)}
		>
			<div
				className={
					isActive
						? [
								styles.popupContainer__content,
								styles.popupContainer__content_active,
						  ].join(" ")
						: styles.popupContainer__content
				}
				onClick={(e) => e.stopPropagation()}
			>
				{children}
			</div>
		</div>
	);
};
export default PopUp;
