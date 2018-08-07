import express from 'express';

import { log } from './utils';

import slackCommandRedditList from './routes/slack-command-reddit-list';

const router = new express.Router();
router.post('/slack/command/reddit-list', slackCommandRedditList);

export default router;
