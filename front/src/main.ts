import "solana-wallets-vue/styles.css";
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import SolanaWallets, { initWallet } from "solana-wallets-vue";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
    CloverWalletAdapter,
    PhantomWalletAdapter,
    SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";

const walletOptions = {
    wallets: [
        new PhantomWalletAdapter(),
        new CloverWalletAdapter(),
        new SolflareWalletAdapter( { network:
            import.meta.env.VITE_IS_MAINNET === 'true'
                ? WalletAdapterNetwork.Mainnet 
                : WalletAdapterNetwork.Devnet
        } ),
    ],
    autoConnect: true,
};

// initWallet( walletOptions );

const app = createApp( App );

app.use( createPinia() );
app.use( router );
app.use( SolanaWallets, walletOptions );
app.mount( '#app' );
