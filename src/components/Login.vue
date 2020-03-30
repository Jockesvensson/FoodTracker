<template>
    <div id="login-view">
        <div id="header">
        <h2>Logga in</h2>
        </div>

        <div class="columns">
            <div class="column is-4 is-offset-4">
        <form @submit.prevent="pressed">
            <div class="field">
                <input type="email" v-model="email" placeholder="Email" class="input">
            </div>
            <div class="field">
                <input type="password" v-model="password" placeholder="Lösenord" class="input">
            </div>
            <button class="button is-primary" type="submit">Logga in</button>
        </form>

        <div class="message is-danger" v-if="error">
            <div class="message-body">{{error.message}}</div>
        </div>
        </div>
        </div>

    </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";
export default {
    data(){
        return {
            email: '',
            password: '',
            error: '',
        }
    },
    methods: {
        async pressed() {
            try{

                const val= await firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                console.log(val)
                this.$router.replace({name: "myFood"})
            }catch(err){
                console.log(err)
            }
        }
    }
}
</script>

<style scoped>
#login-view{
    margin-top: 100px;
    min-height: 84.6vh;
}
#header h2{
    margin-bottom: 20px;
    font-size: 30px;
}

</style>