<template>
    <header>UPLOAD PHOTOS</header>
    <table>
        <thead>
            <th class="table-header">Number</th>
            <th class="table-header">Remove</th>
        </thead>
        <tbody>
            <tr v-for="photo in uploadedPhotos" :key="photo">
            <td>{{photo}}</td>
            <td><button v-on:click="removePhotoFromList(photo)">Remove</button></td>
            </tr>
        </tbody>
    </table>
    <button v-on:click="submitPhotos"> click me</button>
</template>

<script>
export default {
    methods: {
        submitPhotos: function() {
            console.log("submitted photos")
        },
        removePhotoFromList: function(photo) {
            this.uploadedPhotos.splice(photo, 1)
        },
        addPhotoToList: function(photo) {
            var insertion_index = this.uploadedPhotos.length;
            this.uploadedPhotos.push(photo)
        }
    },
    data() {
        return {
            name: "Martin",
            uploadedPhotos: [0,1,2,3,4,5,6]
        }
    }
}
</script>

<style>
.table-header{
    background-color: red;
}
</style>