import express from "express";

import { log } from "./utils";

import slackCommandRedditList from "./routes/slack-command-reddit-list";
import slackCommandLinkList from "./routes/slack-command-links-listing";

const router = new express.Router();
router.post("/slack/command/reddit-list", slackCommandRedditList);
router.post("/slack/actions", slackCommandLinkList);

export default router;
