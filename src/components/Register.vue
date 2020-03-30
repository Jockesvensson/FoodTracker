<template>
    <div id="register">
        <div id="header">
        <h2>Registrera</h2>
        </div>
        <div class="columns">
            <div class="column is-4 is-offset-4">
        <form @submit.prevent="pressed">
            <div class="field">
                <input type="text" v-model="realName" placeholder="Namn" class="input">
            </div>
            <div class="field">
                <input type="email" v-model="email" placeholder="Email" class="input">
            </div>
            <div class="field">
                <input type="password" v-model="password" placeholder="Lösenord" class="input">
            </div>
            <button class="button is-primary" type="submit">Registrera</button>
        </form>
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
            realName: '',
            email: '',
            password: '',
            error: '',
        }
    },
    methods: {
        async pressed() {
            try{

                firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(data => {
                    console.log('hejsan')
                    data.user.updateProfile({displayName: this.realName})
                    this.$router.replace({name: "mySettings"});
                }).then(()=> {});
                
            }catch(err){
                console.log(err)
            }
            

        }
    }
    
}
</script>

<style scoped>
#register{
    margin-top: 100px;
    min-height: 84.6vh;
}
#header h2{
    margin-bottom: 20px;
    font-size: 30px;
}
</style>