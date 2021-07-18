<template>
    <div class="header">
        <img class="logo" src="https://pixolo.us/logo.png" />
        <button class="navigation-button" v-on:click="navigateToSorted">View Photos</button>
        <button class="navigation-button" v-on:click="logOutUser">Log Out</button>
    </div>
    <div class="body">
        <!--List of images added-->
        <table class="uploaded-photo-table" v-cloak @drop.prevent="dragAndDroppedPhotos" @dragover.prevent>
            <thead class="table-header">
                <th>File Name</th>
                <th></th>
            </thead>
            <tbody>
                <!--Show a filler box if there are no photos uploaded-->
                <tr v-if="uploadedPhotos.length == 0" class="photo-entry">
                    <td>No photos added ...</td>
                    <td></td>
                </tr>
                <tr v-for="photo in uploadedPhotos" :key="photo" v-cloak class="photo-entry">
                <td class="photo-name" v-on:click="togglePreview(photo)">{{photo.name}}</td>
                <td><button class="photo-remove" v-on:click="removePhotoFromList(photo)">X</button></td>
                </tr>
            </tbody>
        </table>
        <div class="boxes-and-buttons">
            <!--Preview Section-->
            <button class="preview-image-box" disabled v-cloak>
                <span v-if="!previewingImage">Image Preview</span>
                <img class="preview-image" v-if="previewingImage" :src="imageBeingPreviewed.data"/>
            </button>
            <!--Drag and Drop section-->
            <button class="drag-and-drop-box" disabled v-cloak @drop.prevent="dragAndDroppedPhotos" @dragover.prevent>
                <input class="input-images" id="selectedFile" style="display: none;" 
                type="file" accept="image/*" @change="fileExplorerPhotos" multiple/>
                <input class="input-images" type="button" value="Drag and Drop or Upload Images" 
                onclick="document.getElementById('selectedFile').click();" />
            </button>
            <button class="submit-button" v-on:click="submitPhotos">Upload and Analyze</button>
        </div>
    </div>
    
</template>

<script>
import JSZip from 'jszip'
import { sendZippedImages } from '/src/services/photoUpload.service'
export default {
    methods: {
        preLoad: function() {
            if (this.$store.state.auth.loggedIn == false) { // redirect to log in page
                this.$router.push('/login');
            }
        },
        submitPhotos: function() {
            var zip = new JSZip();
            // create a jszip instance
            // compress all photos to a zip folder before sending
            for (let i = 0; i < this.uploadedPhotos.length; i++) {
                let image_dict = this.uploadedPhotos[i]
                let image_type = image_dict.data.split(",")[0];
                let image_data = image_dict.data.split(",")[1];
                let image_name = image_dict.name;
                zip.file(image_name, image_data, { base64: true})
            }

            var user_token = this.$store.state.auth.accessToken
            
            zip.generateAsync({type:"arraybuffer"}).then(function(content) {
                
                console.log("content:", content)
                sendZippedImages(content, user_token).then(resp =>{
                    console.log("Success!" + resp)
                    alert("Successfully analysed! You can now view your photos!")
                }, err => {
                    console.log("Something failed," + err)
                })
            });
        },
        removePhotoFromList: function(photo) {
            // removes photo from uploaded photos
            let removedPhoto = this.uploadedPhotos.splice(this.uploadedPhotos.indexOf(photo), 1)

            if (removedPhoto[0].data == this.imageBeingPreviewed.data) {
                this.imageBeingPreviewed = null;
                this.previewingImage = false;
            }
        },
        dragAndDroppedPhotos: function(event) { // for photos inputted via drag and drop
            let photos = [...event.dataTransfer.files];
            // only images allowed
            photos = photos.filter(photo => photo.type.indexOf('image/') >= 0)
            this.processPhotos(photos)
        },
        fileExplorerPhotos: function(event) { // for photos inputted via file explorer
            let photos = [...event.target.files]
            photos = photos.filter(photo => photo.type.indexOf('image/') >= 0)
            this.processPhotos(photos)
        },
        processPhotos: async function(photos) {
            let promises = [];

            photos.forEach(photo => {
                promises.push(this.getBase64(photo))
            });
            
            let sources = await Promise.all(promises)
            this.uploadedPhotos = this.uploadedPhotos.concat(sources)
        },
        getBase64(file) { // courtesy of https://github.com/fabiofranchino/vue-drop-image-and-preview/blob/master/src/components/DropImages.vue
            const reader = new FileReader()
            return new Promise(resolve => {
                reader.onload = ev => {
                    resolve({"data": ev.target.result, "name": file.name})
                }
                reader.readAsDataURL(file)
            })
        },
        togglePreview: function(photo) {
            this.previewingImage = true;
            this.imageBeingPreviewed = photo;
        },
        navigateToSorted: function() {
            this.$router.push('/viewsorted')
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
            uploadedPhotos: [],
            previewingImage: false,
            imageBeingPreviewed: null,
            zippedPhotos: []
        }
    },
    beforeMount(){
        this.preLoad()
    },
}
</script>

