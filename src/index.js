import { CLIENT_ID, CLIENT_SECRET, REDDIT_PASS, REDDIT_USER } from './env';

require('dotenv').config();

const Snoowrap = require('snoowrap');
const Snoostorm = require('snoostorm');

// Build Snoowrap and Snoostorm clients
const r = new Snoowrap({
	userAgent: 'reddit-bot-example-node',
	clientId: CLIENT_ID,
	clientSecret: CLIENT_SECRET,
	username: REDDIT_USER,
	password: REDDIT_PASS,
});
const client = new Snoostorm(r);

console.log(
	r
		.getMe()
		.getSavedContent()
		.then(console.log),
);
