import Image from "next/image";
import styles from "./TopNavbar.module.scss";
import { FC, KeyboardEvent, useState } from "react";
import findMovie from "@/actions/findMovie";
import { useAppDispatch } from "@/redux/hooks";
import { getSearchedMovies } from "@/redux/features/moviesSlice";
import PopUp from "../UI/PopUp/PopUp";

const TopNavbar: FC = () => {
	const dispatch = useAppDispatch();
	const [modalActive, setModalActive] = useState(false);
	const [searchValue, setSearchValue] = useState("");
	const handleMovieSearch = async (e: KeyboardEvent) => {
		if (e.key === "Enter") {
			const target = e.target as HTMLInputElement;
			const matchedResults = await findMovie(target.value);
			matchedResults.length
				? dispatch(getSearchedMovies(matchedResults))
				: setModalActive(true);

			setSearchValue("");
		}
	};
	return (
		<div className={styles.navbarContainer}>
			<div className={styles.navbarContainer__logo}>
				<Image
					src='/catalogue-logo.png'
					width={70}
					height={70}
					alt='Логотип каталога'
				/>
				<span>Movies Catalogue</span>
			</div>
			<input
				className={styles.navbarContainer__search}
				type='text'
				placeholder='Поиск фильмов...'
				value={searchValue}
				onChange={(e) => setSearchValue(e.target.value)}
				onKeyDown={handleMovieSearch}
			/>
			<PopUp
				isActive={modalActive}
				setIsActive={setModalActive}
			>
				<h2 className={styles.navbarContainer__noMatch}>
					Совпадений не найдено :(
					<br />
					Попробуйте ввести другое название
				</h2>
			</PopUp>
		</div>
	);
};

export default TopNavbar;
