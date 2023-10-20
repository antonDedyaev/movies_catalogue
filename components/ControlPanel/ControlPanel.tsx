"use client";

import { useState, MouseEvent } from "react";
import Image from "next/image";
import styles from "./ControlPanel.module.scss";
import inputStyles from "../RangeFilter/RangeFilter.module.scss";
import { useAppDispatch } from "@/redux/hooks";
import { sortMovies } from "@/redux/features/moviesSlice";
import PopUp from "../UI/PopUp/PopUp";

import CustomMovieCard from "../CustomMovieCard/CustomMovieCard";
import RangeFilter from "../RangeFilter/RangeFilter";

const ControlPanel = () => {
	const [sortParameter, setSortParameter] = useState("Дате добавления");
	const [modalActive, setModalActive] = useState(false);
	const [filterType, setFilterType] = useState<"rating" | "duration">("rating");

	const dispatch = useAppDispatch();

	const handleClickDropdown = (e: MouseEvent) => {
		const target = e.target as HTMLLIElement;
		const dropdownMenu = document.querySelector(`.${styles.panelContainer__dropdown}`);
		dropdownMenu?.classList.toggle(`${styles.panelContainer__dropdown_active}`);
		if (target.parentElement?.parentElement === e.currentTarget) {
			const paramName = target.textContent;
			if (paramName) {
				setSortParameter(paramName);
				dispatch(sortMovies(paramName));
			}
		}
	};

	const handleFilterClicked = (e: MouseEvent<HTMLButtonElement>) => {
		const selectedType = e.currentTarget.classList.contains(
			`${styles.panelContainer__durationFilter}`,
		)
			? "duration"
			: "rating";
		setFilterType(selectedType);
		const filterTab = document.querySelector(`.${inputStyles.filterContainer}`);
		filterTab && filterTab.classList.add(`${inputStyles.filterContainer_visible}`);
	};

	return (
		<div className={styles.panelContainer}>
			<div
				className={styles.panelContainer__sort}
				data-testid='sort'
			>
				<h4>Сортировка по</h4>
				<div
					className={styles.panelContainer__sortParameter}
					onClick={handleClickDropdown}
				>
					<span>{sortParameter.toLowerCase()}</span>
					<ul className={styles.panelContainer__dropdown}>
						<li>Дате добавления</li>
						<li>Рейтингу</li>
						<li>Длительности</li>
					</ul>
					<Image
						src='/arrow-icon.png'
						width={32}
						height={28}
						alt={"Стрелочка"}
					/>
				</div>
			</div>
			<div
				className={styles.panelContainer__filter}
				data-testid='filter'
			>
				<h4>Фильтры</h4>
				<div className={styles.panelContainer__filterButtons}>
					<button
						className={styles.panelContainer__durationFilter}
						onClick={handleFilterClicked}
					>
						<Image
							src='/length-icon.png'
							width={25}
							height={25}
							alt={"Фильтры"}
						/>
					</button>
					<button
						className={styles.panelContainer__ratingFilter}
						onClick={handleFilterClicked}
					>
						<Image
							src='/rating-icon.png'
							width={25}
							height={25}
							alt={"Фильтры"}
						/>
					</button>
				</div>
				<RangeFilter
					type={filterType}
					minValue={filterType === "rating" ? 1 : 30}
					maxValue={filterType === "rating" ? 10 : 250}
				/>
			</div>
			<div
				className={styles.panelContainer__addMovie}
				data-testid='add-movie'
			>
				<h4>Добавить фильм</h4>
				<button onClick={() => setModalActive(true)}>
					<Image
						src='/add-icon.png'
						width={35}
						height={35}
						alt='Кнопка добавить'
					/>
				</button>
			</div>

			<PopUp
				datatest-id='popup'
				isActive={modalActive}
				setIsActive={setModalActive}
			>
				<CustomMovieCard setIsActive={setModalActive} />
			</PopUp>
		</div>
	);
};

export default ControlPanel;
