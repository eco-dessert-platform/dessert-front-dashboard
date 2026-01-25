import type { StorybookConfig } from '@storybook/react-vite'
import path from 'path'
import { fileURLToPath } from 'url'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  async viteFinal(config) {
    const { default: tailwindcss } = await import('@tailwindcss/vite')
    const { default: svgr } = await import('vite-plugin-svgr')
    const dirname = path.dirname(fileURLToPath(import.meta.url))

    // Tailwind CSS 플러그인 추가
    config.plugins = config.plugins || []
    config.plugins.push(tailwindcss())
    config.plugins.push(svgr())

    // 경로 별칭 설정
    config.resolve = config.resolve || {}
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(dirname, '../src'),
    }

    return config
  },
}

export default config
