<template>
<div>
    <p ref="textRef" class="font-bold text-2xl text-white text-center">{{ trgText }}</p>
</div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

const props = defineProps<{
    text: string,
    interval?: number, // ms
}>();

const srcText = ref( props.text );
const trgText = ref( '' );
let interval: NodeJS.Timeout;
onMounted(() => {
    if( interval ) clearInterval( interval );
    interval = setInterval(() => {
        calcText();
    }, props.interval ?? 100 )
});

onUnmounted(() => {
    if( interval ) clearInterval( interval );
})
let iteration = 0;
function calcText(){
    if( iteration >= srcText.value.length ) {
        clearInterval( interval );
        return;
    }
    trgText.value += srcText.value[ iteration ];
    iteration++;
}
</script>