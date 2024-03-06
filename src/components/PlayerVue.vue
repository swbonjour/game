<template>
    <div class="player">
        <img :src="playerImgs[playerImg]" alt="" class="player-img">
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

import owlet from '../assets/Owlet_Monster.png'
import pink from '../assets/Pink_Monster.png'

const playerImgs = [owlet, pink]

const playerImg = ref(Math.floor(Math.random() * 2))
</script>
<style scoped>
.player-img {
    width: 32px;
    height: 32px;
    display: block;
}

.player {
    position: absolute;
}
</style>