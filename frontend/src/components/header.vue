<template>

    <div class="header-top">
        <p>{{ titre }}</p>
        <publication></publication>

    </div>
</template>

<script>
export default {
    name: 'Header',
    data(){
        return {
            titre: 'Groupomania'
        }
    },
}
</script>

<style scoped>
    .header-top{
        position: fixed;
        top: 0;
        height: 70px;
        background: rgb(59 121 156);
        color: cornsilk;
        width: 100%;
        text-align: center;
        line-height: 50px;
        font-size: 35px;
    }
</style>