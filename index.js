// slackBot.js
const { App } = require('@slack/bolt');
const axios = require('axios');
require('dotenv').config()
const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
});

app.message(async ({ message, say }) => {
  if (message.text && message.text.startsWith('shorten:')) {
    const longUrl = message.text.substring('shorten:'.length).trim();

    try {
      const response = await axios.post('https://checkingone.onrender.com/shorten', { longUrl });
      const shortUrl = response.data.shortUrl;

      await say(`Shortened URL: ${shortUrl}`);
    } catch (error) {
      await say(`Error shortening URL: ${error.message}`);
    }
  }
});

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('Slack bot is running!');
})();
