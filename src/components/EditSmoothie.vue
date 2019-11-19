<template>
  <div v-if="smoothie" class="edit-smoothie container">
      <h2>Edit {{smoothie.title}}</h2>

          <form @submit.prevent="editSmoothie">
            <div class="field title">
                <label for="title">Smoothie title:</label>
                <input type="text" name="title" v-model="smoothie.title">
            </div>

            <div style="position: relative" v-for="(ing, index) in smoothie.ingredients" :key="index">
                    <label for="ingredient">ingredient</label>
                    <input class="indigo-text" type="text" name="ingredient" v-model="smoothie.ingredients[index]">
                    <i class="material-icons deleteIng" @click="deleteIng(ing)">delete</i>
                </div>
            <div class="field add-ing">
                <label for="add-ing">Ad an ingredient, press TAB to add affter tyiping</label>
                
                <input type="text" name="add-ing" @keydown.tab.prevent="addIng" v-model="another">
            </div>

            <div class="field center-align">
                <p v-if="feedback" class="red-text">{{feedback}}</p>
                <button class="btn pink">Update smoothie</button>
            </div>
        </form>
  </div>
</template>

<script>
import db from './firebase/init'
import slugify from 'slugify'
export default {
    name: 'EditSmoothie',

    data(){
        return {
            smoothie: null,
            another: null,
            feedback: null
        }
    },

    methods: {

        editSmoothie() {
             if(this.smoothie.title){
                this.feedback = null
                this.smoothie.slug = slugify(this.smoothie.title, {
                    replacement: '-',
                    remove: /[$*_+~()'"!\-:@]/g,
                    lower: true
                })

                
                db.collection("smoothies").doc(this.smoothie.id).update({
                   title:this.smoothie.title,
                   ingredients: this.smoothie.ingredients,
                   slug: this.smoothie.slug    
                }).then(() => {
                    
                    this.$router.push({name : 'index'})
                })
                
            } else {
                this.feedback = 'you must enter smoothie title'
            }
        },
                addIng(){
            if(this.another){
                this.smoothie.ingredients.push(this.another)
                this.another = null
                this.feedback = null
            } else {
                this.feedback = "you must enter value"
            }
        },

            deleteIng(ing){
                this.smoothie.ingredients = this.smoothie.ingredients.filter(item => {
                    return item !== ing
                })
            }
    },

    created(){
        let ref = db.collection('smoothies').where("slug", '==', this.$route.params.smoothie_slug)
        ref.get().then(snapshot => {
            snapshot.forEach(doc => {
                this.smoothie = doc.data()
                this.smoothie.id = doc.id
            })
        })
    }

}
</script>

<style>
.add-smoothie {
        margin-top: 60px;
        padding: 20px;
        max-width: 500px;
    }

    .add-smoothie h2 {
        margin: 5rem auto;
    }

    .add-smoothie button {
        margin: 2rem auto;
    }

    .deleteIng {
        cursor: pointer;
        position: absolute;
        right: 0;
        bottom: 16px
        
    }
</style>