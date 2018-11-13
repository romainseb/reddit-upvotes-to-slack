import Slack from "slack-node";
import { SLACK_USERNAME, SLACK_TOKEN_API } from "../env";
import { getRedditSubs } from "../modules/reddit";
import { ALL_SUBS, getRedditLinks } from "../modules/reddit";

export default async (req, res) => {
  const slackReqObj = JSON.parse(req.body.payload);
  if (slackReqObj.user.name !== SLACK_USERNAME) {
    const response = {
      response_type: "in_channel",
      channel: slackReqObj.channel_id,
      text: "Sorry, only @sromain is allowed to use me !"
    };
    return res.json(response);
  }

  const sub =
    slackReqObj.actions[0].selected_options[0].value === ALL_SUBS
      ? undefined
      : slackReqObj.actions[0].selected_options[0].value;

  const links = await getRedditLinks(sub);

  const slack = new Slack(SLACK_TOKEN_API);
  links.forEach(link => {
    slack.api(
      "chat.postMessage",
      {
        channel: slackReqObj.channel.id,
        text: link,
        as_user: true,
        unfurl_links: false
      },
      function(err, response) {
        console.log("DONE");
      }
    );
  });

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
