import { defineNuxtModule, createResolver } from "@nuxt/kit";
import { fileURLToPath } from "url";
import { dirname, resolve as pathResolve } from "path";

export default defineNuxtModule({
  setup(_options, nuxt) {
    // Get the directory of the module file
    const moduleDir = dirname(fileURLToPath(import.meta.url));

    // Create resolver to resolve relative paths
    const { resolve } = createResolver(moduleDir);

    // Ensure Nitro externals are configured correctly
    nuxt.options.nitro.externals = nuxt.options.nitro.externals || {};
    nuxt.options.nitro.externals.inline =
      nuxt.options.nitro.externals.inline || [];
    nuxt.options.nitro.externals.inline.push(resolve("./module"));

    // Convert the resolved path to an absolute path for the plugin
    const absolutePluginPath = pathResolve(moduleDir, "./runtime/plugin.ts");

    // Register the plugin in the Nuxt content hook
    // @ts-ignore
    nuxt.hook("content:context", (contentContext) => {
      contentContext.transformers.push(absolutePluginPath);
    });
  },
});
