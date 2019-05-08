import * as va from 'virtual-alexa';
import needle from 'needle';
import * as getMovieDetailed from '../__fixtures__/getMovieDetailed';
import * as getMovie from '../__fixtures__/getMovie';

jest.mock('needle');

const VOICE_MODEL = `${__dirname}/../models/en-GB.json`;

const alexa = va.VirtualAlexa.Builder()
	.handler('src/index.handler')
	.interactionModelFile(VOICE_MODEL)
	.create();

beforeEach(() => jest.resetAllMocks);

it('Give me the rating for Aquaman', async () => {
	needle
		.mockResolvedValueOnce(getMovie.actionMovie)
		.mockResolvedValueOnce(getMovieDetailed.actionMovie);

	const payload = await alexa.utter('give me the movie rating for aquaman');

	expect(payload).toHaveProperty('response.outputSpeech.ssml');
	expect(payload).toHaveProperty('response.card');
	expect(payload.response.outputSpeech.ssml).toContain('the rating for aquaman is');
});

it('Give me the rating for The Grinch', async () => {
	needle
		.mockResolvedValueOnce(getMovie.comedyMovie)
		.mockResolvedValueOnce(getMovieDetailed.comedyMovie);

	const payload = await alexa.utter('give me the movie rating for the grinch');

	expect(payload).toHaveProperty('response.outputSpeech.ssml');
	expect(payload).toHaveProperty('response.card');
	expect(payload.response.outputSpeech.ssml).toContain('the rating for the grinch is');
});

it('Give me the rating for The Grinch', async () => {
	needle
		.mockResolvedValueOnce(getMovie.horrorMovie)
		.mockResolvedValueOnce(getMovieDetailed.horrorMovie);

	const payload = await alexa.utter('give me the movie rating for the glass');

	expect(payload).toHaveProperty('response.outputSpeech.ssml');
	expect(payload).toHaveProperty('response.card');
	expect(payload.response.outputSpeech.ssml).toContain('the rating for the glass is');
});
