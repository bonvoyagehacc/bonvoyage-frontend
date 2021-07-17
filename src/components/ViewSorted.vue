<template>
  <div class="header">
    <img class="logo" src="src/assets/logo.png" />
    やなぎ
  </div>
  <div class="grid">
    <div v-for="item in displaycontent" :key="item" class="displayitem">
      <img :src="item"/>
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
      displaycontent: ["src/assets/temp1.png", "src/assets/temp2.png", "src/assets/temp3.png"]
    }
  },
  beforeMount(){
    this.preLoad()
  },
}
</script>

<style>
.header {
  background-color: coral;
}
.logo {
  height: 50px;
}
.grid {
  display: flex;
  flex-direction: row;
}
.displayitem {
  background-color: coral;
}
</style>