<template>
    <div id="info">
        
        <span v-if="loggedIn">Välkommen {{user.data.displayName}}!</span>
        <span v-else></span>
        <!-- <div>
            <button id="logout-button" v-if="loggedIn" @click="signOut" class="button is-primary">Logga ut</button>
        </div> -->
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import * as firebase from "firebase/app";
import "firebase/auth";
export default {
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

<style scoped>
#info{
    margin-top: 20px;
    color: black;
}
#logout-button{
    margin-top: 10px;
}

</style>