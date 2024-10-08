import * as path from 'path';
import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

/** @type {import('vite').UserConfig} */
export default defineConfig( ( { command, mode, isSsrBuild, isPreview } ) => {
    
    process.env = { ...process.env, ...loadEnv( mode, process.cwd() ) }
    console.log( 'process.env', process.env )

    return {
        plugins: [
            vue(),
        ],
        root: path.resolve( __dirname, './src' ),
        resolve: {
            alias: {
                '@': fileURLToPath( new URL( './src', import.meta.url ) )
            }
        },
        server: {
            port: parseInt( process.env.VITE_FRONT_PORT || '8080' ),
            watch: {
                usePolling: true,
            }
        },
        build: {
            outDir: '../dist',
            emptyOutDir: true,
        },
    }
    
} );
