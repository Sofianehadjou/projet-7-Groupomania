<template>
    <nav >
        <button class="navbar-toggle"
        type="button"
        data-toggle="collapse"
        data-target="#navbar1"
        aria-controls="navbar1"
        aria aria-expanded="false"
        aria-label="toggle navigation">
            <span class="navbar-toggle-icon"></span>
        </button>

        <div class="collapse navbar-collapse justify-content-md-center" id="navbar1">
            <ul class="navbar-nav">
                <li  class="van-item">
                    <router-link class="nav-link" to="/home">Accueil</router-link>
                </li>
                <li class="van-item">
                    <router-link class="nav-link" to="/">Connexion/Inscription</router-link>
                </li>
                <li v-if="auth=='loggedin'" class="van-item">
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
    data() {
        return {
            auth: '',
            user:   ''
        }
    },
    methods: {
        logout() {
            localStorage.removeItem('api-token')
        }
    },
    mounted() {
        EventBus.$on('logged-in', status => {
            this.auth = status 
        })
    }
}
</script>

<style scoped>

</style>