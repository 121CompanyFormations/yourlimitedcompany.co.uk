import { defineConfig, loadEnv } from 'vite'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = dirname(fileURLToPath(import.meta.url))

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const base = env.VITE_BASE_PATH || './'
  const gsc = (env.VITE_GSC_VERIFICATION || '').trim()

  return {
    base,
    build: {
      rollupOptions: {
        input: {
          main: resolve(rootDir, 'index.html'),
          privacy: resolve(rootDir, 'privacy.html'),
          cookies: resolve(rootDir, 'cookies.html'),
        },
      },
    },
    plugins: [
      {
        name: 'inject-site-meta',
        transformIndexHtml(html) {
          const tags: string[] = []
          if (gsc) {
            tags.push(
              `<meta name="google-site-verification" content="${gsc.replace(/"/g, '')}" />`,
            )
          }
          if (!tags.length) return html
          return html.replace('</head>', `    ${tags.join('\n    ')}\n  </head>`)
        },
      },
    ],
  }
})
