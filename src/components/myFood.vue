<template>

      <div id="my-food">
          
              
          <div id="food-display">
              <div class="container">
                  <div class="columns">

     
              <div class="column is-half">
                  <div class="field">
              <h2>Max</h2>
              </div>
               <div class="field">
              <p>Kalorier: {{foodSettings[0].kcal}}</p>
              <p>Protein: {{foodSettings[0].protein}}g</p>
              <p>Fett: {{foodSettings[0].fat}}g</p>
              <p>Kolhydrater: {{foodSettings[0].carbs}}g</p>
              </div>
              </div>
        
              
           
               <div class="column">
                   <div class="field">
              <h2>Ätit</h2>
              </div>
              <div class="field">
              <p>Kalorier: {{totalKcal.toFixed(0)}}</p>
              <p>Protein: {{totalProtein.toFixed(0)}}g</p>
              <p>Fett: {{totalFat.toFixed(0)}}g</p>
              <p>Kolhydrater: {{totalCarbs.toFixed(0)}}g</p>
         
              </div>
              </div>
                </div>
                </div>
                </div>

                <div id="missing-display">
            
              <div class="column">
                  <div class="field">
              <h2>Saknas</h2>
              </div>
              <div class="field">
                  <h3>Kalorier</h3>
                  <progress v-if="totalKcal < foodSettings[0].kcal" class="progress is-success" :value="totalKcal" :max="foodSettings[0].kcal">15%</progress>
                  <progress v-else class="progress is-warning" :value="missingKcal" :max="totalKcal" >15%</progress>
                  <div id="missing-text" class="field">
                    <p v-if="totalKcal < foodSettings[0].kcal">Kalorier: {{missingKcal.toFixed(0)}} kvar</p>
                    <p v-else style="color:red;">Kalorier: {{missingKcal.toFixed(0)}}g över</p>
                    </div>
                    <h3>Protein</h3>
                  <progress v-if="totalProtein < foodSettings[0].protein" class="progress is-success" :value="totalProtein" :max="foodSettings[0].protein" >15%</progress>
                  <progress v-else class="progress is-warning" :value="missingProtein" :max="totalProtein" >15%</progress>
                  <div id="missing-text" class="field">
                    <p v-if="totalProtein < foodSettings[0].protein">Protein: {{missingProtein.toFixed(0)}}g kvar</p>       
                    <p v-else style="color:red;">Protein: {{missingProtein.toFixed(0)}}g över</p>
                    </div>
                    <h3>Fett</h3>
                  <progress v-if="totalFat < foodSettings[0].fat" class="progress is-success" :value="totalFat" :max="foodSettings[0].fat" >15%</progress>
                  <progress v-else class="progress is-warning" :value="missingFat" :max="totalFat" >15%</progress>
                  <div id="missing-text" class="field">
                    <p v-if="totalFat < foodSettings[0].fat">Fett: {{missingFat.toFixed(0)}}g kvar</p>       
                    <p v-else style="color:red;">Fett: {{missingFat.toFixed(0)}}g över</p>
                    </div>
                    <h3>Kolhydrater</h3>
                  <progress v-if="totalCarbs < foodSettings[0].carbs" class="progress is-success" :value="totalCarbs" :max="foodSettings[0].carbs" >15%</progress>
                  <progress v-else class="progress is-warning" :value="missingCarbs" :max="totalCarbs" >15%</progress>
                  <div id="missing-text" class="field">
                    <p v-if="totalCarbs < foodSettings[0].carbs">Kolhydrater: {{missingCarbs.toFixed(0)}}g kvar</p>
                    <p v-else style="color:red;">Kolhydrater: {{missingCarbs.toFixed(0)}}g över</p>
                    </div>
              </div>
              </div>
              </div>
              
              
              
              

       
              <!-- <did id="my-food">   -->
         
                    <div id="header" class="field">
                  <h1>Frukost</h1>
              </div>          
              <div id="breakfast">
                  <div id="display-food" class="field" v-for="item in itemsBreakfast" :key="item.label" >                 
              <h2>{{item.hints[0].food.label}}</h2>
              <div class="field">
              <p>Kalorier: {{ item.hints[0].food.nutrients.ENERC_KCAL.toFixed(0)}}</p>
              <p>Protein: {{ item.hints[0].food.nutrients.PROCNT.toFixed(0) }}g</p>
              </div>
              <router-link v-bind:to="'/food/' + item.hints[0].food.foodId"><button v-on:click="removeBreakfast(item.id)" class="button is-primary" style="margin-right:5px">Ändra</button></router-link>             
              <button v-on:click="removeBreakfast(item.id)" class="button is-primary">Ta bort mat</button>
              </div>         
              <div class="field">
                  <router-link v-bind:to="'/food/'"><button class="button is-primary">Lägg till mat</button></router-link>
                   </div>
                </div>

                <div id="header" class="field">
                  <h1>Lunch</h1>
                  </div> 
              <div id="lunch">              
                  <div id="display-food" class="field" v-for="item in itemsLunch" :key="item.label">
              <h2>{{item.hints[0].food.label}}</h2>
              <div class="field">
              <p>Kalorier: {{ item.hints[0].food.nutrients.ENERC_KCAL.toFixed(0) }}</p>
              <p>Protein: {{ item.hints[0].food.nutrients.PROCNT.toFixed(0) }}g</p>
              </div>
              <router-link v-bind:to="'/food/' + item.hints[0].food.foodId"><button v-on:click="removeLunch(item.id)" class="button is-primary" style="margin-right:5px">Ändra</button></router-link>
              <button v-on:click="removeLunch(item.id)" class="button is-primary">Ta bort mat</button>
                </div>
                <div class="field">
                    <router-link v-bind:to="'/food/'"><button class="button is-primary">Lägg till mat</button></router-link>
                    </div>
              </div>

                <div id="header" class="field">
                  <h1>Middag</h1>
                    </div>
              <div id="dinner">                
                  <div id="display-food" class="field" v-for="item in itemsDinner" :key="item.label">
              <h2>{{item.hints[0].food.label}}</h2>
              <div class="field">
              <p>Kalorier: {{ item.hints[0].food.nutrients.ENERC_KCAL.toFixed(0) }}</p>
              <p>Protein: {{ item.hints[0].food.nutrients.PROCNT.toFixed(0) }}g</p>
              </div>
              <router-link v-bind:to="'/food/' + item.hints[0].food.foodId"><button v-on:click="removeDinner(item.id)" class="button is-primary" style="margin-right:5px">Ändra</button></router-link>
              <button v-on:click="removeDinner(item.id)" class="button is-primary">Ta bort mat</button>
                </div> 
                <div class="field">   
                    <router-link v-bind:to="'/food/'"><button class="button is-primary">Lägg till mat</button></router-link>
                    </div> 
              </div>

                <div id="header" class="field">
                    <h1>Mellanmål</h1>
                    </div>
              <div id="snack">
                  
                  <div id="display-food" class="field" v-for="item in itemsSnack" :key="item.label">
              <h2>{{item.hints[0].food.label}}</h2>
              <div class="field">
              <p>Kalorier: {{ item.hints[0].food.nutrients.ENERC_KCAL.toFixed(0) }}</p>
              <p>Protein: {{ item.hints[0].food.nutrients.PROCNT.toFixed(0) }}g</p>
              </div>
              <router-link v-bind:to="'/food/' + item.hints[0].food.foodId"><button v-on:click="removeSnack(item.id)" class="button is-primary" style="margin-right:5px">Ändra</button></router-link>
              <button v-on:click="removeSnack(item.id)" class="button is-primary">Ta bort mat</button>
                </div>
                <div class="field"> 
                    <router-link v-bind:to="'/food/'"><button class="button is-primary">Lägg till mat</button></router-link>
                    </div>
              </div>

              
                <!-- Tried making edit window slidedown/popup -->
              <!-- <div id="Edit-window" v-if="!visible">    
                   <input v-model="inputGram" required @change="onChange()" />
                   <span>gram</span>
                  

                    <p>Kcal:  {{itemsBreakfast[0].hints[0].food.nutrients.ENERC_KCAL.toFixed(0)}}</p>
                    <p>Kcal:  {{calcFood.calcKcal}}</p>
                    <p >Protein:{{calcFood.calcProtein}} </p>
                    <p >Fat: {{calcFood.calcFat}}</p>
                    <p >Carbs: {{calcFood.calcCarbs}}</p>
                    <h2>Select type of meal</h2>
                        <select v-model="typeOfMeals" required>
                            <option>Breakfast</option>
                            <option>Lunch</option>
                            <option>Dinner</option>
                            <option>Snack</option>
                        </select>

                   <button v-on:click="removeBreakfast(itemsBreakfast[0].id)" v-on:click.prevent="post(typeOfMeals)">Update</button>
                   <button v-on:click="closeEdit()">Close</button>
                   </div> -->
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
        sum: 0,
        sum1: 0,
        selected: '',
        id: this.$route.params.id,
        items:[],
        itemsBreakfast: [],
        itemsLunch: [],
        itemsDinner: [],
        itemsSnack: [],
        foodSettings: [],
        calcFood: {
            calcKcal: '',
            calcProtein: '',
            calcFat: '',
            calcCarbs: '',
        },
        progressValue: 30,
        progressMax: 100,
        typeOfMeals: ["Breakfast", "Lunch", "Dinner", "Snack"],
        calcFoods: [],
        maxKcal: 2000,
        maxProtein: 200,
        maxFat: 50,
        maxCarbs: 150,
        foodSetting: {
            kcal: '',
            protein: '',
            fat: '',
            carbs: '',
        },
        inputGram: '',
        input: false,
        visible: true,
        editId: '',
        search: '',
        searchFood: '',    
        uid: this.uid,
    }

    
  },
  methods: {

      showEdit(doc) {
      
          this.visible = false
          console.log(doc);
          
      },
      closeEdit() {
          this.visible = true
      },

    
    removeBreakfast(doc) {
        
        
           this.$http.delete('https://jocke-vue-api-auth.firebaseio.com/User/' + this.uid + '/food/Frukost/' + doc + '.json').then(function(data){
               location.reload();
               console.log(data);
           })       
    },
    removeLunch(doc) {
        this.$http.delete('https://jocke-vue-api-auth.firebaseio.com/User/' + this.uid + '/food/Lunch/' + doc + '.json').then(function(data){
            location.reload();
            console.log(data);
        })
        // if(confirm('are you sure?')) {
        // }else {
        //     return;
        // }
    },
    removeDinner(doc) {
           this.$http.delete('https://jocke-vue-api-auth.firebaseio.com/User/' + this.uid + '/food/Middag/' + doc + '.json').then(function(data){
               location.reload();
               console.log(data);
           })    
    },
    removeSnack(doc) {
           this.$http.delete('https://jocke-vue-api-auth.firebaseio.com/User/' + this.uid + '/food/Mellanmål/' + doc + '.json').then(function(data){
               location.reload();
               console.log(data);
           })
    },

  onChange() {

    


      var testtest = 0;
      testtest = this.itemsBreakfast[0].hints[0].food.nutrients.ENERC_KCAL.toFixed(0) / 100;
      this.calcFood.calcKcal = testtest * this.inputGram;
      testtest = this.itemsBreakfast[0].hints[0].food.nutrients.PROCNT.toFixed(0) / 100;
      this.calcFood.calcProtein = testtest * this.inputGram;
      testtest = this.itemsBreakfast[0].hints[0].food.nutrients.FAT.toFixed(0) / 100;
      this.calcFood.calcFat = testtest * this.inputGram;
      testtest = this.itemsBreakfast[0].hints[0].food.nutrients.CHOCDF.toFixed(0) / 100;
      this.calcFood.calcCarbs = testtest * this.inputGram;

        
      this.input = true;
        // console.log(data.body);


  },

    ...mapGetters({
      user: "user"
    }),

  },
  created() {

        firebase.auth().onAuthStateChanged(user=> {
            if(user){
                console.log(user.uid)
                this.loggedIn = true
                this.uid = user.uid;

                 this.$http.get('https://jocke-vue-api-auth.firebaseio.com/User/' + this.uid + '/nutrition.json').then(function(data){
        // console.log(data);
          return data.json();
                 }).then(function(data){
        var itemsArray = []
        // console.log(data);
        for(let key in data){
            // console.log(data[key]);
            data[key].id = key
            itemsArray.push(data[key]);
        }
        // console.log(itemsArray);
        this.foodSettings = itemsArray;

    })

            } else {
                this.loggedIn = false
            }
        })


    
    
      firebase.auth().onAuthStateChanged(user=> {
            if(user){
                console.log(user.uid)
                this.loggedIn = true
                this.uid = user.uid;
                this.$http.get('https://jocke-vue-api-auth.firebaseio.com/User/' + this.uid + '/food/Frukost.json').then(function(data){
        console.log(data);
          return data.json();
    }).then(function(data){
        var itemsArray = []
        // console.log(data);
        for(let key in data){
            // console.log(data[key]);
            data[key].id = key
            itemsArray.push(data[key]);
            
        }
        for(let carbs in data){
            if(!data[carbs].hints[0].food.nutrients.CHOCDF){

                // console.log(data[carbs])
                data[carbs].hints[0].food.nutrients.CHOCDF = 0
            } 
        }
        for(let fat in data) {
            if(!data[fat].hints[0].food.nutrients.FAT){
                data[fat].hints[0].food.nutrients.FAT = 0
            }
        }
        for(let kcal in data) {
            if(!data[kcal].hints[0].food.nutrients.ENERC_KCAL){
                data[kcal].hints[0].food.nutrients.ENERC_KCAL = 0
            }
            
        }
        for(let protein in data) {
            if(!data[protein].hints[0].food.nutrients.PROCNT){
                data[protein].hints[0].food.nutrients.PROCNT = 0
            }
        }
        // console.log(itemsArray);
        
        this.itemsBreakfast = itemsArray;

    })
            } else {
                this.loggedIn = false
            }
        }),


        firebase.auth().onAuthStateChanged(user=> {
            if(user){
                console.log(user.uid)
                this.loggedIn = true
                this.uid = user.uid;
                this.$http.get('https://jocke-vue-api-auth.firebaseio.com/User/' + this.uid + '/food/Lunch.json').then(function(data){
        console.log(data);
          return data.json();
    }).then(function(data){
        var itemsArray = []
        // console.log(data);
        for(let key in data){
            // console.log(data[key]);
            data[key].id = key
            itemsArray.push(data[key]);
            
        }
        for(let carbs in data){
            if(!data[carbs].hints[0].food.nutrients.CHOCDF){

                // console.log(data[carbs])
                data[carbs].hints[0].food.nutrients.CHOCDF = 0
            }
        }
        for(let fat in data) {
            if(!data[fat].hints[0].food.nutrients.FAT){
                data[fat].hints[0].food.nutrients.FAT = 0
            }
        }
        for(let kcal in data) {
            if(!data[kcal].hints[0].food.nutrients.ENERC_KCAL){
                data[kcal].hints[0].food.nutrients.ENERC_KCAL = 0
            }
        }
        for(let protein in data) {
            if(!data[protein].hints[0].food.nutrients.PROCNT){
                data[protein].hints[0].food.nutrients.PROCNT = 0
            }
        }
        // console.log(itemsArray);
        
        this.itemsLunch = itemsArray;
    })
            } else {
                this.loggedIn = false
            }
        }),


    firebase.auth().onAuthStateChanged(user=> {
            if(user){
                console.log(user.uid)
                this.loggedIn = true
                this.uid = user.uid;
                this.$http.get('https://jocke-vue-api-auth.firebaseio.com/User/' + this.uid + '/food/Middag.json').then(function(data){
        //console.log(data);
          return data.json();
    }).then(function(data){
        var itemsArray = []
        //console.log(data);
        for(let key in data){
            //console.log(data[key]);
            data[key].id = key
            itemsArray.push(data[key]);
            
        }
        for(let carbs in data){
            if(!data[carbs].hints[0].food.nutrients.CHOCDF){

                // console.log(data[carbs])
                data[carbs].hints[0].food.nutrients.CHOCDF = 0
            }
        }
        for(let fat in data) {
            if(!data[fat].hints[0].food.nutrients.FAT){
                data[fat].hints[0].food.nutrients.FAT = 0
            }
        }
        for(let kcal in data) {
            if(!data[kcal].hints[0].food.nutrients.ENERC_KCAL){
                data[kcal].hints[0].food.nutrients.ENERC_KCAL = 0
            }
        }
        for(let protein in data) {
            if(!data[protein].hints[0].food.nutrients.PROCNT){
                data[protein].hints[0].food.nutrients.PROCNT = 0
            }
        }
        //console.log(itemsArray);
        
        this.itemsDinner = itemsArray;
    })
            } else {
                this.loggedIn = false
            }
        }),


        firebase.auth().onAuthStateChanged(user=> {
            if(user){
                console.log(user.uid)
                this.loggedIn = true
                this.uid = user.uid;
                this.$http.get('https://jocke-vue-api-auth.firebaseio.com/User/' + this.uid + '/food/Mellanmål.json').then(function(data){
        // console.log(data);
          return data.json();
    }).then(function(data){
        var itemsArray = []
        //console.log(data);
        for(let key in data){
            //console.log(data[key]);
            data[key].id = key
            itemsArray.push(data[key]);
            
        }
        for(let carbs in data){
            if(!data[carbs].hints[0].food.nutrients.CHOCDF){

                // console.log(data[carbs])
                data[carbs].hints[0].food.nutrients.CHOCDF = 0
            }
        }
        for(let fat in data) {
            if(!data[fat].hints[0].food.nutrients.FAT){
                data[fat].hints[0].food.nutrients.FAT = 0
            }
        }
        for(let kcal in data) {
            if(!data[kcal].hints[0].food.nutrients.ENERC_KCAL){
                data[kcal].hints[0].food.nutrients.ENERC_KCAL = 0
            }
        }
        for(let protein in data) {
            if(!data[protein].hints[0].food.nutrients.PROCNT){
                data[protein].hints[0].food.nutrients.PROCNT = 0
            }
        }
        //console.log(itemsArray);
        
        this.itemsSnack = itemsArray;
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
        
        totalKcal: function() {
            let sum = 0;
            this.itemsBreakfast.forEach(function(item) {
                sum += (parseFloat(item.hints[0].food.nutrients.ENERC_KCAL));
            });
            this.itemsLunch.forEach(function(item) {
                sum += (parseFloat(item.hints[0].food.nutrients.ENERC_KCAL));
            });
            this.itemsDinner.forEach(function(item) {
                sum += (parseFloat(item.hints[0].food.nutrients.ENERC_KCAL));
            });
            this.itemsSnack.forEach(function(item) {
                sum += (parseFloat(item.hints[0].food.nutrients.ENERC_KCAL));
            });
            return sum;
        },
        missingKcal: function() {
             let sum = this.foodSettings[0].kcal;
            this.itemsBreakfast.forEach(function(item) {
                sum -= (parseFloat(item.hints[0].food.nutrients.ENERC_KCAL)); 
            });
            this.itemsLunch.forEach(function(item) {
                sum -= (parseFloat(item.hints[0].food.nutrients.ENERC_KCAL)); 
            });
            this.itemsDinner.forEach(function(item) {
                sum -= (parseFloat(item.hints[0].food.nutrients.ENERC_KCAL)); 
            });
            this.itemsSnack.forEach(function(item) {
                sum -= (parseFloat(item.hints[0].food.nutrients.ENERC_KCAL)); 
            });
            return Math.abs(sum);
        },
        totalProtein: function() {
            let sum = 0;
            this.itemsBreakfast.forEach(function(item) {
                sum += (parseFloat(item.hints[0].food.nutrients.PROCNT));
            });
            this.itemsLunch.forEach(function(item) {
                sum += (parseFloat(item.hints[0].food.nutrients.PROCNT));
            });
            this.itemsDinner.forEach(function(item) {
                sum += (parseFloat(item.hints[0].food.nutrients.PROCNT));
            });
            this.itemsSnack.forEach(function(item) {
                sum += (parseFloat(item.hints[0].food.nutrients.PROCNT));
            });
            return sum;
        },
        missingProtein: function() {
             let sum = this.foodSettings[0].protein;
            this.itemsBreakfast.forEach(function(item) {
                sum -= (parseFloat(item.hints[0].food.nutrients.PROCNT)); 
            });
            this.itemsLunch.forEach(function(item) {
                sum -= (parseFloat(item.hints[0].food.nutrients.PROCNT)); 
            });
            this.itemsDinner.forEach(function(item) {
                sum -= (parseFloat(item.hints[0].food.nutrients.PROCNT)); 
            });
            this.itemsSnack.forEach(function(item) {
                sum -= (parseFloat(item.hints[0].food.nutrients.PROCNT)); 
            });
            return Math.abs(sum);
        },
        totalFat: function() {
            let sum = 0;
            this.itemsBreakfast.forEach(function(item) {
                sum += (parseFloat(item.hints[0].food.nutrients.FAT));   
            });
            this.itemsLunch.forEach(function(item) {
                sum += (parseFloat(item.hints[0].food.nutrients.FAT));   
            });
            this.itemsDinner.forEach(function(item) {
                sum += (parseFloat(item.hints[0].food.nutrients.FAT));   
            });
            this.itemsSnack.forEach(function(item) {
                sum += (parseFloat(item.hints[0].food.nutrients.FAT));   
            });
            return sum;
        },
        
        missingFat: function() {
             let sum = this.foodSettings[0].fat;
            this.itemsBreakfast.forEach(function(item) {
                sum -= (parseFloat(item.hints[0].food.nutrients.FAT)); 
            });
            this.itemsLunch.forEach(function(item) {
                sum -= (parseFloat(item.hints[0].food.nutrients.FAT)); 
            });
            this.itemsDinner.forEach(function(item) {
                sum -= (parseFloat(item.hints[0].food.nutrients.FAT)); 
            });
            this.itemsSnack.forEach(function(item) {
                sum -= (parseFloat(item.hints[0].food.nutrients.FAT)); 
            });
            return Math.abs(sum);
        },
        totalCarbs: function() {
            let sum = 0;
            this.itemsBreakfast.forEach(function(item) {
                sum += (parseFloat(item.hints[0].food.nutrients.CHOCDF));
            });
            this.itemsLunch.forEach(function(item) {
                sum += (parseFloat(item.hints[0].food.nutrients.CHOCDF));
            });
            this.itemsDinner.forEach(function(item) {
                sum += (parseFloat(item.hints[0].food.nutrients.CHOCDF));
            });
            this.itemsSnack.forEach(function(item) {
                sum += (parseFloat(item.hints[0].food.nutrients.CHOCDF));
            });
            return sum;
        },
        missingCarbs: function() {
             let sum = this.foodSettings[0].carbs;
            this.itemsBreakfast.forEach(function(item) {
                sum -= (parseFloat(item.hints[0].food.nutrients.CHOCDF)); 
            });
            this.itemsLunch.forEach(function(item) {
                sum -= (parseFloat(item.hints[0].food.nutrients.CHOCDF)); 
            });
            this.itemsDinner.forEach(function(item) {
                sum -= (parseFloat(item.hints[0].food.nutrients.CHOCDF)); 
            });
            this.itemsSnack.forEach(function(item) {
                sum -= (parseFloat(item.hints[0].food.nutrients.CHOCDF)); 
            });
            return Math.abs(sum);
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
#food-display{
    padding: 15px 0px;
    // padding-top: 30px;
    border: 2px dotted rgba(17, 212, 219, 0.747);
    border-style: solid;
    border-radius: 10px;
    
    h2{
    font-size: 30px;
    font-weight: 500;
    }
    
}

#missing-display{
    margin-top: 10px;
    padding: 15px 100px;
    border: 2px dotted rgba(17, 212, 219, 0.747);
    border-style: solid;
    border-radius: 10px;

    h2{
    font-size: 30px;
    font-weight: 500;
    }
    p{
        font-weight: 500;
    }
    h3{
        font-size: 20px;
        font-weight: 500;
    }
}
#missing-text{
    margin-top: -20px;
}

#my-food *{
    box-sizing: border-box;
    // min-height: 81.2vh;
}
#my-food{
    // margin: 20px auto;
    margin: 100px auto 50px;
    max-width: 500px;
    min-height: 81.2vh;
}
#breakfast, #lunch, #dinner, #snack{
    
    // margin: 20px 0px;
    margin: 20px 0px 0px 0px;
    padding: 10px 20px;
    // padding: 10px 20px 0px 20px;
    
        
            h2{
                font-size: 30px;
            }
}
#header {
    h1{
        margin: 20px 0px;
        // margin-top: 30px;
        font-size: 40px;
    }
        h1:after {
        content: ' ';
        position: absolute;
        left: 50%;
        width: 70px;
        border: 2px solid rgba(17, 212, 219, 0.747);
        border-radius: 4px;
        // border-radius: 10px;
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, .05);
        transform: translate(-50%, 1350%);
}
}
#display-food {
     border: 2px solid rgba(17, 212, 219, 0.747);
     border-radius: 10px;
     padding: 15px 0px;
     a {
         text-decoration: none;
     }
}
.field a{
    text-decoration: none;
}

</style>