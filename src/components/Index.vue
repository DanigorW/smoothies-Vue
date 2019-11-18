<template>
  <div class="index container">
      <div class="card" v-for="smoothies in smoothies" :key="smoothies.id">
          <div class="card-content">
              <i class="material-icons delete" @click="deleteSmoothie(smoothies.id)"> delete</i>
              <h2 class="indigo-text">{{smoothies.title}}</h2>
              <ul class="ingredients">
                  <li class="chip" v-for="(ing, index) in smoothies.ingredients" :key="index">{{ing}}</li>
              </ul>
          </div>
      </div>
  </div>
</template>

<script>
import db from '../components/firebase/init';
export default {
 name: 'Index',

 data(){
     return{
         smoothies: []
     }
 },

 methods: {
     deleteSmoothie(el){
         db.collection('smoothies').doc(el).delete()
         .then(()=>{
             this.smoothies = this.smoothies.filter(item => {
                 return item.id !== el
             })
         })
         

    //   this.smoothies = this.smoothies.filter(item => {
    //       return item.id !== el
    //    })  
     }
 },
 created(){
     //data from firestorm
     db.collection("smoothies").get()
    .then(snapshot => {
        snapshot.forEach(doc => {
        let smoothie = doc.data()
        smoothie.id = doc.id
        this.smoothies.push(smoothie)
            
            
        })
        
    })
        
  
 }

}
</script>

<style>
    .index {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 30px;
        margin-top: 60px;
    }

    .index h2 {
        font-size: 3rem;
        text-align: center;
    }

    .index ul {
        margin: 30px auto;
    }

    .index .delete{
        position: absolute;
        top:10px;
        right: 10px;
        cursor: pointer;
        color: #aaa;
        font-size: 1.4rem
    }
</style>




