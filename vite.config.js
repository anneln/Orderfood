import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: "images", // ton dossier racine "images"
          dest: ".", // copie dans dist/images
        },
      ],
    }),
  ],
});
