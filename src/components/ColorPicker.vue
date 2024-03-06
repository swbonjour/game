<template>
  <div class="picker" :class="color">
    {{ timer }}
  </div>
</template>
<script setup>
import { ref, watch } from 'vue'
import { useScoreStore, useScoreStoreSecond } from '@/stores/score';

const timer = ref(3)

const scoreStore = useScoreStore();
const scoreStoreSeconds = useScoreStoreSecond();

const colors = ['red', 'black', 'white', 'blue', 'green', 'yellow', 'pink', 'red', 'orange']

const getColor = () => {
  return colors[Math.floor(Math.random() * colors.length)]
}

const color = ref(getColor())
scoreStore.setCorrectColor(color.value)

watch(timer, () => {
  if(timer.value === 0) {
    scoreStore.setTimerTrue();
    scoreStoreSeconds.setTimerTrue();
  } 
})

setInterval(() => {
  timer.value -= 1;
  if(timer.value === -1) {
    color.value = getColor()
    scoreStore.setCorrectColor(color.value);
    timer.value = 3;
  }
}, 1000)
</script>
<style scoped>
.picker {
  width: 10rem;
  height: 10rem;
  font-size: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
