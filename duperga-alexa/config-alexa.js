'use strict';

var wishIntro = [
  "This sounds like a cool things. ",
  "Wow. ",
  "Oh, I like that. "
 ];

// --------------- Helpers that build all of the responses -----------------------

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
  console.log("in buildSpeechletResponseWithDirectiveNoIntent");
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

// --------------- Functions that control the skill's behavior -----------------------

function getWelcomeResponse(callback) {
  // If we wanted to initialize the session to have some attributes we could add those here.
  const sessionAttributes = {};
  const cardTitle = 'Welcome';
  const speechOutput = 'Ok boss, I am opening your wishlist. ' +
      'What can I do for you?';
  // If the user either does not reply to the welcome message or says something that is not
  // understood, they will be prompted again with this text.
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

  //Now let's recap all slots
  var itemSlot=request.intent.slots.item.value;
  var priceSlot=request.intent.slots.price.value;
  var timebuySlot=request.intent.slots.time_to_buy.value;
  var currentsavingSlot=request.intent.slots.current_saving.value;
  speechOutput = `You want to buy ${itemSlot} with price ${priceSlot} on ${timebuySlot} and your current saving is ${currentsavingSlot}`;

  //say the results
  callback(sessionAttributes,
      buildSpeechletResponse("The Wish is ", speechOutput, "", true));
}

function handleSessionEndRequest(callback) {
  const cardTitle = 'Session Ended';
  const speechOutput = 'Thank you for trying the Alexa Skills Kit sample. Have a nice day!';
  // Setting this to true ends the session and exits the skill.
  const shouldEndSession = true;

  callback({}, buildSpeechletResponse(cardTitle, speechOutput, null, shouldEndSession));
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
  // the argument is an array [] of words or phrases
  var i = 0;
  i = Math.floor(Math.random() * array.length);
  return(array[i]);
}

function isSlotValid(request, slotName){
  var slot = request.intent.slots[slotName];
  //console.log("request = "+JSON.stringify(request)); //uncomment if you want to see the request
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


// --------------- Events -----------------------

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
  // Dispatch to your skill's launch.
  getWelcomeResponse(callback);
}

/**
 * Called when the user specifies an intent for this skill.
 */
function onIntent(intentRequest, session, callback) {
  console.log(`onIntent requestId=${intentRequest.requestId}, sessionId=${session.sessionId}`);

  const intent = intentRequest.intent;
  const intentName = intentRequest.intent.name;

  // Dispatch to your skill's intent handlers
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
  // Add cleanup logic here
}


// --------------- Main handler -----------------------

// Route the incoming request based on type (LaunchRequest, IntentRequest,
// etc.) The JSON body of the request is provided in the event parameter.
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
