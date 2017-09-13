'use strict';
var https = require('https');
var wishIntro = [
  "This sounds like a cool things. ",
  "Wow. ",
  "Oh, I like that. "
];

var priceslotsValue = '';
var timeperiodslotsValue = '';
var itemperiodslotsValue = '';
var currentsavingslotsValue = '';

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
  console.log(itemSlot);
  var priceSlot=request.intent.slots.price.value;
  var timebuySlot=request.intent.slots.time_to_buy.value;
  var currentsavingSlot=request.intent.slots.current_saving.value;
  var bank_saving = currentsavingSlot;
  var current_price = priceSlot;
  var time_period = monthDiff(new Date(), new Date(timebuySlot));
  console.log('---------------------------------1');
  https.get(`https://duperga-179314.appspot.com/api/alexa/predictSaving?bank_saving=${bank_saving}&current_price=${current_price}&time_period=${time_period}`, (resp) => {
    let responseString = '';
    console.log('---------------------------------2');
    resp.on('data', (data) => {
      let _data = responseString += data
      console.log('-------------------------------3', _data);
      var hasildata = JSON.parse(_data);
      var future_saving = hasildata.bank_saving;
      var future_price = hasildata.total_price;
      console.log('ini hasil bank_saving', future_saving);
      console.log('ini hasil total_price', future_price);
      if (future_price <=  future_saving){
        var speechOutput = `You want to buy ${itemSlot} with price ${priceSlot} rupiah on ${timebuySlot} and your current saving is ${currentsavingSlot} rupiah. My prediction is your future money is ${future_saving} rupiah and price future is ${future_price} rupiah.
        Your budget is enough. You can buy it in the future`;
      } else {
        console.log('fad saving',future_saving);
        console.log('fad price', future_price);
        var speechOutput = `My prediction is your future money is ${future_saving} rupiah and price future is ${future_price} rupiah.
        Your budget is not enough. You must have saving per month, want try it?`;
        var repromptText = 'want try it?';
      }
      priceslotsValue = request.intent.slots.price.value;
      timeperiodslotsValue = time_period;
      itemperiodslotsValue = request.intent.slots.item.value;
      currentsavingslotsValue = request.intent.slots.current_saving.value;
      callback(sessionAttributes,
          buildSpeechletResponse("saving per month", speechOutput, repromptText, false));
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

function handleSavingPerMonth(intent, session, callback) {
  const cardTitle = intent.name;
  const savingpermonthSlot = intent.slots.my_saving;
  let repromptText = '';
  let sessionAttributes = {};
  const shouldEndSession = false;
  let speechOutput = '';

  var priceAfterYes = parseInt(priceslotsValue);
  var timeperiodAfterYes = parseInt(timeperiodslotsValue);
  var itemAfterYes = itemperiodslotsValue;
  var currentsavingAfterYes = parseInt(currentsavingslotsValue);
  if (!savingpermonthSlot.value) {
    speechOutput = "How much your current savings per month right now ?";
    repromptText = "How much your current savings per month right now ?";
  } else {
    console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$0');
    var savingpermonth = savingpermonthSlot.value;
    sessionAttributes = {savingpermonth};
    https.get(`https://duperga-179314.appspot.com/api/alexa/predictMonthly?name=${itemAfterYes}&bank_saving=${currentsavingAfterYes}&current_saving=${savingpermonth}&current_price=${priceAfterYes}&time_period=${timeperiodAfterYes}`, (resp) => {
      console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$1');
      let responseMonthlyString = '';
      resp.on('data', (data) => {
        console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$2');
        let _dataMonthly = responseMonthlyString += data
        var hasildataMonthly = JSON.parse(_dataMonthly);
        var future_saving_monthly = hasildataMonthly.total_saving;
        var future_price_monthly = hasildataMonthly.total_price;
        // var speechOutput = 'ini adalah adalah'
        if (future_price_monthly <=  future_saving_monthly){
          // var speechOutput = 'Udah cukup';
          var speechOutput = `My prediction is your future money is ${future_saving_monthly} rupiah and price future is ${future_price_monthly} rupiah.
          Your budget is enough. You can buy it in the future`;
        } else {
          // var speechOutput = 'Masih gak cukup';
          var speechOutput = `My prediction is your future money is ${future_saving_monthly} rupiah and price future is ${future_price_monthly} rupiah.
          Your budget is not enough. You must have saving per month, want try it?`;
          // var repromptText = 'want try it?';
        }
        callback(sessionAttributes,
            buildSpeechletResponse(cardTitle, speechOutput, repromptText, false));
      });
      resp.on('end', () => {
        var responseMonthlyStringObject = JSON.parse(responseMonthlyString);
        callback(null, responseMonthlyStringObject);
      });
    })
    .on("error", (err) => {
      callback();
    });
  }
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
  } else if (intentName === 'yes_answer') {
      handleSavingPerMonth(intent, session, callback);
  } else if (intentName === 'AMAZON.HelpIntent') {
      getWelcomeResponse(callback);
  } else if (intentName === 'AMAZON.StopIntent' || intentName === 'AMAZON.CancelIntent') {
      handleSessionEndRequest(callback);
  } else {
      console.log('----------------------intent name', intentName);
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
