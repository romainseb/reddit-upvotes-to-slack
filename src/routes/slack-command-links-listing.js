import Slack from "slack-node";
import { SLACK_USERNAME, SLACK_TOKEN_API } from "../env";
import { getRedditSubs } from "../modules/reddit";

export default async (req, res) => {
  const slackReqObj = req.body;
  if (slackReqObj.user.name !== SLACK_USERNAME) {
    const response = {
      response_type: "in_channel",
      channel: slackReqObj.channel_id,
      text: "Sorry, only @sromain is allowed to use me !"
    };
    return res.json(response);
  }

  console.log(slackReqObj.actions[0].selected_options[0].value);

  try {
    const subs = await getRedditSubs();
    const response = {
      response_type: "ephemeral",
      channel: slackReqObj.channel_id,
      text: "All done :)"
    };
    return res.json(response);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Something blew up. We're looking into it.");
  }
};