<style>
.body{
    display: flex;
    flex-direction: row;
    height: calc(100vh - 65px);
}

.drag-and-drop-box{
    position: relative;
    text-align: center;
    height: 50%;
    margin: 0.5%;
    margin-bottom: 0;
    float: right;
    border-radius: 1rem 1rem 0rem 0rem;
    border: 1px solid gainsboro;
    background-color: whitesmoke;
    border-bottom: 0;
}

.logo {
  margin-left: 1rem;
  margin-top: 0.25rem;
  height: 100%;
}

.header {
    height: 3rem;
    font-size: 2rem;
    padding-bottom: 0.5rem;
}

.input-images {
    border: 0px;
    width: 100%;
    height: 100%;
    font-size: 14pt;
    color: darkslategray;
    background-color: whitesmoke;
}

.input-images:hover {
    cursor: pointer;
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

.photo-entry {
    border-bottom: 1px solid black;
}

.photo-name:hover {
    background-color: whitesmoke;
    cursor: pointer;
}

.photo-remove {
    outline: 0px;
    border: 0px;
    border-radius: 5px;
    float: right;
    color: crimson;
    background-color: snow;
}

.photo-remove:hover {
    background-color: crimson;
    color: snow;
    outline: none;
}

.preview-image {
    max-width: 100%;
    max-height: 100%;
}

.preview-image-box {
    position: relative;
    background-color: whitesmoke;
    text-align: center;
    height: 50%;
    margin: 0.5%;
    float: right;
    font-size: 14pt;
    border-radius: 1rem 1rem 1rem 1rem;
    border: 1px solid gainsboro;
}

.table-header {
    font-family: sans-serif;
    color: darkslategray;
}

.boxes-and-buttons {
    display: flex;
    flex-direction: column;
    width: 50%;
}

.logo {
    height: 50px;
}

.submit-button {
    width: 99%;
    height: 2rem;
    margin: 0.5%;
    margin-top: 0;
    font-size: 12pt;
    border-radius: 0rem 0rem 1rem 1rem;
    border: 1px solid gainsboro;
    color: darkslategray;
    background-color: whitesmoke;
}

.submit-button:hover {
    background-color: teal;
    color: snow;
    cursor: pointer; 
}

.uploaded-photo-table {
    height: calc(100% - 0.5rem);
    width: 50%;
    margin: 0.25%;
    overflow-y: scroll;
    border-radius: 1rem 1rem 1rem 1rem;
    border: 1px solid gainsboro;
    font-family: sans-serif;
    color: darkslategray;
}

tbody {
    display: block;
    overflow: auto;
}

thead, tbody tr {
    display: table;
    width: 100%;
    table-layout: fixed;/* even columns width , fix width of table too*/
}
thead {
    width: calc( 100% - 1em )/* scrollbar is average 1em/16px width, remove it from thead width */
}

</style>
