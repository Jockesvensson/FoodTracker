<template>
  <div id="app">
    <navbar-top></navbar-top>
 
    
    <router-view />
    <bottom-footer></bottom-footer>
</div>
</template>
              

<script>
// import TopHeader from './components/Top-Header.vue'
import NavbarTop from './components/header.vue'
import BottomFooter from './components/Bottom-Footer.vue'
import * as firebase from "firebase/app";
import "firebase/auth";
export default {
  components: {
                'bottom-footer': BottomFooter,
                'navbar-top': NavbarTop,
  },
  data() {
        return {
            loggedIn: false
        }
    },
    methods: {
        async signOut() {
            try{

                const data = await firebase.auth().signOut();
                console.log(data);
                this.$router.replace({name: "Welcome"})

            }catch(err) {
                console.log(err)
            }

        }
    },
    created() {
        firebase.auth().onAuthStateChanged(user=> {
            if(user){
              console.log(user.uid)
                this.loggedIn = true
                
            } else {
                this.loggedIn = false
            }
        })
    }

}
</script>


<style lang="scss">
@import '~bulma/css/bulma.css';


html {
  height: 100%;
}
body {
  display: flex;
  flex-direction: column;
  height: 100%
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: rgb(17, 213, 219);
    text-decoration: none;

    &.router-link-exact-active {
      color: #42b983;

    }
  }
}
#start-background{
  background-image: url("assets/background1.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
}


</style>