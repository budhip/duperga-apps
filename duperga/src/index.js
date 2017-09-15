import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as firebase from 'firebase'

var config = {
  apiKey: "AIzaSyCcfYVFV31_UnKJfBL24uawHGKz_Z26sFE",
  authDomain: "awesome-presentation.firebaseapp.com",
  databaseURL: "https://awesome-presentation.firebaseio.com",
  projectId: "awesome-presentation",
  storageBucket: "awesome-presentation.appspot.com",
  messagingSenderId: "1021392727967"
};
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
