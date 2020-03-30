<template>
  <div id="single-food">

    <form id="add-food" v-if="!submitted">
      <div class="columns">
            <div class="column is-4 is-offset-4">
          
            <div id="food-label" class="field">
                <h1>{{ items.hints[0].food.label + '/' + inputGram + ' gram' }}</h1>
            </div>    
            <div class="field has-addons has-addons-centered">
                <p class="control">
                    <input v-model="inputGram" required @change="onChange()" class="input" placeholder="Ange gram"/>
                </p>
                
            </div>
                <div id="food-info" class="field">
              <h2>Näringsinformation</h2>
              </div>
              <div id="kcal-info" class="field">
                  <p>Kalorier: {{ items.hints[0].food.nutrients.ENERC_KCAL.toFixed(0) * inputGram/100}}</p>
                </div>
            
                <div v-if="input" class="field">
                    Protein: {{proteinPrecent.toFixed(0)}}%
                    <progress class="progress is-primary" :value="proteinPrecent" max="100">15%</progress>
                    Fett: {{fatPrecent.toFixed(0)}}%
                    <progress class="progress is-primary" :value="fatPrecent" max="100" >15%</progress>
                    Kolhydrater: {{carbsPrecent.toFixed(0)}}%
                    <progress class="progress is-primary" :value="carbsPrecent" max="100" >15%</progress>
                </div>
            
              
                
            
                <div v-if="!input" id="" class="field">    
                Protein: {{finalProteinPrecent.toFixed(0)}}%
                <progress v-if="!input" class="progress is-primary" :value="finalProteinPrecent" max="100" >15%</progress>
                Fett: {{finalFatPrecent.toFixed(0)}}%             
                <progress v-if="!input" class="progress is-primary" :value="finalFatPrecent" max="100">15%</progress>           
                Kolhydrater: {{finalCarbsPrecent.toFixed(0)}}%          
                <progress v-if="!input" class="progress is-primary" :value="finalCarbsPrecent" max="100">15%</progress>
            </div>
            <div id="rest-info" class="field">
                <p>Protein: {{ items.hints[0].food.nutrients.PROCNT.toFixed(0) * inputGram/100}}g</p>
                <p>Fett: {{ items.hints[0].food.nutrients.FAT.toFixed(0) * inputGram/100}}g</p>
                <p>Kolhydrater: {{ items.hints[0].food.nutrients.CHOCDF.toFixed(0) * inputGram/100}}g</p>
            </div>
            <div v-if="loggedIn" id ="meal-type" class="field">
                <h2>Typ av måltid</h2>
            </div>
            <div v-if="loggedIn" class="field">
                    <div class="select is-primary">
                    <select required v-model="typeOfMeals" >
                        <option>Frukost</option>
                        <option>Lunch</option>
                        <option>Middag</option>
                        <option>Mellanmål</option>
                    </select>
                    </div>
                </div>
            <div class="field">
                    <button v-if="loggedIn" v-on:click="removeBreakfast()" v-on:click.prevent="post(typeOfMeals)" class="button is-primary">Lägg till mat</button>
            </div>
        </div>
        </div>

        <div v-if="showcalc">
       <div class="col">
        <h1>{{items.hints[0].food.label + ' calculation/' + inputGram + ' GRAM'}}</h1>
        <input v-model="inputGram" @change="onChange()" />
        <span>Gram</span>
        <p v-if="!input">Kcal: {{items.hints[0].food.nutrients.ENERC_KCAL.toFixed(0) * inputGram/100}}g</p>
        <p v-if="!input">Protein: {{items.hints[0].food.nutrients.PROCNT.toFixed(0) * inputGram/100}}g</p>
        <p v-if="!input">Fat: {{items.hints[0].food.nutrients.FAT.toFixed(0) * inputGram/100}}g</p>
        <p v-if="!input">Carbs: {{items.hints[0].food.nutrients.CHOCDF.toFixed(0) * inputGram/100}}g</p>
        <p v-if="input">Kcal: {{calcFood.calcKcal.toFixed(0)}}g</p>
        <p v-if="input">Protein: {{calcFood.calcProtein.toFixed(0)}}g</p>
        <p v-if="input">Fat: {{calcFood.calcFat.toFixed(0)}}g</p>
        <p v-if="input">Carbs: {{calcFood.calcCarbs.toFixed(0)}}g</p>

     </div>
     </div>
    </form>
  

      
    <!-- <form v-if="!submitted">
        <div class="container">
            <div class="row">
                <div class="col">
      <h1>{{ items.hints[0].food.label + '/' + inputGram + 'GRAM' }}</h1>
      <input v-model="inputGram" @change="onChange()" /><span>gram</span>
      <p>Kcal: {{ items.hints[0].food.nutrients.ENERC_KCAL.toFixed(0) * inputGram/100}}</p>
      <p>Protein: {{ items.hints[0].food.nutrients.PROCNT.toFixed(0) * inputGram/100}}</p>
      <p>Fat: {{ items.hints[0].food.nutrients.FAT.toFixed(0) * inputGram/100}}</p>
      <p>Carbs: {{ items.hints[0].food.nutrients.CHOCDF.toFixed(0) * inputGram/100}}</p>
     
   <h2>Typ av måltid</h2>
      <select v-model="typeOfMeals" required>
        <option>Frukost</option>
        <option>Lunch</option>
        <option>Middag</option>
        <option>Mellanmål</option>
      </select>

      <button v-on:click="removeBreakfast()" v-on:click.prevent="post(typeOfMeals)">Lägg till mat</button>
