<template>
    <header>UPLOAD PHOTOS</header>
    <table>
        <thead>
            <th class="table-header">Number</th>
        </thead>
        <tbody>
            <tr><single-photo></single-photo></tr>
            <tr>{{name}}</tr>
        </tbody>
    </table>
    <button v-on:click="submitPhotos"> click me</button>
</template>

<script>
import SinglePhoto from './SinglePhoto.vue'
export default {
    components: { SinglePhoto },
    methods: {
        submitPhotos: function() {
            console.log("submit endpoint")
        }
    },
    data() {
        return {
            name: "Martin"
        }
    }
}
</script>

<style>
.table-header{
    background-color: red;
}
</style>