/*
 * All callbacks for Messenger are POST-ed. They will be sent to the same
 * webhook. Be sure to subscribe your app to your page to receive callbacks
 * for your page. 
 * https://developers.facebook.com/docs/messenger-platform/product-overview/setup#subscribe_app
 *
 */

var messageHandler = require('../models/messageHandler')
var receivedMessage = messageHandler.receivedMessage

function requestBody (req, res) {
  var data = req.body;

  // Make sure this is a page subscription
  if (data.object == 'page') {
    // Iterate over each entry
    // There may be multiple if batched
    data.entry.forEach(function(pageEntry) {
      var pageID = pageEntry.id;
      var timeOfEvent = pageEntry.time;

      // Iterate over each messaging event
      pageEntry.messaging.forEach(function(messagingEvent) {
        handleMessagingEvent(messagingEvent)
      });
    });

    // Assume all went well.
    //
    // You must send back a 200, within 20 seconds, to let us know you've 
    // successfully received the callback. Otherwise, the request will time out.
    res.sendStatus(200);
  }
}

function handleMessagingEvent (messagingEvent){
  if (messagingEvent.optin) {
    receivedAuthentication(messagingEvent);
  } else if (messagingEvent.message) {
    receivedMessage(messagingEvent);
  } else if (messagingEvent.delivery) {
    receivedDeliveryConfirmation(messagingEvent);
  } else if (messagingEvent.postback) {
    getStarted.receivedPostback(messagingEvent);
  } else if (messagingEvent.read) {
    receivedMessageRead(messagingEvent);
  } else if (messagingEvent.account_linking) {
    receivedAccountLink(messagingEvent);
  } else {
    console.log("Webhook received unknown messagingEvent: ", messagingEvent);
  }
}

module.exports.handleMessagingEvent = handleMessagingEvent;
module.exports.requestBody = requestBody;
