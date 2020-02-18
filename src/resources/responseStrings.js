module.exports = {
  empty: '',
  error: 'Oops! Something went wrong... Please try again.',
  unhandled: {
    main: "Sorry! I didn't understand that... Please try something else.",
    reprompt: 'Try asking me for a movie rating, or ask me for help.'
  },
  welcome: {
    main:
      'Welcome to movie critic... Try asking me for a movie recommendation, or ask for help to hear more options.',
    reprompt: 'For instructions on what you can ask, say "help me".'
  },
  help: {
    main:
      'You can ask me for the rating of a movie, details of a movie, or to recommend a movie... So, what can I help you with?',
    reprompt:
      'Say things like... "What\'s the rating for Batman Begins", "Tell me about Justice League", or "Recommend an action movie"... Now, Can I help you with anything?'
  },
  rating: {
    found: (votes, movieName, rating, additional) =>
      `With ${votes} user votes, the rating for ${movieName} is ${rating} out of 10. ${additional}`,
    notFound: "Hmmm... I don't think I know that movie. Try asking me to rate another one.",
    additional: {
      low: "It's definitely not a movie I'd recommend.",
      med:
        "It might not be the best movie you'll watch this year, but give it a chance... You might like it!",
      high: "I'd definitely recommend this movie! Check it out!"
    }
  },
  recommend: {
    found: (genre, title, releaseYear, rating, tagline) =>
      `${
        genre ? `For a good ${genre} movie,` : ''
      } I'd recommend watching ${title}. It was released in ${releaseYear} and has a rating of ${rating} out of 10... ${
        tagline ? `The movie tagline is... <break time="0.5s"/>${tagline}` : ''
      }`,
    notFound:
      "Oh... I don't seem to recognise that genre. Try something like action, science fiction or maybe comedy."
  },
  tellMe: {
    found: (overview, movieName, additional) => `${overview}... <break time="0.5s"/>${additional}`,
    notFound: "Hmmm... I don't think I know that movie. Try asking me about another one.",
    additional: {
      low: "I'm not so sure about this movie... I'd give it a miss!",
      med: 'Sounds ok to me... I think this movie has potential.',
      high: 'I think this movie sounds like it could be really interesting!'
    }
  }
}
