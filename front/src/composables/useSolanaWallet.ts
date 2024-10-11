import { clusterApiUrl, Connection, PublicKey, SystemProgram, Transaction, LAMPORTS_PER_SOL, sendAndConfirmTransaction, sendAndConfirmRawTransaction } from "@solana/web3.js";
import { useWallet } from "solana-wallets-vue";

const COMMITMENT = 'confirmed'

export function useSolanaWallet() {

    const { publicKey, wallet, disconnect, connected, connecting, signMessage, sendTransaction } = useWallet();

    async function sendSol( amount: number, recipientPublicKey: string ) {

        const net = import.meta.env.VITE_IS_MAINNET === 'true' ? 'mainnet-beta' : 'devnet';
        const connection = new Connection( clusterApiUrl( net ), COMMITMENT );

        if ( !connection || !publicKey?.value || !wallet.value ) {
            throw new Error( 'Wallet is not connected' )
        }

        const instruction = SystemProgram.transfer( {
            fromPubkey: publicKey.value,
            toPubkey: new PublicKey( recipientPublicKey ),
            lamports: amount * LAMPORTS_PER_SOL,
        } );

        const transaction = new Transaction().add( instruction );
        const result = await sendTransaction( transaction, connection );
        console.log( 'result: ', result );
    }

    return { connected, sendSol }
}

// export function useSolanaWallet() {
//     const { publicKey, wallet, disconnect, connected, connecting, signMessage, sendTransaction } = useWallet();

//     async function sendSol( amount: number, recipientPublicKey: string ) {
//         const net = import.meta.env.VITE_IS_MAINNET === 'true' ? 'mainnet-beta' : 'devnet';
//         const connection = new Connection( clusterApiUrl( net ), COMMITMENT );

//         if ( !connection || !publicKey?.value || !wallet.value ) {
//             throw new Error( 'Wallet is not connected' );
//         }

//         // Шаг 1: Получение последнего blockhash для транзакции
//         const blockhashResponse = await connection.getLatestBlockhash( COMMITMENT );

//         // Шаг 2: Создание инструкции перевода
//         const instruction = SystemProgram.transfer( {
//             fromPubkey: publicKey.value,
//             toPubkey: new PublicKey( recipientPublicKey ),
//             lamports: amount * LAMPORTS_PER_SOL,
//         } );

//         // Шаг 3: Создание транзакции
//         const transaction = new Transaction( {
//             feePayer: publicKey.value,
//             blockhash: blockhashResponse.blockhash,
//             lastValidBlockHeight: blockhashResponse.lastValidBlockHeight,
//         } ).add( instruction );

//         try {
//             // Шаг 4: Отправка транзакции с подписью через кошелек
//             const signature = await sendTransaction( transaction, connection, { skipPreflight: false } );

//             // Шаг 5: Ожидание подтверждения транзакции
//             await connection.confirmTransaction( {
//                 signature,
//                 blockhash: blockhashResponse.blockhash,
//                 lastValidBlockHeight: blockhashResponse.lastValidBlockHeight,
//             }, COMMITMENT );

//             console.log( 'Transaction confirmed with signature:', signature );
//         } catch ( error ) {
//             console.error( 'Error sending transaction:', error );
//             throw new Error( 'Transaction failed' );
//         }
//     }

//     return { connected, sendSol };
// }