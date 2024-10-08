<template>
<div class="w-full h-auto flex flex-row">
    <WalletMultiButton >
        <!-- <template #default="modalScope">
            <button class="bg-gradient-to-r from-green-400 to-purple-600" @click="modalScope.openModal()">
                Connect wallet
            </button>
        </template> -->
    </WalletMultiButton>
</div>
</template>

<script setup lang="ts">
import { WalletMultiButton } from 'solana-wallets-vue';

</script>