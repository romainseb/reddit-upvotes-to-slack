import Slack from "slack-node";
import { SLACK_USERNAME, SLACK_TOKEN_API } from "../env";
import { getRedditSubs } from "../modules/reddit";

export default async (req, res) => {
  const slackReqObj = req.body;
  if (req.body.user_name !== SLACK_USERNAME) {
    const response = {
      response_type: "in_channel",
      channel: slackReqObj.channel_id,
      text: "Sorry, only @sromain is allowed to use me !"
    };
    return res.json(response);
  }

  try {
    const subs = await getRedditSubs();

    if (sub.length === 1) {
      return res.json({
        response_type: "ephemeral",
        channel: slackReqObj.channel_id,
        text: "There is no saved stuff"
      });
    }
    return res.json({
      response_type: "ephemeral",
      channel: slackReqObj.channel_id,
      text: "Hello :slightly_smiling_face:",
      attachments: [
        {
          text: "What sub do you want ?",
          fallback: "What sub do you want ?",
          color: "#2c963f",
          attachment_type: "default",
          callback_id: "report_selection",
          actions: [
            {
              name: "reports_select_menu",
              text: "Choose a sub...",
              type: "select",
              options: subs.map(sub => ({ text: sub, value: sub }))
            }
          ]
        }
      ]
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Something blew up. We're looking into it.");
  }
};
