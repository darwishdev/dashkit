import { configDefaults, defineConfig } from 'vitest/config'
import viteConfig from './vite.config'
import { mergeConfig } from 'vite'

export default mergeConfig(
    viteConfig,
    defineConfig({
        test: {
            globals: true,
            environment: 'happy-dom',
            coverage: {
                reporter: ['text', 'json', 'html'],
            },
            exclude: [...configDefaults.exclude, 'e2e/*'],
            transformMode: {
                web: [/\.[jt]sx$/]
            }

        },
    }))