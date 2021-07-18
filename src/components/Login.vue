<template>
    <div class="container">
        <!--Login User-->
        <div v-if="method=='login'" class="info-box">
            <!--Logo-->
            <img class="web-logo" src="src/assets/logo.png" />
            <!--Input Fields-->
            <div class="input-text">
                <input class="username-input-box" type="text" v-model="username" placeholder="Username">
            </div>
            <div class="input-text">
                <input class="password-input-box" type="password" v-model="password" placeholder="Password">
                <button class="info-submit-button" v-on:click="submitLogin">Sign In</button>
            </div>
            <div class="toggle-options" v-on:click="toggleMethod('register')">
                No Account? Sign Up!
            </div>
        </div>

        <!--Register User-->
        <div v-if="method=='register'" class="info-box">
            <!--Logo-->
            <img class="web-logo" src="src/assets/logo.png" />
            <!--Input Fields-->
            <div class="input-text">
                <input class="username-input-box" type="text" v-model="registerusername" placeholder="Username">
            </div>
            <div class="input-text">
                <input class="password-input-box" type="password" v-model="registerpassword" placeholder="Password">
                <button class="info-submit-button" v-on:click="submitRegister">Register</button>
            </div>
            <div class="toggle-options" v-on:click="toggleMethod('login')">
                Already Registered? Sign In!
            </div>
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
        submitLogin: function(e) {
            e.preventDefault()
            let data = {username: this.username, password: this.password}
            this.$store.dispatch('auth/login', data)
            .then(
                data => {
                    this.formStatus = `success: ${data}`;
                    this.$router.push('/');
                },
                err => {
                    alert("invalid inputs!")
                    this.formStatus = `failure: ${err}`;
                }
            );
        },
        submitRegister: function(e) {
            e.preventDefault()
            let data = {username: this.registerusername, password: this.registerpassword}
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
.info-box {
    width: 25%;
    position: fixed;
    top: 50%;
    left: 50%;
    /* bring your own prefixes */
    transform: translate(-50%, -50%);
}

.info-submit-button {
    width: 25%;
    height: 21pt;
    margin-top: 0.12rem;
    margin-left: 2%;
    border-radius: 0.25rem;
    border: 1px solid gainsboro;
}

.info-submit-button:hover {
    cursor: pointer;
    background-color: teal;
    color: snow;
    border: 0px;
}

.input-text {
    width: 100%;
    height: 2rem;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    display: flex;
}

.input-text > input {
    position: relative;
    vertical-align: middle;
    border-radius: 0.25rem;
    margin-top: 0.5%;
    border: 1px solid gainsboro;
}

.input-text > input:focus {
    border: 1px solid darkslategray;
    border-radius: 0.25rem;
}

.input-text:hover {
    cursor: pointer;
}

.password-input-box {
    width: 75%;
    font-size: 14pt;
    color: darkslategray;
}

.username-input-box {
    width: 100%;
    font-size: 14pt;
    color: darkslategray;
}

.toggle-options {
    text-align: center;
    font-family: sans-serif;
    margin-top: 1rem;
    color: darkslategray;
}

.toggle-options {
}

.toggle-options:hover {
    cursor: pointer;
}

.web-logo{
    width: 100%
}

</style>