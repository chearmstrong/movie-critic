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

it('Should tell me about Aquaman', async () => {
	needle
		.mockResolvedValueOnce(getMovie.actionMovie)
		.mockResolvedValueOnce(getMovieDetailed.actionMovie)
		.mockResolvedValueOnce(null);

	const payload = await alexa.utter('what is aquaman about');

	expect(payload).toHaveProperty('response.outputSpeech.ssml');
	expect(payload).toHaveProperty('response.card');
	expect(payload.response.outputSpeech.ssml).toContain('Once home to the most advanced civilization on Earth');
});

it('Should tell me about The Grinch', async () => {
	needle
		.mockResolvedValueOnce(getMovie.comedyMovie)
		.mockResolvedValueOnce(getMovieDetailed.comedyMovie)
		.mockResolvedValueOnce(null);

	const payload = await alexa.utter('what is the grinch about');

	expect(payload).toHaveProperty('response.outputSpeech.ssml');
	expect(payload).toHaveProperty('response.card');
	expect(payload.response.outputSpeech.ssml).toContain('The Grinch hatches a scheme to ruin Christmas');
});

it('Should tell me about The Grinch', async () => {
	needle
		.mockResolvedValueOnce(getMovie.horrorMovie)
		.mockResolvedValueOnce(getMovieDetailed.horrorMovie)
		.mockResolvedValueOnce(null);

	const payload = await alexa.utter('what is the glass about');

	expect(payload).toHaveProperty('response.outputSpeech.ssml');
	expect(payload).toHaveProperty('response.card');
	expect(payload.response.outputSpeech.ssml).toContain('In a series of escalating encounters');
});
