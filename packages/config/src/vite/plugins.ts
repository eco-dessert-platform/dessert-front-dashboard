import fs, { copyFileSync } from 'fs'
import path, { resolve } from 'path'

import type { Plugin } from 'vite'

// 폰트를 자동으로 preload하는 플러그인
// appRoot: 각 앱의 루트 경로(__dirname)를 받아 앱별 fonts 디렉토리를 참조
export function fontPreloadPlugin(appRoot: string): Plugin {
  return {
    name: 'vite-font-preload',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        const fontDir = path.resolve(appRoot, 'src/assets/fonts')
        const preloadLinks: string[] = []
        const usedFonts = getUsedFonts(html)

        function walk(dir: string) {
          const files = fs.readdirSync(dir)

          for (const file of files) {
            const fullPath = path.join(dir, file)
            const stat = fs.statSync(fullPath)

            if (stat.isDirectory()) {
              walk(fullPath)
            } else if (file.endsWith('.woff') || file.endsWith('.woff2')) {
              const publicPath = fullPath.split('assets')[1].replace(/\\/g, '/')
              const type = file.endsWith('.woff2') ? 'font/woff2' : 'font/woff'
              const fontName = file.split('.')[0]

              if (usedFonts.includes(fontName.toLowerCase())) {
                preloadLinks.push(
                  `<link rel="preload" href="/assets${publicPath}" as="font" type="${type}" crossorigin>`,
                )
              }
            }
          }
        }

        if (!fs.existsSync(fontDir)) {
          return html
        }
        walk(fontDir)
        return html.replace('</head>', preloadLinks.join('\n') + '\n</head>')
      },
    },
  }
}

// 커스텀 플러그인: 빌드 후 robots.txt 복사
// appRoot: 각 앱의 루트 경로(__dirname)를 받아 앱별 robots.txt를 참조
export function copyRobotsTxt(appRoot: string): Plugin {
  return {
    name: 'copy-robots-txt',
    closeBundle() {
      const distPath = resolve(appRoot, 'dist')
      const robotsPath = resolve(appRoot, 'robots.txt')
      const targetPath = resolve(distPath, 'robots.txt')

      if (fs.existsSync(distPath) && fs.existsSync(robotsPath)) {
        copyFileSync(robotsPath, targetPath)
      }
    },
  }
}

// HTML에서 사용된 폰트를 추출하는 함수
function getUsedFonts(html: string): string[] {
  const fontRegex = /font-family:\s*['"]?([^;'"]+)['"]?/g
  const usedFonts: string[] = []
  let match
  while ((match = fontRegex.exec(html)) !== null) {
    usedFonts.push(match[1].toLowerCase())
  }
  return usedFonts
}
