#!/usr/bin/env node

'use strict';

const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

const DEFAULT_PROFILE = 'personal';
const BASE_MODEL = 'en-GB';

const SKILLS_TO_UPDATE = [
	{ id: 'amzn1.ask.skill.0ac57354-ba4a-449c-9aa0-34b153f03ef4', locale: 'en-GB' },
	{ id: 'amzn1.ask.skill.0ac57354-ba4a-449c-9aa0-34b153f03ef4', locale: 'en-US' },
	{ id: 'amzn1.ask.skill.0ac57354-ba4a-449c-9aa0-34b153f03ef4', locale: 'en-AU' },
	{ id: 'amzn1.ask.skill.0ac57354-ba4a-449c-9aa0-34b153f03ef4', locale: 'en-CA' },
	{ id: 'amzn1.ask.skill.0ac57354-ba4a-449c-9aa0-34b153f03ef4', locale: 'en-IN' }
];

const getFileName = (/* locale */) => `${__dirname}/${BASE_MODEL}.json`;

// ask api update-model [-s|--skill-id <skillId>] [-f | --file <fileName>] [-l|--locale <locale>] [-p|--profile <profile>] [-g|--stage <stage>] [--debug]

const run = async () => {
	try {
		const promises = SKILLS_TO_UPDATE.map((skill) => (
			execAsync(`ask api update-model -s ${skill.id} -f ${getFileName(/* skill.locale */)} -l ${skill.locale} -p ${DEFAULT_PROFILE}`)
		));

		await Promise.all(promises);

		console.log('Update complete. Check the Alexa Developer Console for progress.');

		process.exit(0);
	} catch (error) {
		console.error('Error.\r\n');
		console.error(error.message || error);

		process.exit(1);
	}
};

run();
