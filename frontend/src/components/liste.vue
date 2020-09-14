<template>
    <ul class="liste">
        <li v-for="(fruit, index) in fruits" v-bind:key='index'> {{ fruit }} </li>
    </ul>
    <p>{{ prenom }}</p>
</template>

<script>
export default {
    name: 'liste',
    data(){
        return{
            fruits: ['orange', 'raisin', 'banane']
        }
    },
    props: ['prenom'],
}
</script>

<style scoped>
    ul{
        margin-top: 50px;
    }
</style>