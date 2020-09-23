<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light header-top">
      <img src="../assets/icon-left-font-monochrome-white.png" alt="" class="logo">
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav -auto">
            <li v-if="auth=='loggedin'" class="nav-item active">
                <router-link class="nav-link" to="/home">Accueil</router-link>
            </li>
            <li v-if="auth=='loggedin'" class="nav-item">
                <router-link class="nav-link" to="/profil">Profil</router-link>
            </li>
            <li v-if="auth=='loggedin'" class="van-item">
                <a class="nav-link" href="" v-on:click="logout">Se déconnecter</a>
            </li>
        </ul>
    </div>
</nav>
</template>

<script>
import EventBus from './EventBus'

    EventBus.$on('logged-in', test => {
        console.log(test)
    })

export default {
    name: 'Header',
    data(){
        return {
            titre: 'Groupomania',
            auth: '',
            user:   ''
        }
    },
    methods: {
        logout() {
            localStorage.removeItem('api-token');
            this.$router.push('/');
        }
    },
    mounted() {
        EventBus.$on('logged-in', status => {
            this.auth = status
        })
    },
}
</script>

<style scoped>
    .header-top{
        position: fixed;
        top: 0;
        height: 70px;
        background: #fad0d0!important;
        color: cornsilk;
        width: 100%;
        text-align: center;
        line-height: 50px;
        display: flex;
    }
    .logo{
        width: 20%;
    }
  

</style>