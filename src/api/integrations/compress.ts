import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

import type { AstroIntegration, AstroIntegrationLogger } from 'astro'
import fg from 'fast-glob'
import kleur from 'kleur'
import sharp from 'sharp'
import svgo from 'svgo'

const SVGO_CONFIG = {
  plugins: ['preset-default'],
  multipass: true,
  js2svg: {
    indent: 0,
    pretty: false
  }
} satisfies svgo.Config

const SHARP_CONFIG = {
  avif: {
    chromaSubsampling: '4:4:4',
    effort: 9.0
  },
  gif: {
    effort: 10.0
  },
  jpeg: {
    chromaSubsampling: '4:4:4',
    mozjpeg: true,
    trellisQuantisation: true,
    overshootDeringing: true,
    optimiseScans: true
  },
  png: {
    compressionLevel: 9.0,
    palette: true
  },
  raw: {},
  tiff: {
    compression: 'lzw'
  },
  webp: {
    effort: 6.0
  }
} satisfies {
  avif: sharp.AvifOptions
  gif: sharp.GifOptions
  jpeg: sharp.JpegOptions
  png: sharp.PngOptions
  raw: sharp.RawOptions
  tiff: sharp.TiffOptions
  webp: sharp.WebpOptions
}

type SharpFormat = keyof typeof SHARP_CONFIG

function formatBytes(bytes: number): string {
  if (bytes === 0) {
    return '0 Bytes'
  }

  const k = 1024
  const index = Math.floor(Math.log(bytes) / Math.log(k))
  const value = parseFloat((bytes / k ** index).toFixed(2))
  const unit = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'][index]

  return `${value} ${unit}`
}

function createMessage(path: string, diff: number): string {
  const formatted = formatBytes(Math.abs(diff))
  const savings = diff < 0 ? kleur.red(`+${formatted}`) : kleur.green(`-${formatted}`)

  return `${kleur.green('✓')} Compressed: ${path} (${savings})`
}

export function compress(): AstroIntegration {
  return {
    name: 'astrocompress',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const cwd = dir.pathname

        const globOptions = {
          cwd,
          dot: true,
          absolute: false
        }

        let totalCount = 0
        let totalSavings = 0

        // Log heading.
        console.log('\n' + kleur.bgGreen(kleur.black(' compressing images ')))

        // Create streams.
        const svgStream = fg.stream('**/*.svg', globOptions)
        const imgStream = fg.stream('**/*.{avif,gif,heif,jpg,jpeg,png,webp}', globOptions)

        // Compress found svg files.
        for await (const path of svgStream) {
          const absolute = join(cwd, path.toString())
          const contents = await readFile(absolute, 'utf-8')
          const output = svgo.optimize(contents, SVGO_CONFIG)

          await writeFile(absolute, output.data, 'utf-8')

          // Log.
          const diff = output.data.length - contents.length

          totalCount += 1
          totalSavings += diff

          logger.info(createMessage(path.toString(), diff))
        }

        // Compress all other image files.
        for await (const path of imgStream) {
          const absolute = join(cwd, path.toString())
          const image = sharp(absolute)

          const { format } = await image.metadata()

          if (format && format in SHARP_CONFIG) {
            const selected = format as SharpFormat
            const buffer = await image.toBuffer()

            const output = sharp(buffer, {
              failOn: 'none',
              sequentialRead: true,
              unlimited: true,
              animated: format === 'gif' || format === 'webp'
            })

            // Overwrite.
            const config = SHARP_CONFIG[selected]
            const processed = await output[selected](config).toFile(absolute)

            // Log.
            const diff = buffer.byteLength - processed.size

            totalCount += 1
            totalSavings += diff

            logger.info(createMessage(path.toString(), diff))
          }
        }

        logger.info(
          kleur.green(
            `✓ Compressed a total of ${totalCount} ${totalCount === 1 ? 'file' : 'files'}` +
              ` saving ${formatBytes(totalSavings)}.\n`
          )
        )
      }
    }
  }
}

export default compress
