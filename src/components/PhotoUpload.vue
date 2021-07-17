<template>
    <div class="header">
        <img class="logo" src="../assets/logo.png" />
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
                    <td>No photos added...</td>
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
                <span v-if="!previewingImage">Preview Image</span>
                <img class="preview-image" v-if="previewingImage" :src="imageBeingPreviewed.data"/>
            </button>
            <!--Drag and Drop section-->
            <button class="drag-and-drop-box" disabled v-cloak @drop.prevent="dragAndDroppedPhotos" @dragover.prevent>
                <input type="file" accept="image/*" @change="fileExplorerPhotos" multiple/>
            </button>
            <button class="submit-button" v-on:click="submitPhotos">Upload and Analyze</button>
        </div>
    </div>
    
</template>

<script>
import JSZip from 'jszip'
import { saveAs } from 'file-saver';
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
    background-color: #c9c9c9;
    text-align: center;
    height: calc(50% - 40px);
    margin: 0.5%;
    border: 0px;
    outline: 1px solid black;
    float: right;
}

.header {
    background-color: coral;
    height: 50px;
    font-size: 2rem;
}

.photo-entry {
    border-bottom: 1px solid black;
}

.photo-name:hover {
    background-color: #c9c9c9;
    cursor: pointer;
}

.photo-remove {
    float: right;
}

.preview-image {
    max-width: 100%;
    max-height: 100%;
}

.preview-image-box {
    position: relative;
    background-color: #c9c9c9;
    text-align: center;
    height: 50%;
    margin: 0.5%;
    border: 0px;
    float: right;
    outline: 1px solid black;
}

.table-header {
    background-color: #c9c9c9;
}

.boxes-and-buttons {
    display: flex;
    flex-direction: column;
    width: 50%;
    background-color: coral;
}

.logo {
    height: 50px;
}

.submit-button {
    border: 5px;
    width: 100%;
    height: 40px;
}

.submit-button:hover {
    background-color: lightblue;
    cursor: pointer;
}

.uploaded-photo-table {
    outline: 1px solid black;
    height: 100%;
    width: 50%;
    overflow-y: scroll;
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