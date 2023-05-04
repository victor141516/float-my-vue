<script setup lang="ts">
import { computed, onBeforeUnmount, reactive, ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    color?: 'dark' | 'light'
    arrowSize?: number
    offset?: { x?: number; y?: number }
    side?: 'top' | 'right' | 'bottom' | 'left'
    open?: boolean
  }>(),
  {
    color: 'dark',
    arrowSize: 10,
    offset: () => ({ x: 0, y: 0 }),
    side: 'top',
    open: false
  }
)
defineEmits<{
  (e: 'open'): void
  (e: 'close'): void
}>()

const realOffset = computed(() => {
  const value = Object.assign({ x: 0, y: 0 }, props.offset)
  if (props.side === 'top' || props.side === 'bottom') {
    value.x -= 2
  }
  return value
})

const showTooltip = ref(false)

watch(
  () => props.open,
  (value: boolean) => (showTooltip.value = value),
  { immediate: true }
)

const tooltipRef = ref<HTMLElement | null>(null)
const referenceElementRef = ref<HTMLElement | null>(null)
const tooltipSize = reactive({ width: 0, height: 0 })
const referenceElementSize = reactive({ width: 0, height: 0 })

const unobservers: { tooltip?: () => void; reference?: () => void } = {}

watch(
  () => tooltipRef.value,
  () => {
    if (tooltipRef.value) {
      const tooltipObserver = new ResizeObserver(() => {
        if (tooltipRef.value) {
          tooltipSize.width = tooltipRef.value!.clientWidth
          tooltipSize.height = tooltipRef.value!.clientHeight
        }
      })
      tooltipObserver.observe(tooltipRef.value)
      unobservers.tooltip = () => tooltipRef.value && tooltipObserver.unobserve(tooltipRef.value)
    } else {
      unobservers.tooltip?.()
      unobservers.tooltip = undefined
    }
  },
  { immediate: true }
)
watch(
  () => referenceElementRef.value,
  () => {
    if (referenceElementRef.value && !unobservers.reference) {
      const referenceElementObserver = new ResizeObserver(() => {
        referenceElementSize.width = referenceElementRef.value!.clientWidth
        referenceElementSize.height = referenceElementRef.value!.clientHeight
      })
      referenceElementObserver.observe(referenceElementRef.value)
      unobservers.reference = () => referenceElementObserver.unobserve(referenceElementRef.value!)
    }
  },
  { immediate: true }
)

onBeforeUnmount(() => {
  unobservers.tooltip?.()
  unobservers.reference?.()
})

const translations = computed(() => {
  const result = {
    arrow: { x: 0, y: 0 },
    tooltip: { x: 0, y: 0 }
  }
  if (props.side === 'top' || props.side === 'bottom') {
    result.arrow.x = -1 * (props.arrowSize - referenceElementSize.width / 2 + realOffset.value.x)
    result.arrow.y =
      -1 *
      (props.arrowSize +
        (props.side === 'top' ? referenceElementSize.height : 0) +
        realOffset.value.y)
    result.tooltip.x =
      -1 * (tooltipSize.width / 2 - referenceElementSize.width / 2 + realOffset.value.x)
    if (props.side === 'top') {
      result.tooltip.y =
        -1 *
        (referenceElementSize.height +
          tooltipSize?.height +
          props.arrowSize +
          realOffset.value.y -
          1)
    } else {
      result.tooltip.y = -1 * (realOffset.value.y - props.arrowSize)
    }
  } else {
    result.arrow.x =
      -1 *
      (props.arrowSize -
        (props.side === 'right' ? referenceElementSize.width : 0) +
        realOffset.value.x)
    result.arrow.y = -1 * (props.arrowSize + referenceElementSize.height / 2 + realOffset.value.x)
    if (props.side === 'right') {
      result.tooltip.x = -1 * (realOffset.value.x - referenceElementSize.width - props.arrowSize)
    } else {
      result.tooltip.x = -1 * (tooltipSize.width + props.arrowSize + realOffset.value.x)
    }
    result.tooltip.y =
      -1 * (tooltipSize.height / 2 + referenceElementSize.height / 2 + realOffset.value.x)
  }

  return result
})
</script>

<template>
  <div class="relative">
    <div
      ref="referenceElementRef"
      @click="
        () => {
          showTooltip = !showTooltip
          $emit(showTooltip ? 'open' : 'close')
        }
      "
    >
      <slot name="reference" />
    </div>
    <div v-if="showTooltip" class="absolute">
      <template v-if="referenceElementRef">
        <div
          data-testid="arrow-translate"
          class="absolute h-0 w-0"
          :style="`transform: translateX(${Math.round(
            translations.arrow.x
          )}px) translateY(${Math.round(translations.arrow.y)}px);`"
        >
          <slot name="arrow">
            <!-- TODO: clip the arrow so that the element behind is clickable -->
            <div
              data-testid="arrow-default"
              class="border-solid"
              :class="[
                `border-[${arrowSize}px]`,
                { dark: 'border-slate-900', light: 'border-gray-300' }[props.color],
                {
                  top: 'border-b-transparent border-x-transparent',
                  right: 'border-l-transparent border-y-transparent',
                  bottom: 'border-t-transparent border-x-transparent',
                  left: 'border-r-transparent border-y-transparent'
                }[props.side]
              ]"
              :style="{
                'border-width': `${arrowSize}px`
              }"
            ></div>
          </slot>
        </div>
      </template>
      <template v-if="referenceElementRef">
        <div
          data-testid="tooltip-translate"
          ref="tooltipRef"
          class="absolute"
          :style="`transform: translateX(${Math.round(
            translations.tooltip.x
          )}px) translateY(${Math.round(translations.tooltip.y)}px);`"
        >
          <slot name="float">
            <div
              data-testid="tooltip-default"
              class="px-1 py-2 rounded-lg text-sm w-52"
              :class="
                { dark: 'bg-slate-900 text-white', light: 'bg-gray-300 text-slate-900' }[
                  props.color
                ]
              "
            >
              <slot name="content" />
            </div>
          </slot>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
