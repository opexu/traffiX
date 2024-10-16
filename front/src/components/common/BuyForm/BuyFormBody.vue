<template>
<div class="w-full h-fit p-4 md:p-8 gap-4 flex flex-col items-center justify-start">

    <div class="w-full h-fit flex flex-row items-start justify-start text-slate-400 text-xs md:text-base">
        <p>Get buzz with <span class="text-sol-400">{{ xAccount.name }}</span> for his/her <span class="text-sol-400">{{ formatFollowers }}</span> followers!</p>
    </div>

    <div class="w-full h-fit gap-4 flex flex-row">
        
        <!-- Левая половина -->
        <div class="w-full h-full gap-4 flex flex-col items-start justify-start">
            <h2 class="font-bold text-base md:text-xl">Ad Text</h2>
            <textarea name="text" class="w-full h-40 p-4 border border-slate-800 text-xs rounded-lg bg-inherit focus:ring-2 ring-sol-400 focus:outline-none resize-none"
            placeholder="Add text here about your Token to be placed in his/her X feed!"
            :rows="10"
            v-model="textModel"
            ></textarea>
        </div>

        <!-- Правая половина -->
        <div class="w-fit h-full gap-4 flex flex-col items-start justify-start">
            <h2 class="font-bold text-base md:text-xl">Picture</h2>
            <label for="traffix-img-post" class="relative group w-14 h-14 md:w-28 md:h-28 flex border border-slate-800 hover:border-sol-400 rounded-lg flex-row items-center justify-center cursor-pointer">
                <img v-if="previewImgSrc"
                class="w-full h-full rounded-lg"
                :src="previewImgSrc"/>
                <BadImageSvg v-else class="fill-slate-800 group-hover:fill-sol-400"/>
                <button class="absolute w-fit h-fit top-2 right-2 fill-black hover:fill-sol-400"
                v-if="previewImgSrc"
                @click.prevent="clearImage"
                >
                    <CloseSvg/>
                </button>
            </label>
            <input id="traffix-img-post" ref="adImageRef" name="file" type="file" class="hidden" accept="image/*"
            @change="onPickImage"
            />
            <p class="text-xs font-extralight whitespace-normal md:whitespace-pre">NSFW is not allowed <br>- no refunds</p>
        </div>

    </div>

</div>
</template>

<script setup lang="ts">
import { IXAccount } from '@/types/account';
import BadImageSvg from '@/assets/svg/BadImageSvg.vue';
import { computed, ref } from 'vue';
import CloseSvg from '@/assets/svg/CloseSvg.vue';
import { Utils } from '@/scripts/utils';
import { useBreakpoints } from '@vueuse/core';

const fileRef = defineModel<File|null>('file');
const textModel = defineModel<string>('text');
const props = defineProps<{ xAccount: IXAccount }>();
const adImageRef = ref<HTMLInputElement>();
const previewImgSrc = ref<string|null>(null);

const formatFollowers = computed(() => Utils.formatNumber( props.xAccount.followers_number ) );

function onPickImage( event: Event ){

    if( !adImageRef.value ){
        console.warn('input image undefined');
        return;
    }

    if( !adImageRef.value.files?.length ) {
        console.warn('image file undefined');
        adImageRef.value.value = '';
        return;
    }

    const file = adImageRef.value.files[0];
    if( !file ){
        console.warn('file undefined');
        adImageRef.value.value = '';
        return;
    }

    fileRef.value = file;
    const reader = new FileReader();
    
    reader.addEventListener('load', ( event ) => {
        previewImgSrc.value = reader.result as string;
        adImageRef.value!.value = '';
    });
    reader.readAsDataURL( file );
}

function clearImage(){
    previewImgSrc.value = null; 
    adImageRef.value!.value = '';
    fileRef.value = null;
}

const breakpoints = useBreakpoints({
  mobile: 0, // optional
  tablet: 768,
  laptop: 1024,
  desktop: 1280,
})

// true or false
const isMobile = breakpoints.between('mobile', 'tablet');
</script>