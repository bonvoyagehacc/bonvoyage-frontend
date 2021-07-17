<template>
    <div class="header">
        <img class="logo" src="../assets/logo.png" />
        <span>UPLOAD PHOTOS</span>
    </div>
    <div class="body">
        <!--List of images added-->
        <table class="uploaded-photo-table">
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
        <!--Preview Section-->
        <button class="preview-image-box" disabled v-cloak>
            Preview Image
            <img v-if="previewingImage" :src="imageBeingPreviewed.data"/>
        </button>
        <!--Drag and Drop section-->
        <button class="drag-and-drop-box" disabled v-cloak @drop.prevent="addPhotoToList" @dragover.prevent>
            Drag and Drop images
        </button>
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
            let removedPhoto = this.uploadedPhotos.splice(this.uploadedPhotos.indexOf(photo), 1)

            if (removedPhoto[0].data == this.imageBeingPreviewed.data) {
                this.imageBeingPreviewed = null;
                this.previewingImage = false;
            }
        },
        addPhotoToList: async function(event) {
            let photos = [...event.dataTransfer.files];
            // only images allowed
            photos = photos.filter(photo => photo.type.indexOf('image/') >= 0)

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
        }
    }
}
</script>

<style>
.drag-and-drop-box{
    position: relative;
    background-color: #c9c9c9;
    text-align: center;
    height: 45vh;
    width: 49%;
    margin: 0.5%;
    border: 0px;
    outline: 1px solid black;
    float: right;
}

.header {
    background-color: coral;
    height: 50px;
    padding: 1rem;
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

.preview-image-box {
    position: relative;
    background-color: #c9c9c9;
    text-align: center;
    height: 45vh;
    width: 49%;
    margin: 0.5%;
    border: 0px;
    float: right;
    outline: 1px solid black;
}

.table-header {
    background-color: #c9c9c9;
}

.image-preview {
    max-width: 5rem;
    max-height: 5rem;
}

.logo {
    height: 50px;
}

.submit-button {
    padding: 5rem;
    border: 0px;
    border-radius: 0px;
    outline: 1px solid black;
}

.submit-button:hover {
    background-color: lightblue;
    cursor: pointer;
}

.uploaded-photo-table {
    position: relative;
    float: left;
    border: 0px;
    outline: 1px solid black;
    max-width: 50%;
    height: 90vh;
    width: 49%;
    margin: 0.5%;
    overflow-y: scroll;
}

tbody {
    display: block;
    overflow: auto;
    height: 90vh;
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