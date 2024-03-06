import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useScoreStore = defineStore('score', () => {
  const countFirst = ref(0)
  const timer = ref(false);
  const correctColor = ref('');


  function incrementFirst() {
    countFirst.value++
  }

  function setTimerTrue() {
    timer.value = true;
  }

  function setTimerFalse() {
    timer.value = false;
  }

  function setCorrectColor(color: string) {
    correctColor.value = color;
  }

  return { countFirst, timer, correctColor, incrementFirst, setTimerTrue, setTimerFalse, setCorrectColor }
})

export const useScoreStoreSecond = defineStore('scoreSecond', () => {
  const timerSecond = ref(false);
  const countSecond = ref(0)

  function setTimerTrue() {
    timerSecond.value = true;
  }

  function setTimerFalse() {
    timerSecond.value = false;
  }

  function incrementSecond() {
    countSecond.value += 0.5;
  }

  return { timerSecond, countSecond, setTimerTrue, setTimerFalse, incrementSecond }
})
