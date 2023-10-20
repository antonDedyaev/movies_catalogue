import styles from "./Spinner.module.scss";

const Spinner = () => {
	return (
		<div className={styles.loader}>
			<div className={styles.loader__content}></div>
		</div>
	);
};

export default Spinner;
