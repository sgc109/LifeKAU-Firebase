const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});


exports.clearFoodReviews = functions.https.onRequest((request, response) => {
    var db = admin.database();
    var donorDbRef = db.ref('Food_reviews');
    var updateVal = {};

    return donorDbRef
        .once('value')
        .then(snapshot => {
            snapshot.forEach(childSnapshot => {
                updateVal[childSnapshot.key] = null
            });
            return donorDbRef.update(updateVal, (error) => {
                if (!error)
                    response.status(200).send('succeed deleting data!');
                else
                    response.status(200).send('failed deleting data!');
            });
        });
})
