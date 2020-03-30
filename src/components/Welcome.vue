<template>
    <div id="preview">
        <div class="container-flex">
            <div v-if="loggedIn" id="welcome">
              <div class="container">
                <div id="welcome-box" class="notification">
                    <p id="welcome-text">Välkommen</p>
                </div>
                </div>
              </div>
              <div v-else id="welcome1">
                  <div class="container">
                <div id="welcome-box" class="notification">
                    <p id="welcome-text">Välkommen</p>
                </div>
                </div>
              </div>
              </div>
    </div>
    

    
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";
export default {
    data() {
        return {
            loggedIn: false
        }
    },
    created() {
        firebase.auth().onAuthStateChanged(user=> {
            if(user){
                this.loggedIn = true
            } else {
                this.loggedIn = false
            }
        })
    },

}
</script>

<style scoped>
#preview{
    min-height: 95.3vh;
}
#welcome{
    background-image: url("../assets/background2.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    min-height: 95.3vh;
}

#welcome1{
    background-image: url("../assets/background3.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    min-height: 95.3vh;
}

#welcome-box{
    height: 500px;
    opacity: 1;
    background-color: transparent;
}
#welcome-text{
    color: white;
    margin-top: 150px;
}


</style>