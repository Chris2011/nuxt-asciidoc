import { defineTransformer } from "@nuxt/content/transformers";
import asciidoctor from "asciidoctor";

export default defineTransformer({
  name: "asciidoc-transformer",
  extensions: [".ad", ".asc", ".adoc", ".asciidoc"],
  parse: async (_id, content) => {
    const parsed = asciidoctor().convert(content);

    return {
      _id,
      body: parsed,
    };
  },
});