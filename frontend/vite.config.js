import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev
export default defineConfig({
  plugins: [react()],
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          // Splitting threshold set to 20KB
          minSize: 20000, 
          groups: [
            {
              // Group foundational React runtime tools
              name: 'react-vendor',
              test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/,
              priority: 20,
            },
            {
              // Isolate Chakra UI v3 and its styled-system engine
              name: 'chakra-vendor',
              test: /[\\/]node_modules[\\/](@chakra-ui|@emotion)[\\/]/,
              priority: 10,
            },
          ],
        },
      },
    },
  },
})
