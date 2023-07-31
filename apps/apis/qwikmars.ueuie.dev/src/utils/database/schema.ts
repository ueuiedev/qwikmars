import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const emails = sqliteTable("emails", {
  id: integer("id").primaryKey().unique().notNull(),
  email: text("email", { length: 256 }).unique().notNull(),
});
