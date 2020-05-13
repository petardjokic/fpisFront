<template>
<div id="app">
    <div id="menu"></div>
    <div id="content">
        <NalogZaSkladistenje />
        <!-- <PlanProvere /> -->
    </div>
    <div id="footer"></div>
</div>
</template>

<script>
// import PlanProvere from './components/PlanProvere'
import NalogZaSkladistenje from './components/NalogZaSkladistenje'
export default {
    name: 'App',
    components: {
        // PlanProvere,
        NalogZaSkladistenje
    }
}
</script>

<style>
#app {}
</style>
