<template>
<!-- <div id="navbar"> 
  <h2>Nav Bar</h2> 
  <nav> 
    <router-link to="/" exact><button class="button is-primary" style="margin-right:2px;">Hem</button></router-link>
            <router-link to="/food" exact><button class="button is-primary" style="margin-right:2px;">Sök mat</button></router-link>
            <template v-if="!loggedIn">
            <router-link to="/login" exact><button class="button is-primary" style="margin-right:2px;">Logga in</button></router-link>
            <router-link to="/register" exact><button class="button is-primary">Registrera</button></router-link>
            </template>
            <template v-else>
                <router-link to="/myFood" exact><button class="button is-primary" style="margin-right:2px;">Min mat</button></router-link>
            <router-link to="/mySettings" exact><button class="button is-primary" style="margin-right:2px;">Inställningar</button></router-link>
            <button id="logout-button" v-if="loggedIn" @click="signOut" class="button is-primary">Logga ut</button>
            </template>
  </nav> 
</div> -->

<!-- <nav class="navbar navbar-expand-sm sticky-top navbar-dark " style="background-color: rgb(35, 218, 172);">
  
  <button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbars" aria-controls="navbars" aria-expanded="false" aria-label="Toggle navigation">
    <span id="test2" class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse justify-content-sm-center collapse" id="navbars">
    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
      <li class="nav-item active">
        <a class="nav-link" href="/">Hem</a>
      </li>
      <li class="nav-item active">
        <a class="nav-link" href="/food">Sök mat</a>
      </li>
        <template v-if="!loggedIn">
      <li class="nav-item active">
        <a class="nav-link" href="/login">Logga in</a>
      </li>
      <li class="nav-item active">
        <a class="nav-link" href="/register">Registrera</a>
      </li>
      <form id="test1" class="form-inline my-2 my-lg-0">
      <a class="btn btn-outline-success my-2 my-sm-0" href="/register" style="margin-right:3px;">Registrera</a>
      <a class="btn btn-outline-success my-2 my-sm-0" href="/login">Logga in</a>
    </form>

        </template>
        <template v-else>
            <li class="nav-item active">
                <a class="nav-link" href="/myFood">Min mat</a>
            </li>
            <li class="nav-item active">
                <a class="nav-link" href="/mySettings">Inställningar</a>
            </li>
            <span><button id="logout-button" v-if="loggedIn" @click="signOut" class="btn btn-outline-success" type="button">Logga ut</button></span>
        </template>  
    </ul>
  </div>
</nav> -->

<nav class="navbar navbar-expand-sm navbar-dark" style="background-color: rgb(35, 218, 172);">
  <button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#myNavbar" aria-controls="myNavbar" aria-expanded="false" aria-label="Toggle navigation">
    <span id="" class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="myNavbar">
    <ul id="test" class="navbar-nav mr-auto mt-2 mt-lg-0">
      <li class="nav-item active">
        <a class="nav-link" href="/">Hem</a>
      </li>
      <li class="nav-item active">
        <a class="nav-link" href="/food">Sök mat</a>
      </li>
      <template v-if="loggedIn">
      <li class="nav-item active">
                <a class="nav-link" href="/myFood">Min mat</a>
            </li>
            <li class="nav-item active">
                <a class="nav-link" href="/mySettings">Inställningar</a>
            </li>
        </template>
    </ul>
    <template v-if="!loggedIn">
    <form id="test1" class="navbar-nav mt-2 mt-lg-0">
    <li class="nav-item active">
            <a class="nav-link" href="/register">Registrera</a>
    </li>
    <li class="nav-item active">
            <a class="nav-link" href="/login">Logga in</a>
    </li>
    </form>
    </template>
    <template v-if="loggedIn">
    <form id="test1" class="navbar-nav mt-2 mt-lg-0">
      <li class="nav-item active">
            <a class="nav-link" v-if="loggedIn" @click="signOut">Logga ut</a>
    </li>
    </form> 
        </template>
  </div>
</nav>

</template>

<script>
import { mapGetters } from "vuex";
import * as firebase from "firebase/app";
import "firebase/auth";
export default {
    name: 'header',
    data() {
        return {
            loggedIn: false,
            uid: '',
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
                this.uid = user.uid;
            } else {
                this.loggedIn = false
            }
        })
    },
    computed: {
    ...mapGetters({

      user: "user"
    })
  },
    
}
</script>

<style scoped lang="scss">

#test1{
    margin-right: 50px;
}

ul{
    list-style-type: none;
    // text-align: center;
    margin: 0;
    :hover{
        color: white;
    }
}
li{
    display: inline-block;
    margin: 0 10px;

}
a{
    color: #fff;
    text-decoration: none;
    padding: 6px 8px;
    border-radius: 10px;

}
/* nav{
    background: #444;
    padding: 14px 0;
    margin-bottom: 40px;
} */
nav{
    /* bottom: 0;
    left: 0; */
    position: fixed;
    background: #1b242f;
    /* border-bottom: 6px solid #04c2c9; */
    /* height: 50px; */
    padding: 10px 0;
    /* margin-bottom:40px; */
    text-align: left;
    width: 100%;
    z-index: 99;
}
.router-link-active{
    background: #eee;
    color: #eee;
    :hover{
        color: white;
    }
}
#logout-button{
    color:white;
    background-color: rgb(35, 218, 172);
    border: 2px solid white;
    border-radius: 10px;
}


</style>
