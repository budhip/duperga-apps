'use strict';
var https = require('https');
var wishIntro = [
  "This sounds like a cool things. ",
  "Wow. ",
  "Oh, I like that. "
];

function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
  return {
    outputSpeech: {
      type: 'PlainText',
      text: output,
    },
    card: {
      type: 'Simple',
      title: `SessionSpeechlet - ${title}`,
      content: `SessionSpeechlet - ${output}`,
    },
    reprompt: {
      outputSpeech: {
          type: 'PlainText',
          text: repromptText,
      },
    },
    shouldEndSession,
  };
}

function buildResponse(sessionAttributes, speechletResponse) {
  return {
    version: '1.0',
    sessionAttributes,
    response: speechletResponse,
  };
}

function buildSpeechletResponseWithDirectiveNoIntent() {
  return {
    "outputSpeech" : null,
    "card" : null,
    "directives" : [
      {
        "type" : "Dialog.Delegate"
      }
    ],
    "reprompt" : null,
    "shouldEndSession" : false
  }
}

function buildSpeechletResponseDelegate(shouldEndSession) {
  return {
    outputSpeech:null,
    directives: [
      {
        "type": "Dialog.Delegate",
        "updatedIntent": null
      }
    ],
    reprompt: null,
    shouldEndSession: shouldEndSession
  }
}

function getWelcomeResponse(callback) {
  const sessionAttributes = {};
  const cardTitle = 'Welcome';
  const speechOutput = 'Ok boss, I am opening your wishlist. ' +
      'What can I do for you?';
  const repromptText = 'Please tell me what you want to buy?';
  const shouldEndSession = false;

  callback(sessionAttributes,
      buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}

function setWishlistInSession(request, session, callback){
  var sessionAttributes={};
  var filledSlots = delegateSlotCollection(request, sessionAttributes, callback);

  //compose speechOutput that simply reads all the collected slot values
  var speechOutput = randomPhrase(wishIntro);

  //activity is optional so we'll add it to the output
  //only when we have a valid activity
  var item = isSlotValid(request, "item");
  if (item) {
    speechOutput = item;
  } else {
    speechOutput = "You'll buy ";
  }

  getPredictSaving(callback, sessionAttributes, request );
}

function handleSessionEndRequest(callback) {
  const cardTitle = 'Session Ended';
  const speechOutput = 'Thank you for trying the Alexa Skills Kit sample. Have a nice day!';
  const shouldEndSession = true;

  callback({}, buildSpeechletResponse(cardTitle, speechOutput, null, shouldEndSession));
}

function monthDiff(d1, d2) {
  var months;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth();
  months += d2.getMonth();
  return months <= 0 ? 0 : months;
}

function getPredictSaving(callback, sessionAttributes, request){
  console.log('=================masuk gak ya');
  var itemSlot=request.intent.slots.item.value;
  var priceSlot=request.intent.slots.price.value;
  var timebuySlot=request.intent.slots.time_to_buy.value;
  var currentsavingSlot=request.intent.slots.current_saving.value;
  var bank_saving = currentsavingSlot;
  var current_price = priceSlot;
  var time_period = monthDiff(new Date(), new Date(timebuySlot));
  https.get(`https://duperga-179314.appspot.com/api/alexa/predictSaving?bank_saving=${bank_saving}&current_price=${current_price}&time_period=${time_period}`, (resp) => {
    let responseString = '';
    resp.on('data', (data) => {
      let _data = responseString += data
      console.log('-------------------------------woyyyy', _data);
      var hasildata = JSON.parse(_data);
      var future_saving = hasildata.bank_saving;
      var future_price = hasildata.total_price;
      console.log('ini hasil bank_saving', future_saving);
      console.log('ini hasil total_price', future_price);
      var speechOutput = `You want to buy ${itemSlot} with price ${priceSlot} on ${timebuySlot} and your current saving is ${currentsavingSlot}. This prediction is your future money is ${future_saving} and price future is ${future_price}`;
      var speechResp = buildSpeechletResponse("The Wish is ", speechOutput, "", true)
      callback(sessionAttributes, speechResp);
    });
    resp.on('end', () => {
      var responseStringObject = JSON.parse(responseString);
      callback(null, responseStringObject);
    });
  })
  .on("error", (err) => {
    callback();
  });
}

function delegateSlotCollection(request, sessionAttributes, callback){
  if (request.dialogState === "STARTED") {
    var updatedIntent=request.intent;
    callback(sessionAttributes,
        buildSpeechletResponseWithDirectiveNoIntent());
  } else if (request.dialogState !== "COMPLETED") {
    callback(sessionAttributes,
      buildSpeechletResponseWithDirectiveNoIntent());
  } else {
    return request.intent;
  }
}

function randomPhrase(array) {
  var i = 0;
  i = Math.floor(Math.random() * array.length);
  return(array[i]);
}

function isSlotValid(request, slotName){
  var slot = request.intent.slots[slotName];
  var slotValue;

  //if we have a slot, get the text and store it into speechOutput
  if (slot && slot.value) {
    //we have a value in the slot
    slotValue = slot.value.toLowerCase();
    return slotValue;
  } else {
    //we didn't get a value in the slot.
    return false;
  }
}

/**
 * Called when the session starts.
 */
function onSessionStarted(sessionStartedRequest, session) {
  console.log(`onSessionStarted requestId=${sessionStartedRequest.requestId}, sessionId=${session.sessionId}`);
}

/**
 * Called when the user launches the skill without specifying what they want.
 */
function onLaunch(launchRequest, session, callback) {
  getWelcomeResponse(callback);
}

/**
 * Called when the user specifies an intent for this skill.
 */
function onIntent(intentRequest, session, callback) {
  const intent = intentRequest.intent;
  const intentName = intentRequest.intent.name;

  if (intentName === 'buy_item') {
      setWishlistInSession(intentRequest, session, callback);
  } else if (intentName === 'AMAZON.HelpIntent') {
      getWelcomeResponse(callback);
  } else if (intentName === 'AMAZON.StopIntent' || intentName === 'AMAZON.CancelIntent') {
      handleSessionEndRequest(callback);
  } else {
      throw new Error('Invalid intent');
  }
}

/**
 * Called when the user ends the session.
 * Is not called when the skill returns shouldEndSession=true.
 */
function onSessionEnded(sessionEndedRequest, session) {
  console.log(`onSessionEnded requestId=${sessionEndedRequest.requestId}, sessionId=${session.sessionId}`);
}



exports.handler = (event, context, callback) => {
  try {
    if (event.session.new) {
      onSessionStarted({ requestId: event.request.requestId }, event.session);
    }

    if (event.request.type === 'LaunchRequest') {
      onLaunch(event.request,
        event.session,
        (sessionAttributes, speechletResponse) => {
          callback(null, buildResponse(sessionAttributes, speechletResponse));
        });
    } else if (event.request.type === 'IntentRequest') {
      onIntent(event.request,
        event.session,
        (sessionAttributes, speechletResponse) => {
          callback(null, buildResponse(sessionAttributes, speechletResponse));
        });
    } else if (event.request.type === 'SessionEndedRequest') {
      onSessionEnded(event.request, event.session);
      callback();
    }
  } catch (err) {
      callback(err);
  }
};
