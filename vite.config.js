import { defineConfig } from 'vite';
import path from 'path';
import svgr from 'vite-plugin-svgr';
import react from '@vitejs/plugin-react-swc';
import mkcert from 'vite-plugin-mkcert';
import fs from 'fs';

// https://vite.dev/config/
export default defineConfig({

  plugins: [react(), svgr()],
  assetsInclude: ['**/*.JPG', '**/*.jpg', '**/*.png', '**/*.jpeg', '**/*.gif'], // 이미지 파일 포함
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      {
        find: '@app',
        replacement: path.resolve(__dirname, 'src/app'),
      },
      {
        find: '@pages',
        replacement: path.resolve(__dirname, 'src/pages'),
      },
      {
        find: '@home',
        replacement: path.resolve(__dirname, 'src/pages/home'),
      },
      {
        find: '@my',
        replacement: path.resolve(__dirname, 'src/pages/my'),
      },
      {
        find: '@login',
        replacement: path.resolve(__dirname, 'src/pages/login'),
      },
      {
        find: '@post',
        replacement: path.resolve(__dirname, 'src/pages/post'),
      },
      {
        find: '@chat',
        replacement: path.resolve(__dirname, 'src/pages/chat'),
      },
      {
        find: '@report',
        replacement: path.resolve(__dirname, 'src/pages/report'),
      },
      {
        find: '@profile',
        replacement: path.resolve(__dirname, 'src/pages/profile'),
      },
      {
        find: '@error',
        replacement: path.resolve(__dirname, 'src/pages/error'),
      },
      {
        find: '@shared',
        replacement: path.resolve(__dirname, 'src/shared'),
      },
      {
        find: '@icon',
        replacement: path.resolve(__dirname, 'src/shared/assets/icon'),
      },
    ],
  },
});