</div>
        <div v-if="show-calc">
       <div class="col">
        <h1>{{items.hints[0].food.label + ' calculation/' + inputGram + ' GRAM'}}</h1>
        <input v-model="inputGram" @change="onChange()" />
        <span>Gram</span>
        <p v-if="!input">Kcal: {{items.hints[0].food.nutrients.ENERC_KCAL.toFixed(0) * inputGram/100}}</p>
        <p v-if="!input">Protein: {{items.hints[0].food.nutrients.PROCNT.toFixed(0) * inputGram/100}}</p>
        <p v-if="!input">Fat: {{items.hints[0].food.nutrients.FAT.toFixed(0) * inputGram/100}}</p>
        <p v-if="!input">Carbs: {{items.hints[0].food.nutrients.CHOCDF.toFixed(0) * inputGram/100}}</p>
        <p v-if="input">Kcal: {{calcFood.calcKcal.toFixed(0)}}</p>
        <p v-if="input">Protein: {{calcFood.calcProtein.toFixed(0)}}</p>
        <p v-if="input">Fat: {{calcFood.calcFat.toFixed(0)}}</p>
        <p v-if="input">Carbs: {{calcFood.calcCarbs.toFixed(0)}}</p>

     </div>
     </div>
     </div>
     </div>

    </form> -->
    <div id="food-added">
    <div v-if="submitted">
        <div class="field">
      <h3>Mat tillagd!</h3>
      </div>

        <div class="columns">
            <div class="column is-4 is-offset-4">
            <div class="field has-addons has-addons-centered">
                <div id="add-more" class="field">
                <router-link v-bind:to="'/food/'"><button class="button is-primary">Lägg till mer mat</button></router-link>
                </div>
                <div class="field">
                <router-link v-bind:to="'/myFood/'"><button class="button is-primary">Se min mat</button></router-link>
                </div>
                
                </div>
        </div>
        </div>
        </div>
        </div>
    </div>
  

</template>

<script>

import * as firebase from "firebase/app";
import "firebase/auth";
import { mapGetters } from "vuex";
// import TopHeader from '../components/Top-Header';


