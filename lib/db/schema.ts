import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable('users', {
  id: integer({ mode: 'number' }).primaryKey({ autoIncrement: true }),
  username: text().notNull().unique(),
  password: text().notNull(),
  role: text().notNull(),
  // createdAt: text('created_at')
  //   .notNull().default(sql`(CURRENT_TIMESTAMP)`),
  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`(strftime('%s', 'now'))`
  ),
  // updatedAt: text('updated_at')
  //   .notNull().default(sql`(CURRENT_TIMESTAMP)`)
  //   .$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .default(sql`(strftime('%s', 'now'))`)
    .$onUpdate(() => new Date()),
})

export type NewUser = typeof users.$inferInsert;

export const seniors = sqliteTable('seniors', {
  id: integer({ mode: 'number' }).primaryKey({ autoIncrement: true }),
  lastname: text('last_name').notNull(),
  firstname: text('first_name').notNull(),
  middlename: text('middle_name').notNull(),
  gender: text().notNull(),
  address: text().notNull(),
  guardian: text().notNull(),
  contactNumber: text('contact_number').notNull(),
  birthdate: text().notNull(),
  // benefitClaimed: integer('benefit_claimed', { mode: 'boolean' }).notNull().default(false),
  psaCertificate: text('psa_certificate'),
  pwdId: text('pwd_id'),
  seniorId: text('senior_id'),
  philhealthId: text('philhealth_id'),
  userId: integer('user_id').references(() => users.id, { onDelete: 'set null' }).unique(),
  imageUrl: text('image_url'),
  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`(strftime('%s', 'now'))`
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .default(sql`(strftime('%s', 'now'))`)
    .$onUpdate(() => new Date()),
})

export type NewSenior = typeof seniors.$inferInsert;

export const benefits = sqliteTable('benefits', {
  id: integer({ mode: 'number' }).primaryKey({ autoIncrement: true }),
  seniorClaimed: integer('senior_claimed', { mode: 'boolean' }).notNull().default(false),
  seniorDate: text("senior_date"),
  seniorId: integer('senior_id').references(() => seniors.id, { onDelete: 'cascade' }).unique(),
  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`(strftime('%s', 'now'))`
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .default(sql`(strftime('%s', 'now'))`)
    .$onUpdate(() => new Date()),
})

