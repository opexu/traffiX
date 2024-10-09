import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import SolanaWallets, { initWallet } from "solana-wallets-vue";
import "solana-wallets-vue/styles.css";
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
            import.meta.env.VITE_NODE_ENV === 'dev'
                ? WalletAdapterNetwork.Devnet 
                : WalletAdapterNetwork.Mainnet
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
