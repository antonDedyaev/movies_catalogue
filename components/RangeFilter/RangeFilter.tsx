import { FC, useState, ChangeEvent, useEffect } from "react";
import styles from "./RangeFilter.module.scss";
import Image from "next/image";
import { useAppDispatch } from "@/redux/hooks";
import { getFilteredMovies, setIsFiltered } from "@/redux/features/moviesSlice";

interface IRageFilterProps {
	type: "rating" | "duration";
	minValue: number;
	maxValue: number;
}
const RangeFilter: FC<IRageFilterProps> = ({ type, minValue, maxValue }) => {
	const dispatch = useAppDispatch();
	const [rangeValue, setRangeValue] = useState(0);

	const handleRangeChange = (e: ChangeEvent) => {
		const target = e.currentTarget as HTMLInputElement;
		setRangeValue(target.valueAsNumber);
		dispatch(setIsFiltered(true));
		dispatch(getFilteredMovies({ filterType: type, filterValue: rangeValue }));
	};

	const handleRemoveFilter = () => {
		setRangeValue(0);
		dispatch(setIsFiltered(false));
	};

	return (
		<div className={styles.filterContainer}>
			<div className={styles.filterContainer__range}>
				{type === "rating" ? (
					<div className={styles.filterContainer__rating}>
						<span>от {rangeValue}</span>
						<Image
							src='/rating-star_filled.png'
							width={15}
							height={15}
							alt='Звезда для оценки'
						/>
					</div>
				) : (
					<span>от {rangeValue} мин.</span>
				)}

				<input
					type='range'
					id='range-filter'
					min={minValue}
					max={maxValue}
					value={rangeValue}
					onChange={handleRangeChange}
				/>
			</div>
			<button onClick={handleRemoveFilter}>
				<Image
					src='/add-icon.png'
					width={25}
					height={25}
					alt='Сбросить фильтр'
				/>
			</button>
		</div>
	);
};

export default RangeFilter;
