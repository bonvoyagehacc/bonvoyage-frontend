<template>
<div class="input-text" v-on:click="test()">
                Test shit
 </div>
    <div class="container">
        <div v-if="method=='login'" class="info-box">
            <div class="input-text">
                <input type="text" v-model="username" placeholder="Username">
            </div>
            <div class="input-text">
                <input type="password" v-model="password" placeholder="Password">
                <input type="submit" v-on:click="submitLogin(username, password)">
            </div>
            <div class="input-text" v-on:click="toggleMethod('register')">
                No Account? Sign up!
            </div>
        </div>

        <div v-if="method=='register'" class="info-box">
            <div class="input-text">
                <input type="text" v-model="registerusername" placeholder="Username">
            </div>
            <div class="input-text">
                <input type="password" v-model="registerpassword" placeholder="Password">
                <input type="submit" v-on:click="submitRegister(registerusername, registerpassword)">
            </div>
            <div class="input-text" v-on:click="toggleMethod('login')">
                Already Registered? Sign in!
            </div>
        </div>

        <div class="input-text" v-on:click="test()">
                test
            </div>
    </div>
</template>

<script>
import AuthService from '/src/services/auth.service';
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
    methods: {
        test: function() {
            console.log("token", localStorage.getItem('localData'))
            console.log("store", this.$store.state.auth.loggedIn)
        },
        submitLogin: function(name, pass) {
            let data = {username: name, password: pass}
            this.$store.dispatch('auth/login', data)
            .then(
                data => {
                    this.formStatus = `success: ${data}`;
                    this.$router.push('/');
                },
                err => {
                    this.formStatus = `failure: ${err}`;
                }
            );
        },
        submitRegister: function(name, pass) {
            let data = {username: name, password: pass}
            this.$store.dispatch('auth/register', data)
            .then(
                data => {
                    this.formStatus = `success: ${data}`;
                    this.$router.push('/');
                },
                err => {
                    this.formStatus = `failure: ${err}`;
                }
            );
        },
        toggleMethod: function(method) {
            this.method = method;
        }
    },
    data() {
        return {
            method: "login", // defaults to login
            username: "",
            password: "",
            registerusername: "",
            registerpassword: "",
            formStatus: "unsubmitted",
            store: useStore(),
            isLoggedIn: computed(() => {
                return this.store.state.loggedIn
            })
        }
    },
    

}
</script>

<style>
.container {
    width: 100vw;
    height: 100vh;
}

.info-box {
    width: 25%;
}

.input-text > input {
    position: relative;
    vertical-align: middle;
    border-radius: 0px;
    border: 1px solid black;
    margin-top: 0.5%;
}

</style>