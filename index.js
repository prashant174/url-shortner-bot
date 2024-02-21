const { App } = require('@slack/bolt');
const axios = require('axios');
const { shortenUrl } = require('./urlShortner');
// const { shortenUrl } = require('./urlShortener');
require('dotenv').config();

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
});

app.command('/shorturl', async ({ command, ack, say }) => {
    await ack();

    // Extract the URL from the command text
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const urls = command.text.match(urlRegex);
    if (!urls || urls.length === 0) {
        await say('No URL provided');
        return;
    }
    const longUrl = urls[0];

    // Shorten the URL
    const shortUrl = shortenUrl(longUrl);

    await say(`Shortened URL: ${shortUrl}`);
});

(async () => {
    await app.start(process.env.PORT || 3000);
    console.log('⚡️ Bolt app is running!');
})();
