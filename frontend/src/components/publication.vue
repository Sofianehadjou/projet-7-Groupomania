<template>
    <div class="container">
        <div class="create-publication">
            <form method="post" @submit.prevent="postPublication">
                <div>
                    <p v-bind="username"></p>
                    <input type="text" placeholder="le titre de votre publication" class="form-control" v-model="title"/>
                    <textarea type="text" placeholder="le contenu de votre publication" class="form-control" v-model="content"/>
                    <input type="text" placeholder="attachment" class="form-control" v-model="attachment"/>
                    <button class="btn btn-primary" type="submit">Publier</button>
                </div>
            </form>
        </div>
        <div class="list-publication">
            <div v-bind:key="index" v-for="(publication, index) in allPublications" class="card m2">
                <p>{{ publication.UserId }}</p>
                <p>{{ publication.createdAt}}</p>
                <h3>{{ publication.title }}</h3>
                <p>{{ publication.content }}</p>
                <img v-bind:src="publication.attachment" alt="">
            </div>               
         
        </div>
    </div>
</template>

<script>

import axios from 'axios'

export default {
    name: 'publicationInfos',
    data(){
        return{
            username: '',
            bio: '',
            allPublications: [], 
            API_URL: 'http://localhost:3000/api/publications/'
        }
    },

    mounted(){
            axios.get(this.API_URL)
            .then(res => {
                console.log(res)
                //this.publications = res.data
                //console.log(this.publications)
                for(const publication of res.data){
                    this.allPublications.push(publication)
                }
                
            })
        },
    methods: {
        postPublication(){
            var axios = require('axios');
            var qs = require('qs');
            var data = qs.stringify({
                'title': this.title ,
                'content': this.content,
                'attachment': this.attachment 
            });
           
            var config = {
                method: 'post',
                url: 'http://localhost:3000/api/publications/new',
                headers: { 
                    'Authorization': "Bearer " + localStorage.getItem("api-token"),
                    'Content-Type': 'application/x-www-form-urlencoded' 
                },
                data : data
                };

            axios(config)
            .then((response) => {
                //console.log(response.data);
                this.allPublications.push(response.data)
                
            })
            .catch(function (error) {
            console.log(error);
            });
        },
    },
    components: {
    }    
}
</script>

<style scoped>
h2{
    font-size: 30px;
}
 p {
    font-size: 20px;
    font-weight: 300;
    line-height: 1.2;
}
.card{
    margin-left: auto;
    margin-right: auto;
    margin-top: 50px;
    width: 650px;
    height: 500px;
}
.create-publication{
    margin-top: 100px;
}
.create-publication > form > div > input, textarea, button{
    margin-top: 5px;
}
.list-publication > ul{
    list-style: none;
}

</style>