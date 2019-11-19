<template>
    <div class="add-smoothie container">
        <h2 class="center-align indigo-text">Add new smoothie</h2>
        <form @submit.prevent="addSmoothie">
            <div class="field title">
                <label for="title">Smoothie title:</label>
                <input type="text" name="title" v-model="title">
            </div>

            <div style="position: relative" v-for="(ing, index) in ingredient" :key="index">
                    <label for="ingredient">ingredient</label>
                    <input class="indigo-text" type="text" name="ingredient" v-model="ingredient[index]">
                    <i class="material-icons deleteIng" @click="deleteIng(ing)">delete</i>
                </div>
            <div class="field add-ing">
                <label for="add-ing">Ad an ingredient, press TAB to add affter tyiping</label>
                
                <input type="text" name="add-ing" @keydown.tab.prevent="addIng" v-model="another">
            </div>

            <div class="field center-align">
                <p v-if="feedback" class="red-text">{{feedback}}</p>
                <button class="btn pink">Add smoothie</button>
            </div>
        </form>
    </div>
</template>

<script>
import db from './firebase/init'
import slugify from 'slugify'
export default {
    name:"Addsmoothie",


    data(){
        return{
            title: null,
            another: null,
            ingredient: [],
            feedback: null,
            slug: null
        }
    },

    methods: {
        addSmoothie(){
            if(this.title){
                this.feedback = null
                this.slug = slugify(this.title, {
                    replacement: '-',
                    remove: /[$*_+~()'"!\-:@]/g,
                    lower: true
                })

                
                db.collection("smoothies").add({
                   title:this.title,
                   ingredients: this.ingredient,
                   slug: this.slug    
                }).then(() => {
                    
                    this.$router.push({name : 'index'})
                })
                
            } else {
                this.feedback = 'you must enter smoothie title'
            }
        },

        addIng(){
            if(this.another){
                this.ingredient.push(this.another)
                this.another = null
                this.feedback = null
            } else {
                this.feedback = "you must enter value"
            }
        },

            deleteIng(ing){
                this.ingredient = this.ingredient.filter(item => {
                    return item !== ing
                })
            }
        
            
        
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