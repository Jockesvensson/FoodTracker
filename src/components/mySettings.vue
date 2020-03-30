<template>

      <div id="my-settings">

        <div id="settings" class="container">
            <div v-if="!foodSettingsActive">
              <h2>Maximalt intag</h2>
              <p>Kalorier: 0</p>
              <p>Protein: 0</p>
              <p>Fett: 0</p>
              <p>Kolhydrater: 0</p>       
            </div> 

            <div v-if="foodSettingsActive">
              <h2>Maximalt intag</h2>
              <p>Kalorier: {{foodSettings[0].kcal}}</p>
              <p>Protein: {{foodSettings[0].protein}}</p>
              <p>Fett: {{foodSettings[0].fat}}</p>
              <p>Kolhydrater: {{foodSettings[0].carbs}}</p>        
        </div>
            </div>


            <div id="settings-update" class="container">
                <div>
                <h1 id="max-intake">Updatera maximalt intag</h1>
                </div>  
              <div class="columns">
            <div class="column is-4 is-offset-4">
        <form @submit.prevent="pressed">
            
            <div class="field">
                <label style="text-align:left">Nytt kaloriintag:</label>
                <input type="text" v-model.lazy="foodSetting.kcal" placeholder="Kalorier" class="input" required>
            </div>
            <div class="field">
                <label>Nytt proteinintag:</label>
                <input type="text" v-model.lazy="foodSetting.protein" placeholder="Protein" class="input" required>
            </div>
            <div class="field">
                <label>Nytt fettintag:</label>
                <input type="text" v-model.lazy="foodSetting.fat" placeholder="Fett" class="input" required>
            </div>
            <div class="field">
                <label>Nytt kolhydratintag:</label>
                <input type="text" v-model.lazy="foodSetting.carbs" placeholder="Kolhydrater" class="input" required>
   
            </div>
            <button class="button is-primary" id="save-settings" v-on:click.prevent="updateSettings()" v-on:click="postSettings()">Spara inställningar</button>
        </form>
        </div>
        </div>
        </div>
     
      
        
              
              </div>

</template>

<script>
import searchMixin from '../mixins/searchMixin';
// import TopHeader from '../components/Top-Header';
import * as firebase from "firebase/app";
import "firebase/auth";
import { mapGetters } from "vuex";

export default {

  data() {
    return {
        foodSetting: {
            kcal: '',
            protein: '',
            fat: '',
            carbs: '',
        },
        updatedSetting: {
            kcal: '',
            protein: '',
            fat: '',
            carbs: '',
        },
        foodSettings: [],
        userId: {},
        // user: [],
        items: [],
        search: '',
        searchFood: '',
        show: true,
        uid: this.uid,
    
        foodSettingsActive: false,
    }
  },
  methods: {
      updateSettings() {

            this.show = true;

      },
      close() {
          this.show = true;
      },
      postSettings() {
          this.$http.delete('https://jocke-vue-api-auth.firebaseio.com/User/' + this.uid + '/nutrition.json').then(function(){
            //    console.log(data);
           }).then(function(){
            //    console.log(data);
               this.$http
                 .post(
                   'https://jocke-vue-api-auth.firebaseio.com/User/' + this.uid + '/nutrition.json',
                   this.foodSetting
                   
                 ) 
                 .then(function(data) {
                     location.reload();
                   console.log(data);
                 });
           })
    },
  },
  created() {
    
    // this.$http.get('https://jocke-vue-api-auth.firebaseio.com/User/' + this.uid + '/nutrition.json').then(function(data){
    //     console.log(data);
    //       return data.json();
    // }).then(function(data){
    //     var itemsArray = []
    //     console.log(data);
    //     for(let key in data){
    //         console.log(data[key]);
    //         data[key].id = key
    //         itemsArray.push(data[key]);
    //     }
    //     console.log(itemsArray);
    //     this.foodSettings = itemsArray;

    //     if(this.foodSettings != null) {
    //         this.foodSettingsActive = true;
    //     } else {
    //         this.foodSettingsActive = false;
    //     }
    // }),

    firebase.auth().onAuthStateChanged(user=> {
            if(user){
                console.log(user.uid)
                this.loggedIn = true
                this.uid = user.uid;

                 this.$http.get('https://jocke-vue-api-auth.firebaseio.com/User/' + this.uid + '/nutrition.json').then(function(data){
        console.log(data);
          return data.json();
                 }).then(function(data){
        var itemsArray = []
        console.log(data);
        for(let key in data){
            console.log(data[key]);
            data[key].id = key
            itemsArray.push(data[key]);
        }
        console.log(itemsArray);
        this.foodSettings = itemsArray;

        if(this.foodSettings != null) {
            this.foodSettingsActive = true;
        } else {
            this.foodSettingsActive = false;
        }
    })

            } else {
                this.loggedIn = false
            }
        })

    
  },

  computed: {
       filteredLabels: function() {
                return this.items.filter((item) => {
                    return item.food.label.match(this.search.toLowerCase().trim())
                });
            },
            ...mapGetters({
      user: "user"
    }),
        
     
  },
  filters: {
      toUppercase(value) {
          return value.toUpperCase();
      }
  },
  directives: {
      'rainbow': {
          bind(el) {
        el.style.color = "#" + Math.random().toString(16).slice(2, 8);
        }
      }
  },
  mixins: [searchMixin]
}
</script>

<style>
#my-settings{
    margin-top: 100px;
    min-height: 84.6vh;
}
#settings-update{
    margin: 20px auto;
}
#settings{
    width: 420px;
    padding: 15px 20px;
    border: 2px dotted rgba(17, 212, 219, 0.747);
    border-radius: 10px;
    border-style: solid;
}
#settings h2{
    font-size: 35px;
}

#max-intake{
    font-size: 35px;
    margin: 30px 0px 10px;
}


</style>