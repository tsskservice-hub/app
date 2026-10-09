import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    port: 5173,
    // 💡 ローカル開発時に /api へのリクエストをバックエンドサーバーに転送するプロキシ設定
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // バックエンドの接続先（必要に応じて変更してください）
        changeOrigin: true,
        secure: false,
      },
    },
  },
});