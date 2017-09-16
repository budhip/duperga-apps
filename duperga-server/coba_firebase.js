var firebase = require('firebase')

var config = {
  apiKey: "AIzaSyCcfYVFV31_UnKJfBL24uawHGKz_Z26sFE",
  authDomain: "awesome-presentation.firebaseapp.com",
  databaseURL: "https://awesome-presentation.firebaseio.com",
  projectId: "awesome-presentation",
  storageBucket: "awesome-presentation.appspot.com",
  messagingSenderId: "1021392727967"
};

firebase.initializeApp(config);

var database = firebase.database()

var updateFlag = () => {
  console.log(`--------------- masukkkk flag`)
  let tanggal = new Date().toString()
  console.log(`------------- ${tanggal}`)
  database.ref('duperga').set({
    date: tanggal
  })
}

updateFlag()


// database.ref('duperga').on('value', function(snapshot) {
//   currentDate = snapshot.val().date
//   console.log(`sssss ${currentDate}`)
// })
