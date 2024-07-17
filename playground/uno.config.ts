import { defineConfig, presetIcons, presetUno } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      collections: {
        sheikah: () => import('icon-collection-sheikah/icons.json').then(i => i.default),
      },
    }),
  ],
})
