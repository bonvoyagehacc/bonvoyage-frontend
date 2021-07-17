<template>
    <header>UPLOAD PHOTOS</header>
    <table>
        <thead>
            <th class="table-header">Number</th>
            <th class="table-header">Remove</th>
        </thead>
        <tbody>
            <tr v-for="photo in uploadedPhotos" :key="photo" v-cloak>
            <td>{{photo[0].name}}</td>
            <td><button v-on:click="removePhotoFromList(photo)">X</button></td>
            </tr>
        </tbody>
    </table>
    <div class="drag-and-drop-box" v-cloak @drop.prevent="addPhotoToList" @dragover.prevent>
        Drag and Drop images
    </div>
    <button v-on:click="submitPhotos"> click me</button>
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
        addPhotoToList: function(event) {
            var insertion_index = this.uploadedPhotos.length;
            let photo = event.dataTransfer.files;
            photo = [...photo]
            this.uploadedPhotos.push(photo)
        }
    },
    data() {
        return {
            name: "Martin",
            uploadedPhotos: []
        }
    }
}
</script>

<style>
.drag-and-drop-box{
    position: relative;
    background-color: #c9c9c9;
    text-align: center;
    height: 50vh;
    width: 50vw;
    border: 1px solid black;
}
</style>