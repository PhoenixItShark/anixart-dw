import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const userAgent =
    env.VITE_USER_AGENT ||
    'AnixartApp/9.0 BETA 9-25110702 (Android 16; SDK 36; x86_64; Google sdk_gphone64_x86_64; en)';

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        // Основной алиас
        '@': path.resolve(__dirname, 'src'),

        // FSD-алиасы (точно как в tsconfig.app.json)
        '@app': path.resolve(__dirname, 'src/app'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@widgets': path.resolve(__dirname, 'src/widgets'),
        '@features': path.resolve(__dirname, 'src/features'),
        '@entities': path.resolve(__dirname, 'src/entities'),
        '@shared': path.resolve(__dirname, 'src/shared'),

        // Если используете серверный алиас
        '@server': path.resolve(__dirname, '../server/src'),
      },
    },
    server: {
      proxy: {
        // Мутирующие запросы (POST/лайки) сервер режет по браузерному User-Agent,
        // поэтому в dev ходим через прокси, который подменяет UA на приложенный.
        '/api': {
          target: 'https://api-s.anixsekai.com',
          changeOrigin: true,
          secure: true,
          rewrite: (p) => p.replace(/^\/api/, ''),
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              proxyReq.setHeader('User-Agent', userAgent);
            });
          },
        },
      },
    },
  };
});