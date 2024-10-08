<template>
<div class="w-full h-full p-8 flex flex-row items-center justify-start">

    <div class="w-full h-fit gap-4 flex flex-row">
        
        <!-- Левая половина -->
        <div class="w-full h-full gap-4 flex flex-col items-start justify-start">
            <h2 class="font-bold text-xl">Ad Text</h2>
            <textarea name="ad-text" class="w-full h-full min-h-12 p-4 border border-slate-800 rounded-lg bg-inherit focus:ring-2 ring-sol-400 focus:outline-none resize-none"
            placeholder="Write your ad text here"
            :rows="10"
            ></textarea>
        </div>

        <!-- Правая половина -->
        <div class="w-fit h-full gap-4 flex flex-col items-start justify-start">
            <div class="w-fit h-full gap-4 flex flex-col">
                <h2 class="font-bold text-xl">Picture</h2>
                <label for="traffix-img-post" class="relative group w-28 h-28 flex border border-slate-800 hover:border-sol-400 rounded-lg flex-row items-center justify-center cursor-pointer">
                    <img v-if="previewImgSrc"
                    class="w-full h-full rounded-lg"
                    :src="previewImgSrc"/>
                    <BadImageSvg v-else class="fill-slate-800 group-hover:fill-sol-400"/>
                    <button class="absolute w-fit h-fit top-2 right-2 fill-black hover:fill-sol-400"
                    v-if="previewImgSrc"
                    @click.prevent="previewImgSrc = null"
                    >
                        <CloseSvg/>
                    </button>

                </label>
                <input id="traffix-img-post" ref="adImageRef" name="ad-image" type="file" class="hidden" accept="image/*"
                @change="onPickImage"
                />
            </div>
            <div class="w-fit h-fit flex flex-col items-start justify-start text-sm font-extralight whitespace-nowrap">
                <p>NSFW is not allowed</p>
                <p>- no refunds</p>
            </div>
        </div>

    </div>

</div>
</template>

<script setup lang="ts">
import { IXAccount } from '@/types/account';
import BadImageSvg from '@/assets/svg/BadImageSvg.vue';
import { ref } from 'vue';
import CloseSvg from '@/assets/svg/CloseSvg.vue';

defineProps<{ xAccount: IXAccount }>();
const adImageRef = ref<HTMLInputElement>();
const previewImgSrc = ref<string|null>(null);

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

    const reader = new FileReader();
    
    reader.addEventListener('load', ( event ) => {
        previewImgSrc.value = reader.result as string;
        adImageRef.value!.value = '';
    });
    reader.readAsDataURL( file );
}
</script>