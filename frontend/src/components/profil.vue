<template>
    <div v-bind="getProfil()" class="container">
        <div class="card mt-5">
            <div class="col-sm-8 mx-auto">
                <h1 class="text-center">Mon profil</h1>
            </div>
            <table class="table col-md-6 mx-auto">
                <tbody>
                    <div class="welcome-msg">
                        <svg width="11em" height="11em" viewBox="0 0 16 16" class="bi bi-person-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                        </svg>
                        <h3>Bonjour {{ username }} <span>&#9995;</span></h3>
                    </div>
                    <tr>
                        <td>username:</td>
                        <td>{{ username }}</td>
                    </tr>
                    <tr>
                        <td>Mon email:</td>
                        <td>{{ email }}</td>
                    </tr>
                    <tr>
                        <td>Ma bio:</td>
                        <td>{{ bio }}</td>
                    </tr>
                </tbody>
            </table>
            <div class="toggle btn btn-outline-primary" v-on:click="toggleOng"> <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-person-plus-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm7.5-3a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                </svg>  Modifier mon profil
            </div>
            <form @submit="modifyProfil" v-if="toggle">
                <div>
                    <h1>modifier mon profil </h1>
                    <input type="text" placeholder="Username " class="form-control" v-model="usernameEdit"/>
                    <textarea type="text" placeholder="Bio" class="form-control" v-model="bioEdit"/>
                    <button class="btn btn-primary" type="submit"> modifier mon profil</button>

                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'profil',
    data(){
        return{
            toggle: false,
            username:'',
            email:'',
            bio:'',
            usernameEdit:'',
            bioEdit:''
        }
    },
    methods: {
        getProfil(){
            const  headers = {
                headers: { 'Authorization': "Bearer " + localStorage.getItem("api-token")}
            };
            axios.get('http://localhost:3000/api/users/profil/', headers)
            .then(res => {
                this.username = res.data.username,
                this.email = res.data.email,
                this.bio = res.data.bio
                //console.log(res)

            })  
        },
        modifyProfil(){
            var qs = require('qs');
            var data = qs.stringify({
                'username': this.usernameEdit,
                'bio': this.bioEdit 
            });
            var config = {
                method: 'put',
                url: 'http://localhost:3000/api/users/profil',
                headers: { 
                    'Authorization': "Bearer " + localStorage.getItem("api-token"),
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data : data
            };

            axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                window.location.reload()
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        toggleOng: function(){
            this.toggle = true  
        },
    }

}
</script>

<style scoped>
    .card{
        margin-top: 100px!important;
    }
    input, textarea {
        margin-top: 10PX;
        width: 21rem;
        margin-bottom: 5px;
        margin-left: auto;
        margin-right: auto;
    }
    .btn{
        width: 13rem;
        margin-bottom: 5px;
        margin-left: auto;
        margin-right: auto;
    }
    .welcome-msg{
        display: flex;
        justify-content: space-between;
    }
</style>