<template>
  <div id="Choice-Text-Model">
    <div
      class="currentOption"
      :style="{ fontSize: timer ? '3em' : '1.5em' }"
      @click="confirmToggle"
    >
      <span> {{ currentOption }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onDeactivated } from "vue"
import type { PropType } from "vue"
import type { TableData } from "../types"

const props = defineProps({
  optionsList: {
    type: Array as PropType<TableData[]>,
    default: () => []
  }
})
const currentOption = ref("点击此处开始/停止")
let timer: any

function start() {
  const random = Math.floor(Math.random() * props.optionsList.length)
  currentOption.value = props.optionsList[random].option
}
function stop() {
  clearInterval(timer)
  timer = 0
}

function confirmToggle() {
  if (timer) {
    stop()
  } else {
    start()
    timer = setInterval(() => {
      start()
    }, 30)
  }
}

onDeactivated(stop)
</script>

<style lang="scss">
#Choice-Text-Model {
  width: 100%;
  height: 100%;
  .currentOption {
    height: 100%;
    font-weight: 700;
    text-align: center;
    color: $color-primary;
    cursor: pointer;
    user-select: none;
    @include flex-center;

    span {
      opacity: 1;
      transition: opacity 0.3s;

      &:hover {
        opacity: 0.8;
      }
    }
  }
}
</style>
