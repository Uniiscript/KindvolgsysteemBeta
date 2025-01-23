import antfu from '@antfu/eslint-config'
import tailwind from 'eslint-plugin-tailwindcss'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  antfu(),
  {
    ignores: ['nuxt.config.ts'],
  },
  ...tailwind.configs[`flat/recommended`],
  {
    rules: {
      'node/prefer-global/process': 'off'
    }
  }
)
