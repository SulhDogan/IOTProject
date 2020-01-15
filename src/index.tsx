import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from "firebase";
import { Globals } from './connection';

let firebaseConfig = {
    apiKey: "AIzaSyAjv32x6wNIWIeQwwHaAjKzB9P__8zD7JU",
    authDomain: "technocoop-f0398.firebaseapp.com",
    databaseURL: "https://technocoop-f0398.firebaseio.com",
    projectId: "technocoop-f0398",
    storageBucket: "technocoop-f0398.appspot.com",
    messagingSenderId: "821315922742",
    appId: "1:821315922742:web:f333254b8ec57f7290e197"
};
let app = firebase.initializeApp(firebaseConfig);
Globals.firestore = firebase.firestore();

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();