import { resolve } from 'path'
import { defineNuxtModule, createResolver } from '@nuxt/kit'

export default defineNuxtModule({
  setup(_options, nuxt) {
    // Create resolver to resolve relative paths
    // TODO: A new @nuxt/content transformer is also just a nuxt-module
    // TODO: Missing in the @nuxt/content doc
    const { resolve } = createResolver(import.meta.url)

    nuxt.options.nitro.externals = nuxt.options.nitro.externals || {}
    nuxt.options.nitro.externals.inline = nuxt.options.nitro.externals.inline || []
    nuxt.options.nitro.externals.inline.push(resolve('./module'))

    // @ts-ignore
    nuxt.hook('content:context', (contentContext) => {
      contentContext.transformers.push(resolve('./runtime/plugin.ts'))
    })
  }
})