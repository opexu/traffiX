<template>
<div class="relative w-full h-fit flex flex-row items-center justify-start">

    <!-- Фоновое изображение -->
    <img :src="xAccount.avatar_url" draggable="false"
    class="absolute object-cover w-full h-full top-0 left-0 brightness-50 bg-repeat"
    />

    <div class="w-full h-fit pt-4 pb-4 px-4 md:pt-8 md:pb-8 md:px-8 gap-8 flex flex-row items-start justify-start backdrop-blur-lg">
        
        <!-- Фото профиля -->
        <img :src="xAccount.avatar_url" draggable="false"
        class="min-w-20 min-h-20 rounded-full"
        />

        <!-- Никнейм -->
        <div class="w-full h-full gap-2 flex flex-col justify-between">
            <div class="w-fit h-fit gap-2 flex flex-row">
                <img :src="XSvgSrc" draggable="false"
                class="w-6 md:w-9 h-6 md:h-9"
                />
                <a class="font-bold text-white text-base md:text-2xl truncate ..." :href="xProfileLink" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()">{{ xAccount.name }}</a>
            </div>
            <div class="w-full h-fit flex flex-col items-start text-sm md:text-base">
                <p><span class="text-sol-400">Followers: </span>{{ formatFollowers }}</p>
                <p><span class="text-sol-400">Average Views: </span>{{ formatAverageViews }}</p>
                <div class="w-fit h-fit flex flex-row items-center justify-center gap-2">
                    <p class="font-bold text-white"><span class="text-sol-400">Price: </span>{{ xAccount.price }}</p>
                    <img class="active:animate-ping" :src="solLogoSrc" alt="Logo" draggable="false"/>
                </div>
            </div>
        </div>
    </div>

</div>
</template>

<script setup lang="ts">
import { IXAccount } from '@/types/account';
import XSvgSrc from '@/assets/svg/x.svg';
import { useXAccountsStore } from '@/stores/xAccountsStore';
import { computed } from 'vue';
import { Utils } from '@/scripts/utils';
import solLogoSrc from '@/assets/svg/solana-sol-logo-1.svg';

const props = defineProps<{ xAccount: IXAccount }>();

const xAccountsStore = useXAccountsStore();

const formatFollowers = computed(() => Utils.formatNumber( props.xAccount.followers_number ) );
const formatAverageViews = computed(() => props.xAccount.average_views ? Utils.formatNumber( props.xAccount.average_views ) : 0 );

const xProfileLink = computed(() => 'https://twitter.com/' + props.xAccount.name );

</script>