import firebase from 'firebase';

require('@firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyBtiZILEEH1jhYGzOHPk-Okq3ws4nQBj5E",
  authDomain: "bartersystemapp-b6d7b.firebaseapp.com",
  projectId: "bartersystemapp-b6d7b",
  storageBucket: "bartersystemapp-b6d7b.appspot.com",
  messagingSenderId: "452518883812",
  appId: "1:452518883812:web:ff1d916b95b2093b4257f1"
};

  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();