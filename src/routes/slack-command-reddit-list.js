export default async (req, res) => {
	const slackReqObj = req.body;
	if (req.body.user_name !== 'sromain2') {
		const response = {
			response_type: 'in_channel',
			channel: slackReqObj.channel_id,
			text: 'Hello, only @sromain could use me !',
		};
		return res.json(response);
	}

	try {
		const response = {
			response_type: 'in_channel',
			channel: slackReqObj.channel_id,
			text: 'Hello :slightly_smiling_face:',
			attachments: [
				{
					text: 'What report would you like to get?',
					fallback: 'What report would you like to get?',
					color: '#2c963f',
					attachment_type: 'default',
					callback_id: 'report_selection',
					actions: [
						{
							name: 'reports_select_menu',
							text: 'Choose a report...',
							type: 'select',
							options: [{ text: 'test', value: 'test2' }],
						},
					],
				},
			],
		};
		return res.json(response);
	} catch (err) {
		log.error(err);
		return res.status(500).send("Something blew up. We're looking into it.");
	}
};
