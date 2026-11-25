import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import seoPlugin from './seo-plugin.js'

const page = (name) => resolve(import.meta.dirname, name)

export default defineConfig({
  plugins: [seoPlugin()],
  build: {
    rolldownOptions: {
      input: {
        home: page('index.html'),
        about: page('about.html'),
        menu: page('menu.html'),
        services: page('services.html'),
        gallery: page('gallery.html'),
        contact: page('contact.html'),
      },
    },
  },
})
