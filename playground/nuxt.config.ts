import NuxtAsciidocModule from "../src/module";

export default defineNuxtConfig({
  modules: [NuxtAsciidocModule, '@nuxt/content'],
  //  myModule: {},
  devtools: { enabled: true }
})