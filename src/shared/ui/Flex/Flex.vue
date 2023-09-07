<script setup lang="ts">
import cls from './Flex.module.scss'
import { toRefs, reactive } from 'vue'

const justifyClasses: Record<FlexJustify, string> = {
  start: cls.justifyStart,
  between: cls.justifyBetween,
  center: cls.justifyCenter,
  end: cls.justifyEnd
}

const alignClasses: Record<FlexAlign, string> = {
  start: cls.alignStart,
  center: cls.alignCenter,
  end: cls.alignEnd
}

const directionClasses: Record<FlexDirection, string> = {
  column: cls.directionColumn,
  row: cls.directionRow
}

const gapClasses: Record<FlexGap, string> = {
  '2': cls.gap2,
  '4': cls.gap4,
  '6': cls.gap6,
  '8': cls.gap8,
  '16': cls.gap16,
  '32': cls.gap32
}

type FlexJustify = 'start' | 'center' | 'end' | 'between'
type FlexAlign = 'center' | 'start' | 'end'
type FlexDirection = 'row' | 'column'
type FlexGap = '2' | '4' | '6' | '8' | '16' | '32'

interface Props {
  justify?: FlexJustify
  align?: FlexAlign
  direction?: FlexDirection
  gap?: FlexGap
  max?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  justify: 'center',
  align: 'center',
  direction: 'row'
})

const { align, direction, gap, justify, max } = toRefs(props)

const classObject = reactive([
  [cls.Flex],
  [justifyClasses[justify.value]],
  [alignClasses[align.value]],
  [directionClasses[direction.value]],
  gap?.value ? [gapClasses[gap.value]] : [],
  { [cls.max]: max }
])
</script>

<template>
  <div :class="classObject">
    <slot></slot>
  </div>
</template>
