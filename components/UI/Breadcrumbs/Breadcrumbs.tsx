import { FC } from "react";
import styles from "./Breadcrumbs.module.scss";
import Link from "next/link";

interface IBreadcrumbsProps {
	pathTail: string;
}
const Breadcrumbs: FC<IBreadcrumbsProps> = ({ pathTail }) => {
	return (
		<div className={styles.breadcrumbsContainer}>
			<Link href={"/"}>Главная страница</Link>
			<span>{pathTail}</span>
		</div>
	);
};

export default Breadcrumbs;
