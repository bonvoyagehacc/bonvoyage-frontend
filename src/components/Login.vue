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
                <input class="info-submit-button" type="submit" value=">" v-on:click="submitLogin(username, password)">
            </div>
            <div class="toggle-options" v-on:click="toggleMethod('register')">
                No Account? Sign up!
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
                <input class="info-submit-button" type="submit" value=">" v-on:click="submitRegister(registerusername, registerpassword)">
            </div>
            <div class="toggle-options" v-on:click="toggleMethod('login')">
                Already Registered? Sign in!
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
        submitLogin: function(name, pass) {
            let data = {username: name, password: pass}
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
.info-box {
    width: 25%;
    position: fixed;
    top: 50%;
    left: 50%;
    /* bring your own prefixes */
    transform: translate(-50%, -50%);
}

.info-submit-button {
    border: 0px !important;
    width: 25%;
}

.info-submit-button:hover {
    cursor: pointer;
}

.input-text {
    width: 100%;
}

.input-text > input {
    position: relative;
    vertical-align: middle;
    border-radius: 0px;
    border: 0px;
    outline: 1px solid black;
    margin-top: 0.5%;
    padding: 0px;
}

.input-text > input:focus {
    outline: 1px solid black;
    border-radius: 0px;
}

.input-text:hover {
    cursor: pointer;
}

.password-input-box {
    width: 75%;
}

.username-input-box {
    width: 100%;
}

.toggle-options:hover {
    cursor: pointer;
}

.web-logo{
    width: 100%
}

</style>