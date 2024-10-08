<template>
<Teleport to="body">
<Transition name="fade" mode="out-in">
<div class="fixed radial-gradient w-screen h-screen top-0 left-0 p-2 backdrop-blur-lg bg-opacity-50 flex flex-row items-center justify-center"
v-if="show"
>
    <slot></slot>
</div>
</Transition>
</Teleport>
</template>

<script setup lang="ts">
defineProps<{ show: boolean }>()
</script>

<style scoped>
.radial-gradient {
    background-image: radial-gradient(circle, rgba(255,255,255,0.5), rgba(0,0,0,0.5));
}
.fade-enter-active {
    @apply transition ease-out duration-300 transform;
}
.fade-enter-from {
    @apply opacity-0;
}
.fade-enter-to {
    @apply opacity-100 translate-y-0 scale-100;
}
.fade-leave-active {
    @apply ease-in duration-200;
}
.fade-leave-from {
    @apply opacity-100 translate-y-0 scale-100;
}
.fade-leave-to {
    @apply opacity-0 translate-y-0;
}

</style>