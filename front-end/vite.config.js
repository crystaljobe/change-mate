import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: 'es2020'
},
optimizeDeps: {
    esbuildOptions : {
        target: "es2020"
    },
    needsInterop : ["@mapbox/mapbox-gl-directions"]
},
  plugins: [react()],
})
