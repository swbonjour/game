<template>
  <div class="playground">
    <div class="blocks">
      <div
        v-for="item in blockRender"
        :key="item.index"
        :class="item.color"
        style="border: 1px solid white; display: flex; justify-content: center; align-items: center"
      >
        <PlayerVue v-if="item.index === position"></PlayerVue>
      </div>
    </div>
    <div class="menu">
      <p>Score: {{ props.isFirst ? scoreStore.countFirst : scoreStoreSecond.countSecond }}</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import PlayerVue from './PlayerVue.vue'
import { useScoreStore, useScoreStoreSecond } from '@/stores/score'
import { storeToRefs } from 'pinia'

const props = defineProps<{ blockRender: { index: number; color: string }[]; isFirst: boolean }>()

const position = ref(5)

const scoreStore = useScoreStore()
const scoreStoreSecond = useScoreStoreSecond()

const scoreTimer = storeToRefs(scoreStore)
const scoreStoreSecondTimer = storeToRefs(scoreStoreSecond)

if (!props.isFirst) {
  watch(scoreStoreSecondTimer.timerSecond, () => {
    if (scoreStoreSecondTimer.timerSecond) {
      for (const item of props.blockRender) {
        if (position.value === item.index && scoreStore.correctColor === item.color) {
          scoreStoreSecond.incrementSecond();
        }
        scoreStoreSecond.setTimerFalse()
      }
    }
  })
}

if (props.isFirst) {
  watch(scoreTimer.timer, () => {
    if (scoreStore.timer) {
      for (const item of props.blockRender) {
        if (position.value === item.index && scoreStore.correctColor === item.color) {
          scoreStore.incrementFirst();
        }
      }
      scoreStore.setTimerFalse()
    }
  })
}

if (props.isFirst) {
  window.addEventListener('keydown', (e) => {
    if (e.key === 'w') {
      if (position.value === 9) {
        return
      }
      position.value += 1
    }
    if (e.key === 's') {
      if (position.value === 1) {
        return
      }
      position.value -= 1
    }
  })
} else {
  window.addEventListener('keydown', (e) => {
    if (e.key === 'u') {
      if (position.value === 9) {
        return
      }
      position.value += 1
    }
    if (e.key === 'j') {
      if (position.value === 1) {
        return
      }
      position.value -= 1
    }
  })
}
</script>
<style scoped>
.playground {
  width: 30rem;
  height: 40rem;
  border: 1px solid var(--secondary);
  display: flex;
  flex-direction: column;
}

.menu {
  background-color: var(--main);
  width: 100%;
  flex: 1;
  font-size: 32px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}

.blocks {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  height: 80%;
}
</style>
