/**
 *  Start Verification
 *
 *  This Function shows you how to send a verification token for Twilio Verify.
 *
 *  Pre-requisites
 *  - Create a Verify Service (https://www.twilio.com/console/verify/services)
 *  - Add VERIFY_SERVICE_SID from above to your Environment Variables (https://www.twilio.com/console/functions/configure)
 *  - Enable ACCOUNT_SID and AUTH_TOKEN in your functions configuration (https://www.twilio.com/console/functions/configure)
 */

exports.handler = function(context, event, callback) {
  const response = new Twilio.Response();
  response.appendHeader('Content-Type', 'application/json');
  
  // uncomment to support CORS
  // response.appendHeader('Access-Control-Allow-Origin', '*');
  // response.appendHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  // response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (typeof event.phone_number === 'undefined') {
    response.setBody({
      "status": false,
      "message": "Please provide a phone number."
    })
    response.setStatusCode(400);
    return callback(null, response);
  }

  const client = context.getTwilioClient();
  client.lookups.phoneNumbers(event.phone_number)
    .fetch({type: []})
    .then(phone_number => {
      console.log(phone_number.carrier)
      response.setBody({
        "success": true,
        phone_number
      });
      response.setStatusCode(200);
      console.log(`Phone loopup complete`);
      callback(null, response);
    })
    .catch(error => {
      response.setBody({
        "success": false,
        "message": error
      })
      response.setStatusCode(400);
      console.log(response);
      callback(null, response);
    });;
          
};