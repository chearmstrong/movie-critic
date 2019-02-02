import * as va from 'virtual-alexa';
import needle from 'needle';
import * as getMovieDetailed from '../__fixtures__/getMovieDetailed';
import * as getTrendingMovies from '../__fixtures__/getTrendingMovies';

jest.mock('needle');

const VOICE_MODEL = `${__dirname}/../models/en-GB.json`;

const alexa = va.VirtualAlexa.Builder()
	.handler('src/index.handler')
	.interactionModelFile(VOICE_MODEL)
	.create();

beforeEach(() => jest.resetAllMocks);

it('Gets an action movie recommendation', async () => {
	needle
		.mockResolvedValueOnce(getTrendingMovies.actionMovie)
		.mockResolvedValueOnce(getMovieDetailed.actionMovie);

	const payload = await alexa.utter('recommend an action movie');

	expect(payload).toHaveProperty('response.outputSpeech.ssml');
	expect(payload.response.outputSpeech.ssml).toContain('for a good action movie');
});

it('Gets a comedy movie recommendation', async () => {
	needle
		.mockResolvedValueOnce(getTrendingMovies.comedyMovie)
		.mockResolvedValueOnce(getMovieDetailed.comedyMovie);

	const payload = await alexa.utter('recommend an comedy movie');

	expect(payload).toHaveProperty('response.outputSpeech.ssml');
	expect(payload.response.outputSpeech.ssml).toContain('for a good comedy movie');
});

it('Gets a horror movie recommendation', async () => {
	needle
		.mockResolvedValueOnce(getTrendingMovies.horrorMovie)
		.mockResolvedValueOnce(getMovieDetailed.horrorMovie);

	const payload = await alexa.utter('recommend an horror movie');

	expect(payload).toHaveProperty('response.outputSpeech.ssml');
	expect(payload.response.outputSpeech.ssml).toContain('for a good horror movie');
});
