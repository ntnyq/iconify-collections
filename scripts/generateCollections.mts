import { promises as fs } from 'node:fs'
import { isEmptyColor, parseColors } from '@iconify/tools/lib/colors/parse'
import { importDirectory } from '@iconify/tools/lib/import/directory'
import { runSVGO } from '@iconify/tools/lib/optimise/svgo'
import { cleanupSVG } from '@iconify/tools/lib/svg/cleanup'

async function generateIconCollection(prefix: string) {
  // Import icons
  const iconSet = await importDirectory(`data/${prefix}`, { prefix })

  // Validate, clean up, fix palette and optimise
  await iconSet.forEach(async (name, type) => {
    if (type !== 'icon') {
      return
    }

    const svg = iconSet.toSVG(name)
    if (!svg) {
      // Invalid icon
      iconSet.remove(name)
      return
    }

    // Clean up and optimise icons
    try {
      cleanupSVG(svg)
      parseColors(svg, {
        defaultColor: 'currentColor',
        callback: (_attr, colorStr, color) => {
          return !color || isEmptyColor(color) ? colorStr : 'currentColor'
        },
      })
      runSVGO(svg)
    } catch (err) {
      // Invalid icon
      console.error(`Error parsing ${name}:`, err)
      iconSet.remove(name)
      return
    }

    // Update icon
    iconSet.fromSVG(name, svg)
  })

  // Export as IconifyJSON
  const exported = `${JSON.stringify(iconSet.export(), null, '\t')}\n`

  // Save to file
  await fs.writeFile(`packages/${iconSet.prefix}/icons.json`, exported, 'utf8')
}

try {
  await Promise.all([generateIconCollection('sheikah')])
} catch (err) {
  console.log(err)
}
