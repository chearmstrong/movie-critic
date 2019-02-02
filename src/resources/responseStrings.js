module.exports = {
	empty: '',
	error: 'oops! something went wrong... please try again.',
	unhandled: {
		main: "sorry, i didn't understand that... please try something else.",
		reprompt: 'try asking me for a movie rating, or ask me for help.'
	},
	welcome: {
		main: 'welcome to movie critic... try asking me for a movie recommendation, or ask for help to hear more options.',
		reprompt: 'for instructions on what you can ask, say help me.'
	},
	help: {
		main: 'you can ask me for the rating of a movie, details of a movie, or to recommend a movie... so, what can i help you with?',
		reprompt: "say things like... what's the rating for batman begins, tell me about justice league, or recommend an action movie... now, can i help you with anything?"
	},
	rating: {
		found: (votes, movieName, rating, additional) => `with ${votes} user votes, the rating for ${movieName} is ${rating} out of 10. ${additional}`,
		notFound: "hmmm... i don't think i know that movie. try asking me to rate another one.",
		additional: {
			low: "it's definitely not a movie i'd recommend.",
			med: "it might not be the best movie you'll watch this year, but give it a chance... you might like it!",
			high: "i'd definitely recommend this movie! check it out!"
		}
	},
	recommend: {
		found: (genre, title, releaseYear, rating, tagline) => `${genre ? `for a good ${genre} movie,` : ''} i'd recommend watching ${title}. it was released in ${releaseYear} and has a rating of ${rating} out of 10... ${tagline ? `The movie tagline is... <break time="0.5s"/>${tagline}` : ''}`,
		notFound: "oh... i don't seem to recognize that genre. try something like action, science fiction or maybe comedy."
	},
	tellMe: {
		found: (overview, movieName, additional) => `${overview}... <break time="0.5s"/>${additional}`,
		notFound: "hmmm... i don't think i know that movie. try asking me about another one.",
		additional: {
			low: "im not so sure about this movie... i'd give it a miss!",
			med: 'sounds ok to me... i think this movie has potential.',
			high: 'i think this movie sounds like it could be really interesting!'
		}
	}
};
