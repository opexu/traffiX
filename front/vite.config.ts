import * as path from 'path';
import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

import { nodePolyfills } from 'vite-plugin-node-polyfills';


/** @type {import('vite').UserConfig} */
export default defineConfig( ( { command, mode, isSsrBuild, isPreview } ) => {
    
    process.env = { ...process.env, ...loadEnv( mode, process.cwd() ) }
    console.log( 'process.env', process.env )

    return {
        plugins: [
            vue(),
            nodePolyfills( {
                include: [],
                exclude: [],
                globals: {
                    Buffer: true,
                    global: true,
                    process: false,
                },
                overrides: {},
                protocolImports: false,
            } ),
        ],
        root: path.resolve( __dirname, './src' ),
        resolve: {
            alias: {
                '@': fileURLToPath( new URL( './src', import.meta.url ) )
            }
        },
        server: {
            host: '127.0.0.1',
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
