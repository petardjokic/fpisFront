<template>
<div id="app">
    <div id="menu">
        <Menu></Menu>
    </div>
    <div id="content">
        <router-view></router-view>
    </div>
    <div id="footer"></div>
</div>
</template>

<script>
import Menu from "./components/Menu"
export default {
    name: 'App',
    components: {
        Menu
    }
    }
</script>

<style>
</style>
