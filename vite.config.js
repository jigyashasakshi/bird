import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        about: 'about.html',
        services: 'services.html',
        gallery: 'gallery.html',
        contact: 'contact.html',
        blog: 'blog/index.html',
        '404': '404.html'
      }
    }
  }
})