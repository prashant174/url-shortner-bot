const shortid = require('shortid');

function shortenUrl(longUrl) {
    const shortUrl = 'https://example.com/' + shortid.generate();
    return shortUrl;
}

module.exports = { shortenUrl };
