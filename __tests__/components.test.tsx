import "@testing-library/jest-dom";
import { renderWithStore } from "@/helpers/renderWithStore";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import ControlPanel from "@/components/ControlPanel/ControlPanel";
import CatalogueSection from "@/components/CatalogueSection/CatalogueSection";
import CommentSection from "@/components/CommentSection/CommentSection";
import TopNavbar from "@/components/TopNavbar/TopNavbar";
import CommentForm from "@/components/CommentForm/CommentForm";

const mockedFetch = jest.fn(() =>
	Promise.resolve({
		json: () => Promise.resolve(searchMovieResponse),
	}),
) as jest.Mock;

global.fetch = mockedFetch;

jest.mock("next/navigation", () => ({
	useRouter() {
		return {
			prefetch: () => null,
		};
	},
}));

const searchMovieResponse = {
	docs: [
		{
			id: 2213,
			name: "Титаник",
			alternativeName: "Titanic",
			enName: "",
			names: ["Титаник", "Titanic"],
			type: "movie",
			year: 1997,
			description:
				"В первом и последнем плавании шикарного «Титаника» встречаются двое. Пассажир нижней палубы Джек выиграл билет в карты, а богатая наследница Роза отправляется в Америку, чтобы выйти замуж по расчёту. Чувства молодых людей только успевают расцвести, и даже не классовые различия создадут испытания влюблённым, а айсберг, вставший на пути считавшегося непотопляемым лайнера.",
			shortDescription:
				"Запретная любовь на фоне гибели легендарного лайнера. Великий фильм-катастрофа — в отреставрированной версии",
			logo: "https://avatars.mds.yandex.net/get-ott/223007/2a000001729e8bc06ab8fbd24ff28cf4e297/orig",
			poster: "https://avatars.mds.yandex.net/get-kinopoisk-image/1773646/96d93e3a-fdbf-4b6f-b02d-2fc9c2648a18/orig",
			backdrop: "https://imagetmdb.com/t/p/original/rzdPqYx7Um4FUZeD8wpXqjAUcEm.jpg",
			rating: 8.384,
			votes: 814258,
			movieLength: 194,
			genres: ["мелодрама", "история", "триллер", "драма"],
			countries: ["США", "Мексика"],
			releaseYears: [],
		},
	],
};

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
		expect(screen.queryByTestId("movie-card")).toBeNull();
	});

	it("renders control panel", () => {
		renderWithStore(<ControlPanel />, customInitialState);

		expect(screen.getByTestId("sort")).toBeInTheDocument();
		expect(screen.getByTestId("filter")).toBeInTheDocument();
		expect(screen.getByTestId("add-movie")).toBeInTheDocument();
	});

	it("renders custom movie form", () => {
		renderWithStore(<ControlPanel />, customInitialState);

		expect(screen.getByText("Данные о фильме")).toBeInTheDocument();
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

		expect(screen.getByText("Комментарии")).toBeInTheDocument();
		expect(screen.getByTestId("add-comment")).toBeInTheDocument();
	});

	it("renders no comments to the movie", () => {
		renderWithStore(<CommentSection movie={mockMovies[0]} />, customInitialState);

		expect(screen.queryAllByTestId("comment")).toHaveLength(0);
	});

	it("requires username and text in the comment form to be filled", () => {
		renderWithStore(
			<CommentForm
				movie={mockMovies[0]}
				setIsActive={() => console.log("test")}
			/>,
			customInitialState,
		);

		expect(screen.getByLabelText("Ваше имя")).toBeRequired();
		expect(screen.getByLabelText("Ваш комментарий")).toBeRequired();
	});
});

describe("SEARCH MOVIE", () => {
	const parsedMovieData = searchMovieResponse.docs.map((movie) => {
		const genres = movie.genres.map((genre: string) => {
			return { name: genre };
		});
		const countries = movie.countries.map((country: string) => {
			return { name: country };
		});
		return {
			id: movie.id,
			name: movie.name,
			movieLength: movie.movieLength,
			description: movie.description,
			shortDescription: movie.shortDescription,
			year: movie.year,
			poster: {
				url: movie.poster,
				previewUrl: movie.poster,
			},
			genres,
			countries,
			kpRating: movie.rating,
			userRating: 0,
		};
	});
	it("displays input value", () => {
		renderWithStore(<TopNavbar />, customInitialState);

		const searchInput = screen.getByPlaceholderText(/поиск фильмов.../i);
		expect(searchInput).toBeInTheDocument();
		fireEvent.input(searchInput, {
			target: { value: "titanic" },
		});
		expect(searchInput).toHaveValue("titanic");
	});

	it("displays search results", async () => {
		renderWithStore(
			<CatalogueSection
				movies={parsedMovieData}
				search
			/>,
			customInitialState,
		);
		expect(screen.getByText("Найденные совпадения")).toBeInTheDocument();
		expect(screen.getByTestId("remove-button")).toBeInTheDocument();
		expect(screen.getAllByTestId("movie-card")).toHaveLength(1);
	});

	it("clears input upon Enter", async () => {
		renderWithStore(<TopNavbar />, customInitialState);

		const searchInput = screen.getByPlaceholderText(/поиск фильмов.../i);
		fireEvent.input(searchInput, {
			target: { value: "titanic" },
		});
		fireEvent.keyDown(searchInput, {
			key: "Enter",
		});
		await waitFor(() => {
			expect(searchInput).toHaveValue("");
		});
	});
});
