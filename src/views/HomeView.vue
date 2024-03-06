<template>
  <div class="app">
    <header class="header">DanceDanceGame</header>
    <div class="display">
      <h2 style="color: white" v-if="winner === 'first'">WINS</h2>
      <PlayGround :block-render="blockRender" :is-first="true"></PlayGround>
      <ColorPicker></ColorPicker>
      <PlayGround :block-render="blockRender" :is-first="false"></PlayGround>
      <h2 style="color: white" v-if="winner === 'second'">WINS</h2>
    </div>
  </div>
</template>
<script setup lang="ts">
import PlayGround from '@/components/PlayGround.vue'
import ColorPicker from '@/components/ColorPicker.vue'
import { ref, watch } from 'vue';
import { useScoreStore, useScoreStoreSecond } from '@/stores/score';
import { storeToRefs } from 'pinia';

const blockRender: { index: number; color: string }[] = []
const colors = ['red', 'black', 'white', 'blue', 'green', 'yellow', 'pink', 'red', 'orange']

const winner = ref('');

const scoreFirst = useScoreStore();
const scoreSecond = useScoreStoreSecond();

const scoreFirstRefs = storeToRefs(scoreFirst);
const scoreSecondRefs = storeToRefs(scoreSecond);

watch(winner, () => {
  console.log(winner)
})

watch(scoreFirstRefs.countFirst, () => {
  if(scoreFirstRefs.countFirst.value === 10) {
    winner.value = 'first';
  }
})

watch(scoreSecondRefs.countSecond, () => {
  if(scoreSecondRefs.countSecond.value === 10) {
    winner.value = 'second';
  }
})

const getColor = () => {
  return colors[Math.floor(Math.random() * colors.length)]
}

for (let i = 1; i <= 9; i++) {
  const color = getColor()
  blockRender.push({ index: i, color: color })
}
</script>
<style scoped>
.app {
  background-color: var(--primary);
  width: 100vw;
  height: 100vh;
}

.header {
  width: 100%;
  height: 4rem;
  background-color: var(--main);
  font-size: 32px;
  font-weight: 800;
  text-align: center;
  color: var(--text);
}

.display {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 60%;
  margin-left: auto;
  margin-right: auto;
  padding-top: 5rem;
  gap: 5rem;
}
</style>
