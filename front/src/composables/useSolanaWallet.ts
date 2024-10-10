import { clusterApiUrl, Connection, PublicKey, SystemProgram, Transaction, LAMPORTS_PER_SOL, sendAndConfirmTransaction, sendAndConfirmRawTransaction } from "@solana/web3.js";
import { useWallet } from "solana-wallets-vue";

const COMMITMENT = 'confirmed'

export function useSolanaWallet(){

    const { publicKey, wallet, disconnect, connected, connecting, signMessage, sendTransaction  } = useWallet();

    async function sendSol( amount: number, recipientPublicKey: string ){
        
        const net = import.meta.env.VITE_IS_MAINNET === 'true' ? 'mainnet-beta' : 'devnet';
        const connection = new Connection( clusterApiUrl( net ), COMMITMENT );

        if ( !connection || !publicKey?.value || !wallet.value ) {
            throw new Error( 'Wallet is not connected' )
        }
        
        const instruction = SystemProgram.transfer({
            fromPubkey: publicKey.value,
            toPubkey: new PublicKey( recipientPublicKey ),
            lamports: amount * LAMPORTS_PER_SOL,
        });

        const transaction = new Transaction().add( instruction );
        const result = await sendTransaction( transaction, connection );
        console.log('result: ', result);
    }

    return { connected, sendSol }
}