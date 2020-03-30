import store from '@/store'
// import firebase from 'firebase'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {

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
