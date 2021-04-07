importScripts('https://www.gstatic.com/firebasejs/8.3.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.3.2/firebase-messaging.js');

firebase.initializeApp ({
    apiKey: "AIzaSyAFDLpRnWlnyiJEFMjIjDSsw5nI7ZlD9gE",
    authDomain: "enjoybr.firebaseapp.com",
    projectId: "enjoybr",
    storageBucket: "enjoybr.appspot.com",
    messagingSenderId: "713006375654",
    appId: "1:713006375654:web:8334f13a7cef145a965127",
    measurementId: "G-SH10LPK6Z1"
  })

  const messaging = firebase.messaging();