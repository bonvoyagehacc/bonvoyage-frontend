<template>
  <div class="header">
    <img class="logo" src="https://pixolo.us/logo.png" />
    <button class="navigation-button" v-on:click="navigateToUpload">Upload More</button>
    <button class="navigation-button" v-on:click="downloadAll">Download All Photos</button>
    <button class="navigation-button" v-on:click="logOutUser">Log Out</button>
  </div>
  <div class="grid" v-cloak>
    <div v-for="item in displaycontent" :key="item" class="displayitem">
      <img :src="item" class="displayimage"/>
    </div>
  </div>

</template>

<script>
import { fetchImages } from '/src/services/viewSorted.service'
import { saveAs } from 'file-saver';
import JSZip from 'jszip'
export default {
  methods: {
    preLoad: function() {
      if (this.$store.state.auth.loggedIn == false) { // redirect to log in page
        this.$router.push('/login');
      }
    },
    navigateToUpload: function() {
      this.$router.push('/');
    },
    fetchSortedImages: function() {
      var user_token = this.$store.state.auth.accessToken

      fetchImages(user_token).then(resp => {
        this.displaycontent = resp.image
        console.log("displaying", resp)
      }, err=> {
        console.log("error fetching images:", err)
      })
    },
    downloadAll: async function() {
      var zip = new JSZip();
      for (let i = 0; i < this.displaycontent.length; i++) {
        let img_url = this.displaycontent[i]
        let image_data = await this.getBase64FromUrl(img_url)
        image_data = image_data.split(",")[1]
        let image_name = img_url.split("/")[4]
        zip.file(image_name, image_data, { base64: true})
      }
      zip.generateAsync({type: "blob"}).then(function (content) {
        saveAs(content, `images.zip`);
      });
    },
    getBase64FromUrl: async function(url) {
      const data = await fetch(url);
      const blob = await data.blob();
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob); 
        reader.onloadend = () => {
          const base64data = reader.result;   
          resolve(base64data);
        }
      });
    },
    logOutUser: function() {
      this.$store.dispatch('auth/logout').then(resp => {
          console.log("logging out");
          this.$router.push('/login')
      }, err => {
          alert("Log out failed")
      }   
      )
    }
  },
  data() {
    return {
      displaycontent: []
    }
  },
  beforeMount(){
    this.preLoad()
    // fetch our data
    this.fetchSortedImages()
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
  background-color: whitesmoke;
  border: 1px solid gainsboro;
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

.navigation-button {
    float: right;
    height: 50%;
    margin: 0.25%;
    margin-top: 0.75%;
    border-radius: 0.25rem;
    border: 1px solid darkslategray;
    background-color: whitesmoke;
    color:darkslategray;
}

.navigation-button:hover {
    cursor: pointer;
    background-color: teal;
    border: 1px solid teal;
    color: snow;
}
</style>
