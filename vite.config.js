import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        host: '0.0.0.0', // Cho phép truy cập từ IP nội bộ
        port: 3001,       // Chạy trên port 3001
        proxy: {
            "/api": {
                target: "http://10.143.0.187:3000/", 
                changeOrigin: true,
            },
        }
    },
});
