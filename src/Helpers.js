// TODO: Remove Class

module.exports = class Helpers {
	static resolveCanonical(slot) {
		let canonical;

		try {
			canonical = slot.resolutions.resolutionsPerAuthority[0].values[0].value.name;
		} catch (err) {
			console.error(`resolveCanonical error ${err.message || err}`);
			canonical = slot.value;
		}

		return canonical;
	}

	static randomPhrase(array) {
		// the argument is an array [] of words or phrases
		let i = 0;
		i = Math.floor(Math.random() * array.length);

		return (array[i]);
	}

	static getStage() {
		return process.env.STAGE || 'dev';
	}
};
