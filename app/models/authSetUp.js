/*
 * Copyright 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/* jshint node: true, devel: true */

/*
 * Be sure to setup your config values before running this code. You can 
 * set them using environment variables or modifying the config file in /config.
 *
 */

// App Secret can be retrieved from the App Dashboard

var  dotenv = require('dotenv').config()
const APP_SECRET = process.env.MESSENGER_APP_SECRET 

// Arbitrary value used to validate a webhook
const VALIDATION_TOKEN = process.env.MESSENGER_VALIDATION_TOKEN

// Generate a page access token for your page from the App Dashboard
const PAGE_ACCESS_TOKEN = process.env.MESSENGER_PAGE_ACCESS_TOKEN

// URL where the app is running (include protocol). Used to point to scripts and 
// assets located at this address. 
const SERVER_URL = process.env.SERVER_URL

if (!(APP_SECRET && VALIDATION_TOKEN && PAGE_ACCESS_TOKEN && SERVER_URL)) {
  console.error("Missing config values");
  process.exit(1);
}

module.exports.APP_SECRET = APP_SECRET;
module.exports.VALIDATION_TOKEN = VALIDATION_TOKEN;
module.exports.PAGE_ACCESS_TOKEN = PAGE_ACCESS_TOKEN;
