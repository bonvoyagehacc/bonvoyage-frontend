<template>
  <div class="header">
    <img class="logo" src="src/assets/logo.png" />
    <button class="navphotos">Upload Photos</button>
  </div>
  <div class="grid">
    <div v-for="item in displaycontent" :key="item" class="displayitem">
      <img :src="item" class="displayimage"/>
    </div>
  </div>

</template>

<script>
// MUST ADD LOGIN CHECK
export default {
  methods: {
    preLoad: function() {
      if (this.$store.state.auth.loggedIn == false) { // redirect to log in page
        this.$router.push('/login');
      }
    },
  },
  data() {
    return {
      displaycontent: ["src/assets/temp1.png", "src/assets/temp2.png", "src/assets/temp3.png", "src/assets/temp4.jpg", "src/assets/temp4.jpg", "src/assets/temp4.jpg", "src/assets/temp4.jpg", "src/assets/temp4.jpg", "src/assets/temp4.jpg", "src/assets/temp4.jpg", "src/assets/temp4.jpg"]
    }
  },
  beforeMount(){
    this.preLoad()
  },
}
</script>

<style>
.logo {
  margin-left: 1rem;
  margin-top: 0.25rem;
}

.header {
    height: 3rem;
    font-size: 2rem;
}
.grid {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.displayitem {
  background-color: coral;
  height: 12rem;
  width: 12rem;
  margin: 1rem;
  display: flex;
}
.displayimage {
  object-fit: contain;
  width: 12rem;
  height: 12rem;
  margin: auto;
}
</style>