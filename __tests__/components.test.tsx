import { renderWithStore } from "@/helpers/renderWithStore";
import "@testing-library/jest-dom";
import { screen, fireEvent } from "@testing-library/react";
import ControlPanel from "@/components/ControlPanel/ControlPanel";
import CatalogueSection from "@/components/CatalogueSection/CatalogueSection";
import CommentSection from "@/components/CommentSection/CommentSection";
import TopNavbar from "@/components/TopNavbar/TopNavbar";

const mockedFetch = jest.fn(() =>
	Promise.resolve({
		json: () => Promise.resolve({}),
	}),
) as jest.Mock;

global.fetch = mockedFetch;

const mockMovies = [
	{
		id: 1,
		name: "Movie1",
		movieLength: 120,
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam obcaecati reprehenderit suscipit autem natus animi, quos ipsum, culpa, expedita repellat temporibus. Beatae aliquid corrupti sunt molestiae iusto fugit itaque excepturi.",
		shortDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
		year: 2023,
		poster: {
			url: "",
			previewUrl: "",
		},
		genres: [{ name: "Комедия" }],
		countries: [{ name: "Россия" }],
		kpRating: 7,
		userRating: 5,
	},
	{
		id: 2,
		name: "Movie2",
		movieLength: 100,
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam obcaecati reprehenderit suscipit autem natus animi, quos ipsum, culpa, expedita repellat temporibus. Beatae aliquid corrupti sunt molestiae iusto fugit itaque excepturi.",
		shortDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
		year: 2022,
		poster: {
			url: "",
			previewUrl: "",
		},
		genres: [{ name: "Ужасы" }],
		countries: [{ name: "США" }],
		kpRating: 9,
		userRating: 3,
	},
];

const customInitialState = {
	movies: mockMovies,
	searchedMovies: [],
	filteredMovies: [],
	userRating: 0,
	currentPage: 1,
	isFiltered: false,
};

describe("HOMEPAGE", () => {
	it("renders empty catalogue", () => {
		renderWithStore(
			<CatalogueSection
				movies={[]}
				search={false}
			/>,
			customInitialState,
		);
		const movieCard = screen.queryByTestId("movie-card");
		expect(movieCard).toBeNull();
	});

	it("renders control panel", () => {
		renderWithStore(<ControlPanel />, customInitialState);
		const sortTab = screen.getByTestId("sort");
		const filterTab = screen.getByTestId("filter");
		const addTab = screen.getByTestId("add-movie");

		expect(sortTab).toBeInTheDocument();
		expect(filterTab).toBeInTheDocument();
		expect(addTab).toBeInTheDocument();
	});

	it("renders custom movie form", () => {
		renderWithStore(<ControlPanel />, customInitialState);
		const addMovieForm = screen.getByText("Данные о фильме");

		expect(addMovieForm).toBeInTheDocument();
	});

	it("renders search results", async () => {
		renderWithStore(
			<CatalogueSection
				movies={[]}
				search
			/>,
			customInitialState,
		);
		const results = screen.queryByText("Найденные совпадения");
		expect(results).toBeInTheDocument();
	});
});

describe("MOVIE PAGE", () => {
	it("renders comments section and add comment button", () => {
		renderWithStore(<CommentSection movie={mockMovies[0]} />, customInitialState);
		const header = screen.getByText("Комментарии");
		const addButton = screen.getByTestId("add-comment");

		expect(header).toBeInTheDocument();
		expect(addButton).toBeInTheDocument();
	});

	it("renders no comments to the movie", () => {
		renderWithStore(<CommentSection movie={mockMovies[0]} />, customInitialState);
		const commentCloud = screen.queryAllByTestId("comment");
		expect(commentCloud).toHaveLength(0);
	});
});

describe("SEARCH INPUT", () => {
	it("displays input value", () => {
		renderWithStore(<TopNavbar />, customInitialState);

		const searchInput = screen.getByPlaceholderText(/поиск фильмов.../i);
		expect(searchInput).toBeInTheDocument();
		fireEvent.input(searchInput, {
			target: { value: "titanic" },
		});
		expect(searchInput).toHaveValue("titanic");
	});

	// it("clears input upon Enter", async () => {
	// 	renderWithStore(<TopNavbar />, customInitialState);

	// 	const searchInput = screen.getByPlaceholderText(/поиск фильмов.../i);
	// 	fireEvent.input(searchInput, {
	// 		target: { value: "bond" },
	// 	});
	// 	expect(searchInput).toHaveValue("bond");
	// 	fireEvent.keyDown(searchInput, {
	// 		key: "Enter",
	// 	});
	// });
});
