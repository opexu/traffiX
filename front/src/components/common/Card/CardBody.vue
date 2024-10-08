<template>
<div class="w-full h-fit">
    <p>{{ description ?? '' }}</p>
</div>

</template>

<script setup lang="ts">

defineProps<{ description?: string }>();
</script>