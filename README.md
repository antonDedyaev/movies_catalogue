# Movie Catalogue

The application is based on NextJS 13. It is basically a catalog of movies, cartoons, and TV shows. An unofficial Kinopoisk API (https://api.kinopoisk.dev/v1/documentation) was used as the public API.

On the main page, there is a list of movies with portions of 20 movies loaded every time you scroll to the bottom of the page. A small control panel is provided with an option to sort by date when the movie was added, by rating and by duration. The panel also includes two filter buttons to filter by rating and duration, as well as an "Add Movie" button. Additionally, you can search for movies using a search field in the page header.

Clicking on a movie card opens an individual movie page with a detailed information and an option to leave comments.
User-added movies, comments, and ratings are saved in localStorage.

The layout is responsive and has cross-browser support.

### Install

```
make install
```

### Run in dev mode

```
make dev
```

### Build for production

```
make build
```

### Start the built app in production mode

```
make start
```

### Lint and fix files

```
make lint
```

### Run tests

```
make test
```

### Stack:

- Typescript
- Next 13
- Redux Toolkit
- Sass
- Jest
- Eslint

---

Приложение написано на NextJS 13 и представляет собой каталог фильмов, мультфильмов и сериалов.
В качестве публичного API использовался неофициальный API КИнопоиска (https://api.kinopoisk.dev/v1/documentation).

На главной странице представлен список подгружаемых фильмов с возможностью догрузки порциями по 20 фильмов при скролле вниз. Предусмотрена небольшая панель управления с функциями сортировки по дате добавления, рейтингу и длительности. На этой же панели присутствуют два фильтра - по рейтингу и длительности - и кнопка добавления фильма. Кроме того, можно искать фильмы с помощью поискового поля в шапке страницы. 

При клике на карточке фильма открывается индивидуальная страница фильма с более подробной информацией о нем и возможностью оставлять свои комментарии.
Добавляемые пользователем фильмы, комментарии к ним и оценки сохраняются в localStorage.

У приложения адаптивная и кроссбраузерная верстка.

### Установка

```
make install
```

### Запуск в режиме разработки

```
make dev
```

### Сборка для продакшена

```
make build
```

### Запуск в режиме продакшена

```
make start
```

### Запуск линтера и исправление ошибок

```
make lint
```

### Запуск тестов

```
make test
```
### Используемый стек:

- Typescript
- Next 13
- Redux Toolkit
- Sass
- Jest
- Eslint