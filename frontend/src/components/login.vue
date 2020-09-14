<template>
    <div id="login-form" class="container">
      <form @submit="login">
        <div class="form-group">
            <h1>Se connecter</h1>
            <input type="email" placeholder="Email" class="form-control" v-model="email"/>
            <input type="password" placeholder="Mot de passe" class="form-control" v-model="password" />
            <button class="btn btn-primary btn-success">Se connecter</button>
        </div>
      </form>
    </div>  
</template>

<script>

import axios from 'axios'

export default {
    name: 'Se connecter',
    data(){
        return {
            email: '',
            password:''
        };
    },
    methods: {
        login(e){
            e.preventDefault()
            const API_URL = 'http://localhost:3000/api/users/login/';
            axios.post(API_URL, {
                email: this.email,
                password: this.password
            })
             .then(res => {
                if (res.status === 200) {
                    localStorage.setItem('api-token', res.data.token);
                    console.log(res.data);
                }
            });
        }
    },  
}
</script>

<style scoped>
    #login-form{
        margin-left: auto;
        margin-right: auto;
        width: 100%;
    }
    .btn{
       margin-top: 10px;
        width: 120px;
    }
    input {
        margin-top: 10PX;
    }

</style>