import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(
    sql`ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "featured" boolean DEFAULT false;`,
  )
  await db.execute(
    sql`ALTER TABLE "_posts_v" ADD COLUMN IF NOT EXISTS "version_featured" boolean DEFAULT false;`,
  )
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`ALTER TABLE "posts" DROP COLUMN IF EXISTS "featured";`)
  await db.execute(sql`ALTER TABLE "_posts_v" DROP COLUMN IF EXISTS "version_featured";`)
}
