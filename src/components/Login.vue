<template>
    <div class="container">
        <div v-if="method=='login'" class="info-box">
            <div class="input-text">
                <input type="text" v-model="username" placeholder="Username">
            </div>
            <div class="input-text">
                <input type="password" v-model="password" placeholder="Password">
                <input type="submit" v-on:click="submitLogin">
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
    </div>
</template>

<script>
import { userRegister } from '/src/services/auth.service';
export default {
    methods: {
        submitLogin: function() {
            console.log("name and pass", this.username, this.password)
        },
        submitRegister: function(name, pass) {
            userRegister(name, pass)
            .then(resp=> {
                let token = resp.accessToken;
                if (token != undefined) {
                    //set local storage
                    
                }
                console.log("response", resp)
            }, err => {
                console.log(err)
            })
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
        }
    }

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