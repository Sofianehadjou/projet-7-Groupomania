<template>
<div>
    <div>
        <div class="toggle btn btn-outline-primary mr-2" v-on:click="toggleOng1">Se connecter</div>
        <div class="toggle btn btn-outline-primary" v-on:click="toggleOng2">S'inscrire</div>
    </div>
    <div id="login-form" class="container">
        <div class="form-container">
            <div>
                <form @submit.prevent="login" v-if="toggle1" class="card">
                    <div class="form-group">
                        <h1>Se connecter</h1>
                        <input type="email" placeholder="Email " class="form-control" v-model="email" required/>
                        <input type="password" placeholder="Mot de passe" class="form-control" v-model="password" required/>
                        <button class="btn btn-lg btn-primary btn-connexion" type="submit">Connexion</button>
                        <hr>
                        <div>
                            <button class="btn btn-primary btn-inscription" type="submit" v-on:click="toggleOng2" >Créer un compte</button>
                        </div>
                    </div>
                </form>

                <form @submit.prevent="register" v-if="toggle2" class="card">
                    <div>
                        <h1>Créer un compte </h1>
                    <span>(* : champ obligatoire)</span>
                        <input type="text" placeholder="Username *" class="form-control" v-model="username" required/>
                        <input type="email" placeholder="Email *" class="form-control" v-model="email" required/>
                        <input type="password" placeholder="Mot de passe *" class="form-control" v-model="password" required/>
                        <input type="text" placeholder="Bio" class="form-control" v-model="bio"/>
                        <button class="btn btn-primary btn-inscription2" type="submit" >S'inscrire</button>
                        <hr>
                        <div>
                            <button class="btn btn-lg btn-primary btn-connexion" type="submit" v-on:click="toggleOng1">vous avez déjà un compte !</button>
                        </div>
                    </div>
                </form>
            </div>
            <div class="content-container">
                <img src="../assets/icon-left-font.png" alt="">
                <h2>Réseau social interne pour les employés <br> de Groupomania.</h2>
            </div>
        </div>        
    </div>  
</div>
    
</template>
<script>

import axios from 'axios'
import router from '../router'
import EventBus from './EventBus'

const API_URL = 'http://localhost:3000/api/users/';

export default {
    name: 'connection',
    data(){
        return {
            auth:'',
            toggle1: true,
            toggle2: false,
            username:'',
            email: '',
            password:'',
            bio:''
        };
    },
    methods: {
        toggleOng1: function(){
            this.toggle1 = true
            this.toggle2 = false
        },
        toggleOng2: function(){
            this.toggle1 = false
            this.toggle2 = true
        },       
        login(){
            axios.post(API_URL + 'login', {
                email: this.email,
                password: this.password
            })
             .then(res => {
                if (res.status === 200) {
                    localStorage.setItem('api-token', res.data.token);
                    this.email = ''
                    this.password = ''
                    router.push({ name: 'profil' })
                    //console.log(res.data);
                    if(res){
                        this.emitMethod()
                        this.$router.push('/home');
                    }
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
        emitMethod() {
            if(localStorage.getItem("api-token")){
                EventBus.$emit('logged-in', 'loggedin')
            }
        },
         logout() {
            localStorage.removeItem('user');
        },
        register(){   
            axios.post(API_URL + 'register', {
                email: this.email, 
                username: this.username, 
                password: this.password,
                bio: this.bio
                })
            .then(res => {
                this.email = ''
                this.username = ''
                this.password = ''
                this.bio = ''
                router.push({ name: 'login' })
                console.log(res);
                window.location.reload()
            })
        },
        
    },  
}
</script>

<style scoped>
    .card{
        padding: 17px 30px 45px 30px;
        border-radius: 1.70rem;
        box-shadow:0 0 7px rgba(0,0,0,.4);
    }
    #login-form{
        margin-left: auto;
        margin-right: auto;
        margin-top: 100px;
    }
    #register-form{
        margin-left: auto;
        margin-right: auto;
        margin-top: 100px;
    }
    .btn{
       margin-top: 10px;
    }
    input {
        margin-top: 10PX;
        width: 300px;
    }
    .toggle{
        position: relative;
        top: -55px;
        left: 550px;
        color: white!important;
        border: 1px solid white!important;
    }
    .toggle:hover{
        color: #fad0d0!important;
        background-color: white;
    }
    .form-container{
        display: flex;
        justify-content: space-between;
    
    }
    .content-container > img {
        width: 500px  ;
    }
    .btn-connexion{
        width: 100%;
    }
    .btn-inscription{
        background-color: #fd2d01;
        border: 1px solid #fd2d01!important;
        width: 65%; 
    }
    .btn-inscription2{
        width: 50%;
        background-color: #fd2d01;
        border: 1px solid #fd2d01!important;
    }

</style>