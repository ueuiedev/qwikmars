import type { Config } from "drizzle-kit";

export default {
  schema: "./src/utils/database/schema.ts",
  out: "./drizzle",
} satisfies Config;
