import { createResolver, defineNuxtModule } from "@nuxt/kit";
import { fileURLToPath, pathToFileURL } from "url";
import { dirname } from "path";

export default defineNuxtModule({
  setup(_options, nuxt) {
    // Use file URLs for import paths to avoid Windows path issues
    // Convert import.meta.url to a file path using fileURLToPath
    const moduleDir = dirname(fileURLToPath(import.meta.url));

    // Create resolver to resolve relative paths
    const { resolve } = createResolver(moduleDir);

    // Convert resolved path to file URL format
    const pluginFileURL = pathToFileURL(resolve("./runtime/plugin")).href;

    // @ts-ignore
    nuxt.hook("content:context", (contentContext) => {
      contentContext.transformers.push(pluginFileURL);
    });
  },
});
