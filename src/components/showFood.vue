<template>

      <div id="show-food">
          <div id="loggedIn-food" v-if="loggedIn">
        <div class="columns">
            <div class="column is-4 is-offset-4">

            <div  class="field has-addons has-addons-centered">
                <p id="testtest1" class="control">
                    <input type="text" v-model="searchFoodUrl" @change="searchFood()" placeholder="Sök mat" class="input"/>
                </p>
                <p class="control">
                    <button class="button is-primary" v-on:click="searchFood()">Sök</button>
                </p>
                </div>
                
                <div class="field has-addons has-addons-centered">
                <div id="box-width" class="field">
                 <input type="text" v-model="searchUrl" @input="isTyping = true" placeholder="Sök mat (använd inte, för många api calls)" class="input"/>
            </div>
            </div>
            <div class="field has-addons has-addons-centered">
            <div id="box-width" class="field">
                 <input type="text" v-model="search" placeholder="Filtrera" class="input">
            </div>
            </div>
          
        </div>
        </div>

      <div id="all-food" class="columns is-mobile">
        <div class="column is-three-fifths is-offset-one-fifth">
            <div v-for="item in filteredLabels" :key="item.label" class="single-food">
          <router-link v-bind:to="'/food/' + item.food.foodId"><h2>{{item.food.label}}</h2></router-link> 
      </div>
        </div>
        </div>
        </div>

        <div id="loggedOut-food" v-if="!loggedIn">
        <div class="columns">
            <div class="column is-4 is-offset-4">

            <div class="field has-addons has-addons-centered">
                <p class="control">
                    <input type="text" v-model="searchFoodUrl" @change="searchFood()" placeholder="Sök mat" class="input"/>
                </p>
                <p class="control">
                    <button class="button is-primary" v-on:click="searchFood()">Sök</button>
                </p>
                </div>
                
                <div class="field">
                 <input type="text" v-model="searchUrl" @input="isTyping = true" placeholder="Sök mat (använd inte, för många api calls)" class="input"/>
            </div>
            <div class="field">
                 <input type="text" v-model="search" placeholder="Filtrera" class="input">
            </div>
          
        </div>
        </div>

      <div id="all-food" class="columns is-mobile">
        <div class="column is-three-fifths is-offset-one-fifth">
            <div v-for="item in filteredLabels" :key="item.label" class="single-food">
          <router-link v-bind:to="'/food/' + item.food.foodId"><h2>{{item.food.label}}</h2></router-link> 
      </div>
        </div>
        </div>
        </div>

</div>
      
      
</template>

<script>

import searchMixin from '../mixins/searchMixin';
import * as firebase from "firebase/app";
import "firebase/auth";

export default {

  data() {
    return {
        items: [],
        foods: {
            label: '',
            kcal: '',
            protein: '',
            fat: '',
            carbs: '',
        },
        searchFoodUrl: '',
        searchUrl: '',
        isTyping: false,
        isLoading: false,
        search: '',
        searchFoodssss: '',
        loggedIn: false,
        
    }
  },
  methods: {
      onChange() {
          console.log(this.searchFoodUrl);
          return this.searchFoodUrl;
      },
      searchFood() {
          this.$http.get('https://api.edamam.com/api/food-database/parser?ingr=' + this.searchFoodUrl + '&app_id=YOUR_OWN_APP_ID&app_key=YOUR_OWN_API_KEY').then(function(data){
            console.log(data);
            console.log(data.body.hints);
            return this.items = data.body.hints;
        });
      },
      newSearchUrl: function(searchUrl) {
          this.isLoading = true;
          this.$http.get('https://api.edamam.com/api/food-database/parser?ingr=' + searchUrl + '&app_id=YOUR_OWN_APP_ID&app_key=YOUR_OWN_API_KEY').then(function(data){
              this.isLoading = false;
            console.log(data);
            console.log(data.body.hints);
            this.items = data.body.hints;
          });
      }

  },
  watch: {
      searchUrl: (function() {
          this.newSearchUrl(this.searchUrl);
     
      })
     
  },
 
  created() {

        this.$http.get('https://api.edamam.com/api/food-database/parser?ingr=' + this.searchFoodUrl + '&app_id=YOUR_OWN_APP_ID&app_key=YOUR_OWN_API_KEY').then(function(data){
            console.log(data);
            console.log(data.body.hints);
            return this.items = data.body.hints;
        });

        firebase.auth().onAuthStateChanged(user=> {
            if(user){
                this.loggedIn = true
            } else {
                this.loggedIn = false
            }
        });

  },

  computed: {
       filteredLabels: function() {
                return this.items.filter((item) => {
                    return item.food.label.match(this.search.toLowerCase().trim())
                });
            },
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

<style lang="scss">
#box-width{
    min-width: 27vh;
}

#show-food{
    max-width: 800px;
    margin: 100px auto 0px;
    
}
#loggedIn-food{
    min-height: 85.9vh;
}
#loggedOut-food{
    min-height: 85.9vh;
}
.single-food{
    text-decoration: none;
    font-size: 25px;
    padding: 20px;
    margin: 20px 0;
    box-sizing: border-box;
    border-radius: 10px;
    background: rgba(35, 218, 172, 0.897);

    a {
        text-decoration: none;
        color:white;
        
        

        :hover {
            // color: rgb(14, 218, 14);
            color: white;
            
        }
    }
}

</style>