
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    allowedHosts: [
      '72ea7269-d7f0-46f0-a6b2-6b04caf8d0ad.lovableproject.com',
      '1c77c54c-8e3d-42bd-acb2-dc81cad06f8b.lovableproject.com'
      '117003f8-1b25-4efb-bfbd-ffe73ad40823.lovableproject.com'
    ],
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    sourcemap: true,
    minify: mode !== 'development',
    rollupOptions: {
      output: {
        sourcemapExcludeSources: false
      }
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom']
  }
}));
