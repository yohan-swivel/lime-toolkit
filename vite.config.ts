import { defineConfig } from 'vite'
export default defineConfig({
  plugins: [
  ],
  build: {
    minify: false,
    outDir: './dist',
    emptyOutDir: true,
    rollupOptions: {
      input: './src/index.ts',
      output: {
        format: 'iife',
        entryFileNames: `[name].js`,
      },
      plugins: [
      ],
    }
  },
})