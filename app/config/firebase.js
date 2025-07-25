const admin = require('firebase-admin');
const serviceAccount = require('./firebase-service-account.json'); // tách ra file riêng

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://vulgarveto-default-rtdb.asia-southeast1.firebasedatabase.app",
});

module.exports = admin.database();
