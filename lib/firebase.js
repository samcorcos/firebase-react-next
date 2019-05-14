import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/functions'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyBKSk6fpE4XsscB-Id2QGDthUGVZlAVHtc',
  authDomain: 'react-firebase-next.firebaseapp.com',
  databaseURL: 'https://react-firebase-next.firebaseio.com',
  projectId: 'react-firebase-next',
  storageBucket: 'react-firebase-next.appspot.com',
  messagingSenderId: '98853693516',
  appId: '1:98853693516:web:20fc627bb6c0e8f8'
}

// NOTE this prevents firebase from initializing more than once
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

let functions
if (process.env.NODE_ENV === 'development') {
  // https://stackoverflow.com/questions/50884534/how-to-test-functions-https-oncall-firebase-cloud-functions-locally
  functions = firebase.functions().useFunctionsEmulator('http://localhost:5000')
} else {
  functions = firebase.functions()
}

const db = firebase.firestore()

export {
  functions,
  db,
  firebase
}
