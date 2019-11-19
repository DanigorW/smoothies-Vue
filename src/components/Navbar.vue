<template>
  <div class="navbar">
      <nav class="nav-extended indigo darken-2">

          <div class="nav-content">
              <router-link :to="{name: 'index'}" >
                  <span class="nav-title">{{title.toUpperCase()}}</span>
              </router-link>

              <a href="" class="btn-floating btn-large halfway-fab waves-effect waves-light pink">
                  <router-link :to="{ name: 'Addsmoothie' }">
                      <i class="material-icons" >add</i>
                  </router-link>
              </a>
          </div>

      </nav>
  </div>
</template>

<script>
import db from './firebase/init';
export default {
    
    name:'Navbar',

    data(){
        return{
            title: 'Smoothies'
        }
    },

    methods: {
       
    }


}
</script>

<style>
    .navbar nav {
        padding: 0 3rem;
    }
</style>