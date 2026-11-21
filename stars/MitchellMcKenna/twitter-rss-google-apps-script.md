---
project: twitter-rss-google-apps-script
stars: 62
description: |-
    Google Apps Script to use Twitter API v1.1 to create RSS feeds of  user's timeline, search results, user's favorites, or Twitter Lists.
url: https://github.com/MitchellMcKenna/twitter-rss-google-apps-script
---

# Twitter RSS Feeds - Google Apps Script

Google Apps Script to use Twitter API v1.1 to create RSS feeds of  user's timeline, search results, user's favorites, or Twitter Lists. This script is based on the one by [Amit Agarwal](http://www.labnol.org/internet/twitter-rss-feeds/27931/).

Twitter API 1.0 has been deprecated, and as such RSS feeds are no longer available. With API v1.1, all requests to the Twitter API must now be authenticated with OAuth. Using Google Apps Scripts, anyone can easily setup a script to do the oAuth and output an RSS feed without having to host the code themselves.

## How to Create RSS Feeds for Twitter API 1.1

### 1. Setup a Twitter App

* Go to [apps.twitter.com/](https://apps.twitter.com), and create a Twitter app. Give your app any name, description, website (any URL) and put ```https://spreadsheets.google.com/macros/``` in the callback URL field.
* Click "Keys and Access Tokens" and take note of the Consumer Key and Consumer Secret Key.

### 2. Configure your Google Script
* [Click here](https://script.google.com/d/1xrMvosTNNWsBH5aJJjLcqEGMFCC4tmNsN-gz9mjKFbT74bIKBKVu-Z5z/edit?newcopy=true) to copy the Twitter RSS script into your Google Drive. 
* Replace the placeholders for `TWITTER_CONSUMER_KEY` and `TWITTER_CONSUMER_SECRET` near the top of the file with the keys you took note of.
* Replace the placeholder for `SCRIPT_PROJECT_KEY` with the value from `File -> Project properties`.
* Go to *Publish* -> *Deploy as Web App* and choose *Anyone, even anonymous* under Who has Access. Click the Deploy button.

### 3. Deploy the Twitter RSS Feed generator
* Go to *Run* -> *Start* and an email will be sent to your google account's email address with a link to twitter to grant the app the necessary permissions. If you don't get the email, you can get the link from View -> Logs.
* After clicking that, do *Run* -> *Start* again and you’ll get an email with links to some sample RSS feeds.

