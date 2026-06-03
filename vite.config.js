import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiOrigin = env.VITE_API_URL ? env.VITE_API_URL.replace(/\/+$/, '') : 'http://localhost:5000';
  const proxy = {
    '/api': {
      target: apiOrigin,
      changeOrigin: true,
      secure: false,
    }
  };

  return defineConfig({
    plugins: [react()],
    server: {
      proxy
    }
  });
};
