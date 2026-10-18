import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // The built app is served from a subdirectory of the club's site,
  // rossmooruu.org/chalice/, so asset URLs have to be relative. Left at the
  // default of '/', Vite emits /assets/… which resolves against the site root
  // and 404s — which is why the checked-in build had those paths hand-edited.
  base: './',
})
