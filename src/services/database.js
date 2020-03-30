import store from '@/store'
// import firebase from 'firebase'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyAeUXkra97iSGKe-pBxVN1b1D7OwKaqAFI",
    authDomain: "jocke-vue-api-auth.firebaseapp.com",
    databaseURL: "https://jocke-vue-api-auth.firebaseio.com",
    projectId: "jocke-vue-api-auth",
    storageBucket: "jocke-vue-api-auth.appspot.com",
    messagingSenderId: "716697620064",
    appId: "1:716697620064:web:f9efbed774ba89a0f4bd05",
    measurementId: "G-2W6Y1LNWZ1"
};

const database = firebase.initializeApp(config)

database.signUp = async(email, password) => {
    try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)

        store.commit('setCurrentUser', firebase.auth().currentUser)

        return true
    } catch (error) {
        return error
    }
}

database.signIn = async(email, password) => {
    try {
        await firebase.auth().signInWithEmailAndPassword(email, password)

        store.commit('setCurrentUser', firebase.auth().currentUser)

        return true
    } catch (error) {
        return error
    }
}

database.signOut = async() => {
    try {
        await firebase.auth().signOut()

        store.commit('setCurrentUser', null)

        return true
    } catch (error) {
        return error
    }
}

export default database