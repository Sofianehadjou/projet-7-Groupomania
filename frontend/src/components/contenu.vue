<template>
    <div> 
        <div class="btn btn-outline-primary mr-2" v-on:click="toggleOng1">Se connecter</div>
        <div class="btn btn-outline-primary" v-on:click="toggleOng2">S'inscrire </div>

        <div class="onglets" >
            <login class="p5" v-if="toggle1"></login>
            <register class="p5" v-if="toggle2"></register>

            <publication></publication>
        </div>
    </div>    
</template>

<script>
    import login from './login.vue'
    import register from './register.vue'
    import publication from './publication.vue'
    
    export default {
        name: 'contenu',
        data: function(){
            return {
                toggle1: true,
                toggle2: false,
            }
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
        },
        
        components: {
            'login': login,
            'register': register,
            'publication': publication
        }
    }

</script>

<style scoped>
    .btn-outline-primary{
        float: right;
        top: 10;
        right: 10;
    }
    div {
        margin-top: 90px;
    }
    .onglets{
        margin-left: auto;
        margin-right: auto;
        width: 350px;
        height: 250px;
    }
    
</style>