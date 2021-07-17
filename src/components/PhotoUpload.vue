<template>
    <div class="header">
        <img class="logo" src="../assets/logo.png" />
        <span>UPLOAD PHOTOS</span>
    </div>
    <div class="body">
        <div class="drag-and-drop-box" v-cloak @drop.prevent="addPhotoToList" @dragover.prevent>
            Drag and Drop images
        </div>
        <table class="uploaded-photo-table">
            <thead>
                <th class="table-header">Preview</th>
                <th class="table-header">Number</th>
                <th class="table-header">Remove</th>
            </thead>
            <tbody>
                <!--Show a filler box if there are no photos uploaded-->
                <tr v-if="uploadedPhotos.length == 0">
                    <td>Upload a photo!</td>
                    <td></td>
                </tr>
                <tr v-for="photo in uploadedPhotos" :key="photo" v-cloak>
                <td><img class="image-preview" :src="photo.data"/></td>
                <td>{{photo.name}}</td>
                <td><button v-on:click="removePhotoFromList(photo)">X</button></td>
                </tr>
            </tbody>
        </table>
        <button class="submit-button" v-on:click="submitPhotos"> click me</button>
    </div>
    
</template>

<script>
export default {
    methods: {
        submitPhotos: function() {
            console.log("submitted photos")
        },
        removePhotoFromList: function(photo) {
            // removes photo from uploaded photos
            this.uploadedPhotos.splice(this.uploadedPhotos.indexOf(photo), 1)
        },
        addPhotoToList: async function(event) {
            let photos = [...event.dataTransfer.files];
            // only images allowed
            photos = photos.filter(photo => photo.type.indexOf('image/') >= 0)
            console.log("photos", photos)

            let promises = [];

            photos.forEach(photo => {
                promises.push(this.getBase64(photo))
            });
            
            let sources = await Promise.all(promises)
            this.uploadedPhotos = this.uploadedPhotos.concat(sources)
            console.log("uploaded photos", this.uploadedPhotos)
        },
        getBase64(file) { // courtesy of https://github.com/fabiofranchino/vue-drop-image-and-preview/blob/master/src/components/DropImages.vue
            const reader = new FileReader()
            return new Promise(resolve => {
                reader.onload = ev => {
                    console.log("ev,", ev)
                    resolve({"data": ev.target.result, "name": file.name})
                }
                console.log("file,", file)
                reader.readAsDataURL(file)
            })
        }
    },
    data() {
        return {
            uploadedPhotos: []
        }
    }
}
</script>

<style>
.drag-and-drop-box{
    position: relative;
    display: inline-block;
    background-color: #c9c9c9;
    text-align: center;
    height: 50vh;
    width: 49%;
    border: 1px solid black;
}

.header {
    background-color: coral;
    height: 50px;
    padding: 1rem;
    font-size: 2rem;
}

.image-preview {
    max-width: 5rem;
    max-height: 5rem;
}

.logo {
    height: 50px;
}

.submit-button {
    border: 1px solid black;
    border-radius: 0px;
}

.uploaded-photo-table {
    position: relative;
    border: 1px solid black;
    max-width: 50%;
    width: 50%;
}
</style>