import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueResource from 'vue-resource'
import firebase from 'firebase/app';

// import 'firebase/auth';
// import 'firebase/firestore';
// import firebase from 'firebase'
// import VueFire from 'vuefire'



Vue.use(VueResource);
// Vue.use(VueFire)
// Vue.prototype.$axios = axios;


Vue.config.productionTip = false


const firebaseConfig = {

};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);



let app

const initialize = () => {
    if (!app) {
        app = new Vue({
            router,
            store,
            render: h => h(App)
        }).$mount('#app')
    }
}

firebase.auth().onAuthStateChanged(user => {
    store.dispatch("fetchUser", user);
    initialize();
});