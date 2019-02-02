#!/usr/bin/env node

require('dotenv').config();

const { VirtualAlexa } = require('virtual-alexa'); // eslint-disable-line
const access = require('safe-access');
const events = require('./events');

const VOICE_MODEL = `${__dirname}/../models/en-GB.json`;
const EVENT = access(process.env, 'EVENT');

const { intentName, slots } = events[EVENT];

const alexa = VirtualAlexa.Builder()
	.handler('src/index.handler')
	.interactionModelFile(VOICE_MODEL)
	.create();

alexa.dynamoDB().mock();

const debug = () => alexa.intend(intentName, slots)
	.then(() => alexa.dynamoDB().reset())
	.catch(console.error);

module.exports = debug();
