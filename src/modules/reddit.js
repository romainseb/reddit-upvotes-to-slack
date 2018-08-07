import { CLIENT_ID, CLIENT_SECRET, REDDIT_PASS, REDDIT_USER } from '../env';

require('dotenv').config();
const Snoowrap = require('snoowrap');
const Snoostorm = require('snoostorm');

const r = new Snoowrap({
	userAgent: 'reddit-bot-example-node',
	clientId: CLIENT_ID,
	clientSecret: CLIENT_SECRET,
	username: REDDIT_USER,
	password: REDDIT_PASS,
});
const client = new Snoostorm(r);

function uniqueFilter(item, pos, a) {
	return a.indexOf(item) === pos;
}

export async function getRedditSubs() {
	const array = await r.getMe().getSavedContent();
	return array
		.map(redditLink => redditLink.subreddit_name_prefixed)
		.filter(uniqueFilter)
		.sort();
}

function getRedditLinks() {
	return r
		.getMe()
		.getSavedContent()
		.then(content => content.map(redditLink => redditLink.id));
}

export default getRedditLinks;
