import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "sites" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"url" varchar,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "posts" ADD COLUMN "category_tag" varchar;
  ALTER TABLE "posts" ADD COLUMN "site_id" integer;
  ALTER TABLE "_posts_v" ADD COLUMN "version_category_tag" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_site_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "sites_id" integer;
  CREATE UNIQUE INDEX "sites_slug_idx" ON "sites" USING btree ("slug");
  CREATE INDEX "sites_updated_at_idx" ON "sites" USING btree ("updated_at");
  CREATE INDEX "sites_created_at_idx" ON "sites" USING btree ("created_at");
  ALTER TABLE "posts" ADD CONSTRAINT "posts_site_id_sites_id_fk" FOREIGN KEY ("site_id") REFERENCES "public"."sites"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_site_id_sites_id_fk" FOREIGN KEY ("version_site_id") REFERENCES "public"."sites"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_sites_fk" FOREIGN KEY ("sites_id") REFERENCES "public"."sites"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "posts_site_idx" ON "posts" USING btree ("site_id");
  CREATE INDEX "_posts_v_version_version_site_idx" ON "_posts_v" USING btree ("version_site_id");
  CREATE INDEX "payload_locked_documents_rels_sites_id_idx" ON "payload_locked_documents_rels" USING btree ("sites_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "sites" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "sites" CASCADE;
  ALTER TABLE "posts" DROP CONSTRAINT "posts_site_id_sites_id_fk";
  
  ALTER TABLE "_posts_v" DROP CONSTRAINT "_posts_v_version_site_id_sites_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_sites_fk";
  
  DROP INDEX "posts_site_idx";
  DROP INDEX "_posts_v_version_version_site_idx";
  DROP INDEX "payload_locked_documents_rels_sites_id_idx";
  ALTER TABLE "posts" DROP COLUMN "category_tag";
  ALTER TABLE "posts" DROP COLUMN "site_id";
  ALTER TABLE "_posts_v" DROP COLUMN "version_category_tag";
  ALTER TABLE "_posts_v" DROP COLUMN "version_site_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "sites_id";`)
}
