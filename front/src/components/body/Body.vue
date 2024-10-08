<template>
<div class="w-full h-fit flex flex-col gap-4">
    <BodyFilters/>
    <template v-for="( account ) in accounts" :key="account.id">
        <Card
        :x-account="account"
        />
    </template>
</div>
</template>

<script setup lang="ts">
import { fakeAccounts } from '@/assets/fake/accounts';
import BodyFilters from '@/components/body/BodyFilters.vue';
import Card from '@/components/common/Card/Card.vue';

const accounts = fakeAccounts( 100 );
</script>