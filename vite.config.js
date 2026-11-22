import { defineConfig } from 'vite'
import { resolve } from 'node:path'

const page = (name) => resolve(import.meta.dirname, name)

export default defineConfig({
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
