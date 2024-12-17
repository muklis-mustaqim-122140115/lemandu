import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.tsx',
            refresh: true,
        }),
        react(),
    ],
    server:{
        host:"https://lemandu-production.up.railway.app",
        https: true,
    },
    // server:{
    //     https: false,
    // },
});
