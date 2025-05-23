import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import svgSpritePlugin from "@pivanov/vite-plugin-svg-sprite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgSpritePlugin({
      // eslint-disable-next-line no-undef
      iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
      symbolId: "icon-[name]",
      svgDomId: "svg-sprite",
      inject: "body-first",
    }),
  ],
});