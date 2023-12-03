import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
  },
  "chromeWebSecurity": false,
  "hosts": {
    "*.localhost": "127.0.0.1"
  },
})