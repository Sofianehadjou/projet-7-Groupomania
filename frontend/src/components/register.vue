<template>

    <div class="container">
      <form @submit="register">
        <div>
            <h1>Créer un compte </h1>
            <span></span>
            <input type="text" placeholder="Username" class="form-control" v-model="username"/>
            <input type="email" placeholder="Email" class="form-control" v-model="email"/>
            <input type="password" placeholder="Mot de passe" class="form-control" v-model="password"/>
            <input type="text" placeholder="Bio" class="form-control" v-model="bio"/>
            <button class="btn btn-primary">S'inscrire</button>
        </div>
      </form>
    </div>
    
</template>

<script>

import axios from 'axios'

export default {
    name: 'S\'inscrire',
    data(){
        return{
            username: '',
            email: '',
            password: '',
            bio: ''
        }
    },
    methods: {
        register(){   
            axios.post('http://localhost:3000/api/users/register', {
                email: this.email, 
                username: this.username, 
                password: this.password,
                bio: this.bio
                })
            .then(res => {
                console.log(res);
            })
        }
    },
    
}
</script>

<style scoped>  
    .btn{
        margin-top: 10px;
        width: 120px;
    }
    input {
        margin-top: 10px;
    }

</style>