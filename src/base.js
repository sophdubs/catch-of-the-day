import Rebase from 're-base';
import firebase from 'firebase';
import config from './config'

const firebaseApp = firebase.initializeApp({
    apiKey: config.apiKey,
    authDomain: config.authDomain,
    databaseURL: config.databaseURL
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };
export default base;