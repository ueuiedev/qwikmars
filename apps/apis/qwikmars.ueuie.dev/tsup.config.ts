import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src/routes/trpc/utils/type/index.ts"],
  outDir: "./dist.type",
  format: ["cjs", "esm"],
  sourcemap: true,
  clean: true,
  dts: true,
});
