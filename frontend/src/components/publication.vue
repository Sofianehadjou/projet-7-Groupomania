<template>
    <div class="card">
        <div>
            <img src="" alt="">
            <p>{{publicationUsername}}</p>
        </div>
        <h2 v-bind="listPublication()">{{publicationTitle}}</h2>
        <p>{{publicationContent}}</p> 
    </div>
</template>

<script>

import axios from 'axios'

export default {
    name: 'publication',
    data(){
        return{
            publicationUsername: null,
            publicationTitle: null,
            publicationContent: null,
            publicationLikes: null
        }
    },
    methods: {

        listPublication(){

            const API_URL = 'http://localhost:3000/api/publications/';

            axios.get(API_URL).then(res => {
                    this.publicationUsername = res.data[0].Users[0].username
                    this.publicationTitle    = res.data[0].title
                    this.publicationContent  = res.data[0].content
                    this.publicationLikes    = res.data[0].Users[0].Like    
            })
        },
    }

    
}
</script>

<style scoped>

</style>