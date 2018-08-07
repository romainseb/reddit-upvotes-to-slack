import { getRedditSubs } from './modules/reddit';

async function main() {
	const subs = await getRedditSubs();
	console.log(subs);
}

main();