export default {
  data() {
    return {
      id: this.$route.params.id,
      blog: {},
      items: [],
      sum: 0,
      proteinPrecent: 0,
      fatPrecent: 0,
      carbsPrecent: 0,
      proteinPrecent1: 0,
      fatPrecent1: 0,
      carbsPrecent1: 0,
      typeOfMeal: {
        meal: ""
      },
      typeOfMeals: ["Breakfast", "Lunch", "Dinner", "Snack"],
      submitted: false,
      input: false,
      inputGram: 100,
      calcFood: {
           
            calcKcal: "",
            calcProtein: "",
            calcFat: "",
            calcCarbs: "",
      },
      calcFoods: [],
      activeItem: null,
      procentProtein: '',
      procentFat: '',
      procentCarbs: '',
      loggedIn: false,
      uid: this.uid,
      showcalc: false,
      

    };
  },
  methods: {
    

    removeBreakfast(doc) {      
           this.$http.delete('https://jocke-vue-api-auth.firebaseio.com/User/' + this.uid + '/food/Frukost/' + doc + '.json').then(function(data){
            //    location.reload();
               console.log(data);
           })
    },

    post: function(typeOfMeals) {
        

        if (this.items.hints[0].food.nutrients.ENERC_KCAL){
            if(!this.calcFood.calcKcal) {
                this.calcFood.calcKcal = 100
            } else {
                 this.items.hints[0].food.nutrients.ENERC_KCAL = this.calcFood.calcKcal
            }

            }
            if (this.items.hints[0].food.nutrients.PROCNT){
                if(!this.calcFood.calcProtein) {
                    this.calcFood.calcProtein = 100
                } else {
                this.items.hints[0].food.nutrients.PROCNT = this.calcFood.calcProtein
                }    
            }

            if (this.items.hints[0].food.nutrients.FAT){
                if(!this.calcFood.calcFat) {
                    this.calcFood.calcFat = 100
                } else {
                    this.items.hints[0].food.nutrients.FAT = this.calcFood.calcFat
                } 
            }

            if (this.items.hints[0].food.nutrients.CHOCDF){
                if(!this.calcFood.calcCarbs) {
                    this.calcFood.calcCarbs = 100
                } else {
                    this.items.hints[0].food.nutrients.CHOCDF = this.calcFood.calcCarbs
                }
            }

      this.$http
        .post(
          'https://jocke-vue-api-auth.firebaseio.com/User/' + this.uid + '/food/' + typeOfMeals + '.json',
          this.items
          
        ) 
        .then(function(data) {
          console.log(data);
          this.submitted = true;
        

        });
 

    },
    onChange() {
      var testtest = 0;
      testtest = this.items.hints[0].food.nutrients.ENERC_KCAL.toFixed(0) / 100;
      this.calcFood.calcKcal = testtest * this.inputGram;
      testtest = this.items.hints[0].food.nutrients.PROCNT.toFixed(0) / 100;
      this.calcFood.calcProtein = testtest * this.inputGram;
      testtest = this.items.hints[0].food.nutrients.FAT.toFixed(0) / 100;
      this.calcFood.calcFat = testtest * this.inputGram;
      testtest = this.items.hints[0].food.nutrients.CHOCDF.toFixed(0) / 100;
      this.calcFood.calcCarbs = testtest * this.inputGram;

      
      this.proteinPrecent = (this.proteinProcent / this.totalProcent) * 100;
      console.log(this.proteinPrecent);
      console.log(this.proteinProcent);
      console.log(this.totalProcent);
      this.fatPrecent = (this.fatProcent / this.totalProcent) * 100;   
      this.carbsPrecent = (this.carbsProcent / this.totalProcent) * 100;   
      
     
    

      this.input = true;

    }
    
  },

  created() {
    
    firebase.auth().onAuthStateChanged(user=> {
            if(user){
                this.loggedIn = true
                this.uid = user.uid;
            } else {
                this.loggedIn = false
            }
        }),


    this.$http
      .get(
        "https://api.edamam.com/api/food-database/parser?ingr=" +
          this.id +
          "&app_id=YOUR_OWN_APP_ID&app_key=YOUR_OWN_API_KEY"
      )
      .then(function(data) {
        if (!data.body.hints[0].food.nutrients.ENERC_KCAL) {
          data.body.hints[0].food.nutrients.ENERC_KCAL = 0;
        }
        if (!data.body.hints[0].food.nutrients.PROCNT) {
          data.body.hints[0].food.nutrients.PROCNT = 0;
        }
        if (!data.body.hints[0].food.nutrients.FAT) {
          console.log(data.body.hints[0].food.nutrients.FAT);
          data.body.hints[0].food.nutrients.FAT = 0;
        }
        if (!data.body.hints[0].food.nutrients.CHOCDF) {
          data.body.hints[0].food.nutrients.CHOCDF = 0;
        }
        this.items = data.body;
        // console.log(data.body);
      });

  },
  computed: {
      ...mapGetters({
      user: "user"
  }),
      proteinProcent: function(){
                let sum = 0;
                sum = this.calcFood.calcProtein * 17;
                return Math.round(sum);
      },
      fatProcent: function(){
          let sum = 0;
          sum = this.calcFood.calcFat * 17;
          return Math.round(sum);
      },
      carbsProcent: function(){
          let sum = 0;
          sum = this.calcFood.calcCarbs * 37;
          return Math.round(sum);
      },
      totalProcent: function(){
          let sum = 0;
          sum = this.proteinProcent + this.fatProcent + this.carbsProcent;
          return Math.round(sum);
      },
      proteinProcent1: function(){
          let sum = 0;
          sum = this.items.hints[0].food.nutrients.PROCNT.toFixed(0) * 17;
          return Math.round(sum);
      },
      fatProcent1: function(){
          let sum = 0;
          sum = this.items.hints[0].food.nutrients.FAT.toFixed(0) * 17;
          return Math.round(sum);
      },
      carbsProcent1: function(){
          let sum = 0;
          sum = this.items.hints[0].food.nutrients.CHOCDF.toFixed(0) * 37;
          return Math.round(sum);
      },
      totalProcent1: function(){
          let sum = 0;
          sum = this.proteinProcent1 + this.fatProcent1 + this.carbsProcent1;
          return Math.round(sum);
      },
      finalProteinPrecent: function(){
          let sum = 0;
          sum = this.proteinProcent1 / this.totalProcent1 * 100
          return Math.round(sum);
      },
      finalFatPrecent: function(){
          let sum = 0;
          sum = this.fatProcent1 / this.totalProcent1 * 100
          return Math.round(sum);
      },
      finalCarbsPrecent: function(){
          let sum = 0;
          sum = this.carbsProcent1 / this.totalProcent1 * 100
          return Math.round(sum);
      },
      
      
  }
  
};
</script>

<style lang="scss">

#single-food{
    min-height: 80.1vh;
    margin-top: 101px;
}
#food-added{
    text-decoration: none;
    font-size: 25px;
    padding: 20px;
    margin: 20px 0;
    box-sizing: border-box;
    // max-height: 20.1vh;
    // background: rgba(17, 212, 219, 0.438);

    a {
        text-decoration: none;
        color:rgba(19, 179, 19, 0.575);
    }
}
#add-more{
    margin-right: 5px;
}
#food-label{
    font-size: 30px;
}
#food-info{
    margin-top: 40px;
    font-size: 25px;
}
#kcal-info{
    margin-bottom: 30px;
    font-size: 20px;
}
#rest-info{
    margin-top: 40px;
    font-size: 20px;
}
#meal-type{
    margin-top: 50px;
    font-size: 25px;
    // border: 2px dotted rgba(17, 212, 219, 0.747);
    // border-style: solid;
    // border-radius: 10px;
}

</style>