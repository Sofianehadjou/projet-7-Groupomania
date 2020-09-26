<template>
    <div class="container">
        <div class="create-publication">
            <form method="post" @submit.prevent="postPublication">
                <div>
                    <div v-bind="getProfil()">
                        <img src="../assets/user.png" alt="" class="img-user">
                        <h3>Bonjour {{ username }}, ceci est votre mur </h3>
                        <button class="toggle btn btn-outline-primary btn-publication" v-on:click="toggleOng"> Créer une publication </button>
                    </div>
                    <div v-if="toggle">
                        <input type="text" placeholder="le titre de votre publication " class="form-control" v-model="title"/>
                        <textarea type="text" placeholder="le contenu de votre publication " class="form-control" v-model="content"/>
                        <div class="btn-form">
                            <input type="text" placeholder="Url de l'image" class="form-control" v-model="attachment"/>
                            <button class="btn btn-primary" type="submit">Publier</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <div  class="list-publication">
            <div v-bind:key="index" v-for="(publication, index) in allPublications" class="card m2">
                <div class="infos-user">
                    <img src="../assets/user.png" alt="" class="img-user">
                    <div>
                        <p>{{ publication.User.username }} <br> <span>membre</span></p>
                    </div>
                    <div class="share ml-auto mr-5" >
                        <i class="fas fa-share-square">partager sur: </i>
                            <!-- Facebook -->
                        <a target="_blank" title="Facebook" href="https://www.facebook.com/sharer.php?u=http://localhost:8080/home" rel="nofollow" onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=500,width=700');return false;"><i class="fab fa-facebook"></i></a>
                            <!-- //Facebook -->

                            <!-- Twitter -->
                        <a target="_blank" title="Twitter" href="https://twitter.com/share?url=http://localhost:8080/home" rel="nofollow" onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=700');return false;"><i class="fab fa-twitter-square" ></i></a>
                            <!-- //Twitter -->
                            
                            <!-- Linkedin -->
                        <a target="_blank" title="Linkedin" href="https://www.linkedin.com/shareArticle?mini=true&amp;url=http://localhost:8080/home" rel="nofollow" onclick="javascript:window.open(this.href, '','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=450,width=650');return false;"><i class="fab fa-linkedin"></i></a>
                            <!-- //Linkedin -->
                    </div>
                </div>
                 
                <h3>{{ publication.title }}</h3>
                <p>{{ publication.content }}</p>
                <img v-bind:src="publication.attachment" alt="" class="img-publication img-fluid rounded">      
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
            title: '',
            content: '',
            attachment: '',
            username:'',
            allPublications: [], 
            toggle: false,
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
            .catch(err =>{
                console.log(err)
            })
        },
    methods: {
        postPublication(){
            var qs = require('qs');
            var data = qs.stringify({
                'title': this.title ,
                'content': this.content,
                'attachment': this.attachment, 
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
        getProfil(){
            const  headers = {
                headers: { 'Authorization': "Bearer " + localStorage.getItem("api-token")}
            };
            axios.get('http://localhost:3000/api/users/profil/', headers)
            .then(res => {
                this.username = res.data.username
                console.log(res)
            })  
            .catch(err =>{
                console.log(err)
                if(err){
                    this.$router.push('/');
                }
                
            })  
        },
        toggleOng: function(){
            this.toggle = true  
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
    position: inherit!important;
    margin-top: 100px!important;
    margin-bottom: 150px!important;
    box-shadow:0 0 7px rgba(0,0,0,.4)!important;
}
.btn-publication{
    color: #fd2d01;
    border: 1px solid #fad0d0!important;
}
.btn-publication:hover{
    background-color: #fad0d0;
    color: #fff;
}
form{
    width: 80%;
    margin-left: auto;
    margin-right: auto;
}
input, textarea{
    margin-top: 5px;
      border: none;
    border-bottom: 2px solid #fad0d0;
}
.btn-form{
    display: flex;
}
.btn-form > input{
    width: 80%;
    margin-right: 5px;
    background-image: url('../assets/image.png');
    background-repeat: no-repeat;
    padding-left: 40px;

}
.btn-form > button{
    width: 20%;
    margin-right: 5px;
    background-color: #fad0d0;
    border: 1px solid white!important;
}

.list-publication > ul{
    list-style: none;
}
.img-publication{
        width:100%;
        max-width:100%
}
.img-user{
    margin: 20px;
    width: 4rem;
}
.infos-user{
    display: flex;
}
.infos-user > div {
    margin-top: 22px;
}
.infos-user > div > p > span {
    font-size: 14px;
}
.infos-user > p:nth-child(3){
    font-size: 15px;
}
.create-publication{
    margin-top: 100px;
}
.create-publication > form > div > input, textarea, button{
    margin-top: 5px;
}
.share i{
font-size: 25px;
padding: 5px;
border: 0;
box-shadow: 0;
display: inline;
}

</style>