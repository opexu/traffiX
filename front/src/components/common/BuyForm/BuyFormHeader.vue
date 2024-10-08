<template>
<div class="relative w-full h-fit flex flex-row items-center justify-start">

    <!-- Фоновое изображение -->
    <img :src="xAccount.avatar_url" draggable="false"
    class="absolute object-cover w-full h-full top-0 left-0 brightness-50 bg-repeat"
    />

    <div class="w-full h-fit p-8 gap-8 flex flex-row items-start justify-start backdrop-blur-lg">
        
        <!-- Фото профиля -->
        <img :src="xAccount.avatar_url" draggable="false"
        class="min-w-20 min-h-20 rounded-full"
        />

        <!-- Никнейм -->
        <div class="w-fit h-full gap-2 flex flex-col">
            <div class="w-fit h-fit gap-2 flex flex-row">
                <img :src="XSvgSrc" draggable="false"
                class="w-9 h-9"
                />
                <h2 class="font-bold text-white text-2xl truncate ...">{{ xAccount.name }}</h2>
            </div>
            
        </div>
    </div>

</div>
</template>

<script setup lang="ts">
import { IXAccount } from '@/types/account';
import XSvgSrc from '@/assets/svg/x.svg';

defineProps<{ xAccount: IXAccount }>();
</script>