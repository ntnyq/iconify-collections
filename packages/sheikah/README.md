# icon-collection-sheikah

This package contains icon data for Sheikah icon set.

## Install

```shell
npm i icon-collection-sheikah -D
```

```shell
yarn add icon-collection-sheikah -D
```

```shell
pnpm add icon-collection-sheikah -D
```

## Usage

Icon data can be parsed with various tools, see [Iconify documentation](https://docs.iconify.design/icons/json.html).

### UnoCSS

```ts
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
```

## Files

- Icon data is stored in `icons.json` in `IconifyJSON` format. See [IconifyJSON documentation](https://docs.iconify.design/types/iconify-json.html).
- Icon set information is stored in `info.json` in `IconifyInfo` format. See [IconifyInfo documentation](https://docs.iconify.design/types/iconify-info.html).

## License

[MIT](./LICENSE) License © 2023-PRESENT [ntnyq](https://github.com/ntnyq)
