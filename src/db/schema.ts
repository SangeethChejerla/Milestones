// db/schema.ts
import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const goals = sqliteTable('goals', {
  id: integer('id').primaryKey(),
  goal: text('goal').notNull(),
  year: integer('year').notNull(),
  isComplete: integer('is_complete', { mode: 'boolean' })
    .notNull()
    .default(false),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});
