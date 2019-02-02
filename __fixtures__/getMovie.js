export const actionMovie = {
	body: [{
		type: 'movie',
		score: 1000,
		movie: {
			title: 'Aquaman',
			year: 2018,
			ids: {
				trakt: 193968,
				slug: 'aquaman-2018',
				imdb: 'tt1477834',
				tmdb: 297802
			}
		}
	}]
};

export const horrorMovie = {
	body: [{
		watchers: 8,
		movie: {
			title: 'Glass',
			year: 2019,
			ids: {
				trakt: 298686,
				slug: 'glass-2019-298686',
				imdb: 'tt6823368',
				tmdb: 450465
			}
		}
	}]
};

export const comedyMovie = {
	body: [{
		watchers: 14,
		movie: {
			title: 'The Grinch',
			year: 2018,
			ids: {
				trakt: 235711,
				slug: 'the-grinch-2018',
				imdb: 'tt2709692',
				tmdb: 360920
			}
		}
	}]
};
