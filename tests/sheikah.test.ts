import { createGenerator, presetIcons } from 'unocss'
import { expect, it } from 'vitest'

it('render', async () => {
  const targets = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    'exclam',
    'hyphen',
    'period',
    'question',
  ].map(c => `i-sheikah-${c}`)
  const generator = await createGenerator({
    presets: [
      presetIcons({
        collections: {
          sheikah: () => import('../packages/sheikah/icons.json').then(i => i.default as any),
        },
      }),
    ],
  })
  const { css } = await generator.generate(targets.join('\n'))
  expect(css).toMatchSnapshot()
})
