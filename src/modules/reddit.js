import { CLIENT_ID, CLIENT_SECRET, REDDIT_PASS, REDDIT_USER } from "../env";

require("dotenv").config();
const Snoowrap = require("snoowrap");
const Snoostorm = require("snoostorm");
export const ALL_SUBS = "All of them";

const r = new Snoowrap({
  userAgent: "reddit-bot-example-node",
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  username: REDDIT_USER,
  password: REDDIT_PASS
});
const client = new Snoostorm(r);

function uniqueFilter(item, pos, a) {
  return a.indexOf(item) === pos;
}

async function getFav() {
  const array = await r.getMe().getSavedContent();
  return array.toJSON();
}

export async function getRedditSubs() {
  const array = await getFav();
  return array
    .map(redditLink => redditLink.subreddit_name_prefixed)
    .filter(uniqueFilter)
    .concat([ALL_SUBS])
    .sort((a, b) => a.toLocaleLowerCase().localeCompare(b.toLocaleLowerCase()));
}

export async function getRedditLinks(sub) {
  let items = await getFav();
  if (sub) {
    items = items.filter(item => sub === item.subreddit_name_prefixed);
  }

  return items
    .sort((a, b) => a.permalink.localeCompare(b.permalink))
    .map(item => `https://reddit.com${item.permalink}`);
}

export async function removeSaves(sub) {
  let items = await r.getMe().getSavedContent();
  if (sub) {
    items = items.filter(item => sub === item.subreddit_name_prefixed);
  }
  items.forEach(item => item.unsave());
}
