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
var placeslotsValue = '';
var currentsavingslotsValue = '';
var savingpermonthslotsValue = '';
var priceSuggestionslotsValue = '';

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
  const speechOutput = 'Ok honey' +
      'What is your wish my dear?';
  const repromptText = 'Please tell me what you want to buy my love?';
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
  const speechOutput = 'Ok honey';
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
  var itemSlot=request.intent.slots.item.value;
  var priceSlot=request.intent.slots.price.value;
  var placeSlot=request.intent.slots.city_name.value;
  var timebuySlot=request.intent.slots.time_to_buy.value;
  var currentsavingSlot=request.intent.slots.current_saving.value;
  var bank_saving = currentsavingSlot;
  var current_price = priceSlot;
  var time_period = monthDiff(new Date(), new Date(timebuySlot));
  https.get(`https://duperga-179314.appspot.com/api/alexa/predictSaving?bank_saving=${bank_saving}&current_price=${current_price}&time_period=${time_period}`, (resp) => {
    let responseString = '';
    resp.on('data', (data) => {
      let _data = responseString += data
      var hasildata = JSON.parse(_data);
      var future_saving = hasildata.bank_saving;
      var future_price = hasildata.total_price;
      console.log('ini future price', future_price);
      var pembulatan_future_saving = pembulatan(future_saving);
      console.log('ini pembulatan future saving', pembulatan_future_saving);
      var pembulatan_future_price = pembulatan(future_price);
      console.log('ini pembulatan future price', pembulatan_future_price);
      if (future_price <=  future_saving){
        var speechOutput = `You want to buy ${itemSlot} in ${placeSlot} with price ${priceSlot} rupiah on ${timebuySlot} and your current saving is ${currentsavingSlot} rupiah.
        In the future, the price of this house will be about ${pembulatan_future_price} rupiah and your money will be about ${pembulatan_future_saving} rupiah.
        Your budget is enough. You can buy it in the future. Do you want to save it honey?`;
      } else {
        var speechOutput = `In the future, the price of this house will be about ${pembulatan_future_price} rupiah and your money will be ${pembulatan_future_saving} rupiah.
        I'm sorry honey, it's not enough.
        You must saving some money per month, will you save some money?`;
        var repromptText = 'will you?';
      }
      priceslotsValue = request.intent.slots.price.value;
      timeperiodslotsValue = time_period;
      itemperiodslotsValue = request.intent.slots.item.value;
      placeslotsValue = request.intent.slots.city_name.value;
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

function handleSavingToApi(intent, session, callback) {
  const cardTitle = intent.name;
  const sayYesSavingSlot = intent.slots.say_yes_save;
  let repromptText = '';
  let sessionAttributes = {};
  const shouldEndSession = false;
  let speechOutput = '';

  if (!sayYesSavingSlot.value) {
    speechOutput = 'Do you want to save it my dear?';
    repromptText = 'Do you want to save it my dear?';
  } else {
    var priceAfterYes = parseInt(priceslotsValue);
    var timeperiodAfterYes = parseInt(timeperiodslotsValue);
    var itemAfterYes = `${itemperiodslotsValue} in ${placeslotsValue}`;
    var currentsavingAfterYes = parseInt(currentsavingslotsValue);
    var savingpermonthAfterYes = parseInt(savingpermonthslotsValue);
    var priceSuggestionAfterYes = parseInt(priceSuggestionslotsValue);
    https.get(`https://duperga-179314.appspot.com/api/alexa/save?name=${itemAfterYes}&bank_saving=${currentsavingAfterYes}&current_saving=${savingpermonthAfterYes}&current_price=${priceAfterYes}&time_period=${timeperiodAfterYes}`);
    speechOutput = 'Successfully saving my sweetheart';
  }
  callback(sessionAttributes,
    buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}

function handleSavingSuggestion(intent, session, callback) {
  const cardTitle = intent.name;
  const sayYesSavingSlot = intent.slots.save_suggestion;
  let repromptText = '';
  let sessionAttributes = {};
  const shouldEndSession = true;
  let speechOutput = '';

  if (!sayYesSavingSlot.value) {
    speechOutput = 'Do you want to save it my dear?';
    repromptText = 'Do you want to save it my dear?';
  } else {
    var priceAfterYes = parseInt(priceslotsValue);
    var timeperiodAfterYes = parseInt(timeperiodslotsValue);
    var itemAfterYes = `${itemperiodslotsValue} in ${placeslotsValue}`;
    var currentsavingAfterYes = parseInt(currentsavingslotsValue);
    var priceSuggestionAfterYes = parseInt(priceSuggestionslotsValue);

    https.get(`https://duperga-179314.appspot.com/api/alexa/save?name=${itemAfterYes}&bank_saving=${currentsavingAfterYes}&current_saving=${priceSuggestionAfterYes}&current_price=${priceAfterYes}&time_period=${timeperiodAfterYes}`);
    speechOutput = 'Successfully saving my sweetheart';
  }
  callback(sessionAttributes,
    buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}

function handleAutomatically(intent, session, callback) {
  const cardTitle = intent.name;
  const sayYesSavingSlot = intent.slots.say_no;
  let repromptText = '';
  let sessionAttributes = {};
  const shouldEndSession = false;
  let speechOutput = '';

  if (!sayYesSavingSlot.value) {
    speechOutput = 'Do you want me to predict this?';
    repromptText = 'Do you want me to predict this?';
  } else {
    var priceAfterYes = parseInt(priceslotsValue);
    var timeperiodAfterYes = parseInt(timeperiodslotsValue);
    var itemAfterYes = `${itemperiodslotsValue} in ${placeslotsValue}`;
    var currentsavingAfterYes = parseInt(currentsavingslotsValue);
    var savingpermonthAfterYes = parseInt(savingpermonthslotsValue);
    https.get(`https://duperga-179314.appspot.com/api/alexa/predictNewSaving?name=${itemAfterYes}&bank_saving=${currentsavingAfterYes}&current_saving=${savingpermonthAfterYes}&current_price=${priceAfterYes}&time_period=${timeperiodAfterYes}`, (resp) => {
      let responsePredictString = '';
      resp.on('data', (data) => {
        let _dataPredict = responsePredictString += data
        var hasildataPredict = JSON.parse(_dataPredict);
        var time_predict = hasildataPredict.new_time;
        var tabungan_predict = hasildataPredict.new_saving;
        var pembulatan_tabungan_predict = pembulatan(tabungan_predict);
        var speechOutput = `I think you should save ${pembulatan_tabungan_predict} rupiah. Or you must wait ${time_predict} month,
        if you insist with your current saving.
        Save it my dear?`;
        var reprompt = speechOutput;

        priceSuggestionslotsValue = tabungan_predict;

        callback(sessionAttributes,
            buildSpeechletResponse(cardTitle, speechOutput, repromptText, false));
      });
      resp.on('end', () => {
        var responsePredictStringObject = JSON.parse(responsePredictString);
        callback(null, responsePredictStringObject);
      });
    })
    .on("error", (err) => {
      callback();
    });
  }
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
    var savingpermonth = savingpermonthSlot.value;
    sessionAttributes = {savingpermonth};
    https.get(`https://duperga-179314.appspot.com/api/alexa/predictMonthly?name=${itemAfterYes}&bank_saving=${currentsavingAfterYes}&current_saving=${savingpermonth}&current_price=${priceAfterYes}&time_period=${timeperiodAfterYes}`, (resp) => {
      let responseMonthlyString = '';
      resp.on('data', (data) => {
        let _dataMonthly = responseMonthlyString += data
        var hasildataMonthly = JSON.parse(_dataMonthly);
        var future_saving_monthly = hasildataMonthly.total_saving;
        var future_price_monthly = hasildataMonthly.total_price;
        var pembulatan_future_saving_monthly = pembulatan(future_saving_monthly);
        var pembulatan_future_price_monthly = pembulatan(future_price_monthly);
        if (future_price_monthly <=  future_saving_monthly){
          var speechOutput = `In the future, the price of this house will be about ${pembulatan_future_price_monthly} rupiah and your money will be about ${pembulatan_future_saving_monthly} rupiah.
          Your budget is enough. You can buy it in the future. Do you want to save it honey?`;
        } else {
          var speechOutput = `Your balance in the future will be about ${pembulatan_future_saving_monthly} rupiah.
          Your money still not enough. Try new saving?`;
        }
        savingpermonthslotsValue = savingpermonthSlot.value;

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

function pembulatan(value) {
  try {
    var valstring = value.toString();
    var vallength = valstring.length;
    console.log('ini vallength', vallength);
    var tigadigitdepan = valstring.slice(0,3);
    var digitbelakang = (valstring.substr(3)).replace(/[0-9]/g, 0);
    console.log('ini digit belakang', digitbelakang);
    var hasilbaru = tigadigitdepan + digitbelakang;
    return hasilbaru;
  } catch(err) {
    return value
  }
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
  } else if (intentName === 'yes_save') {
      handleSavingToApi(intent, session, callback);
  } else if (intentName === 'no_for_automatically') {
      handleAutomatically(intent, session, callback);
  } else if (intentName === 'yes_save_suggestion') {
      handleSavingSuggestion(intent, session, callback);
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
