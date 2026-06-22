import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor', 'verified-buyer', 'viewer');
  CREATE TYPE "public"."enum_media_asset_class" AS ENUM('vineyard-winery', 'orchard', 'cattle-ranch', 'real-estate', 'platform', 'map-diagram');
  CREATE TYPE "public"."enum_media_province" AS ENUM('mendoza', 'san-juan', 'salta', 'patagonia', 'buenos-aires-province');
  CREATE TYPE "public"."enum_assets_strategic_rationale_tags" AS ENUM('yield-focused', 'long-term-value', 'vertical-integration', 'land-appreciation', 'production-continuity');
  CREATE TYPE "public"."reliability" AS ENUM('year-round', 'seasonal');
  CREATE TYPE "public"."enum_assets_gated_full_due_diligence_document_type" AS ENUM('title', 'water-rights', 'financials', 'agronomic', 'environmental', 'regulatory', 'senasa', 'other');
  CREATE TYPE "public"."enum_assets_operational_status" AS ENUM('raw', 'partial', 'fully-operational', 'sold-off-market');
  CREATE TYPE "public"."enum_assets_summary_view_productive_area_unit" AS ENUM('hectares', 'acres');
  CREATE TYPE "public"."enum_assets_expanded_view_water_rights_status" AS ENUM('registered-confirmed', 'registered-pending', 'unregistered', 'not-applicable');
  CREATE TYPE "public"."enum_articles_category" AS ENUM('regulatory-updates', 'macroeconomic-analysis', 'asset-class-intelligence', 'decree-524-2025', 'market-conditions');
  CREATE TYPE "public"."enum_faqs_category" AS ENUM('general', 'citizenship-residency', 'vineyards-wineries', 'orchards', 'cattle-ranches', 'advisory', 'execution', 'qualification', 'regulatory');
  CREATE TYPE "public"."enum_service_pages_service_type" AS ENUM('advisory', 'execution', 'origination');
  CREATE TYPE "public"."enum_inquiries_property_inquiry_property_type" AS ENUM('vineyards-wineries', 'orchards', 'cattle-ranches', 'real-estate');
  CREATE TYPE "public"."enum_inquiries_property_inquiry_province_preference" AS ENUM('mendoza', 'san-juan', 'salta', 'patagonia', 'buenos-aires-province', 'all');
  CREATE TYPE "public"."enum_inquiries_inquiry_type" AS ENUM('property-inquiry', 'advisory-support', 'execution-planning', 'residency-citizenship', 'general-inquiry', 'qualification-request', 'off-market-criteria', 'newsletter', 'project-scope');
  CREATE TYPE "public"."enum_inquiries_preferred_response_method" AS ENUM('email', 'phone', 'whatsapp');
  CREATE TYPE "public"."enum_inquiries_property_inquiry_operational_preference" AS ENUM('operational', 'development', 'either');
  CREATE TYPE "public"."enum_inquiries_property_inquiry_budget_range" AS ENUM('500k-1m', '1m-2m', '2m-5m', '5m-10m', '10m-plus');
  CREATE TYPE "public"."enum_inquiries_property_inquiry_timeline" AS ENUM('active', '3-6-months', '6-12-months', '12-months-plus');
  CREATE TYPE "public"."enum_inquiries_qualification_request_investment_scope" AS ENUM('500k-1m', '1m-2m', '2m-5m', '5m-plus');
  CREATE TYPE "public"."enum_inquiries_project_scope_property_type" AS ENUM('vineyard', 'winery', 'pistachio-orchard', 'olive-orchard', 'cattle-ranch', 'mixed-agriculture', 'real-estate');
  CREATE TYPE "public"."enum_inquiries_project_scope_support_level" AS ENUM('advisory-only', 'full-execution', 'undetermined');
  CREATE TYPE "public"."enum_inquiries_project_scope_timeline" AS ENUM('0-12', '12-24', '24-plus');
  CREATE TYPE "public"."enum_inquiries_project_scope_current_status" AS ENUM('raw', 'partial', 'operational');
  CREATE TYPE "public"."enum_inquiries_crm_sync_state" AS ENUM('pending', 'synced', 'failed', 'skipped');
  CREATE TYPE "public"."enum_inquiries_status" AS ENUM('new', 'in-review', 'qualification-sent', 'verified-buyer', 'active-acquisition', 'closed-acquired', 'closed-no-fit', 'unsubscribed');
  CREATE TYPE "public"."enum_pages_page_type" AS ENUM('home', 'citizenship-residency', 'vineyards-wineries', 'investment-opportunities', 'advisory', 'execution', 'about-insights', 'contact', 'custom');
  CREATE TABLE IF NOT EXISTS "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"first_name" varchar NOT NULL,
  	"last_name" varchar NOT NULL,
  	"role" "enum_users_role" DEFAULT 'viewer' NOT NULL,
  	"organisation" varchar,
  	"country" varchar,
  	"verified_at" timestamp(3) with time zone,
  	"notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"caption" varchar,
  	"asset_class" "enum_media_asset_class",
  	"province" "enum_media_province",
  	"prefix" varchar DEFAULT 'media',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_hero_url" varchar,
  	"sizes_hero_width" numeric,
  	"sizes_hero_height" numeric,
  	"sizes_hero_mime_type" varchar,
  	"sizes_hero_filesize" numeric,
  	"sizes_hero_filename" varchar,
  	"sizes_og_url" varchar,
  	"sizes_og_width" numeric,
  	"sizes_og_height" numeric,
  	"sizes_og_mime_type" varchar,
  	"sizes_og_filesize" numeric,
  	"sizes_og_filename" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "assets_strategic_rationale_tags" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_assets_strategic_rationale_tags",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "assets_expanded_view_infrastructure" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "assets_vineyard_winery_data_varietal_mix" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"varietal" varchar,
  	"hectares" numeric,
  	"percentage" numeric
  );
  
  CREATE TABLE IF NOT EXISTS "assets_cattle_ranch_data_water_sources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"source" varchar NOT NULL,
  	"seasonal_reliability" "reliability"
  );
  
  CREATE TABLE IF NOT EXISTS "assets_gated_full_due_diligence" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"document_id" integer NOT NULL,
  	"document_type" "enum_assets_gated_full_due_diligence_document_type",
  	"label" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "assets_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "assets" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"asset_class_id" integer NOT NULL,
  	"province_id" integer NOT NULL,
  	"region" varchar NOT NULL,
  	"total_hectares" numeric NOT NULL,
  	"operational_status" "enum_assets_operational_status" NOT NULL,
  	"entity_declaration" varchar NOT NULL,
  	"summary_view_productive_area" numeric,
  	"summary_view_productive_area_unit" "enum_assets_summary_view_productive_area_unit" DEFAULT 'hectares',
  	"summary_view_annual_output" varchar,
  	"summary_view_annual_output_unit" varchar,
  	"expanded_view_asset_age" varchar,
  	"expanded_view_density" varchar,
  	"expanded_view_water_rights_status" "enum_assets_expanded_view_water_rights_status",
  	"expanded_view_water_rights_detail" varchar,
  	"expanded_view_regional_advantage" varchar,
  	"vineyard_winery_data_planted_area" numeric,
  	"vineyard_winery_data_vine_age" varchar,
  	"vineyard_winery_data_annual_yield_kg" numeric,
  	"vineyard_winery_data_annual_cases" numeric,
  	"vineyard_winery_data_winery_included" boolean DEFAULT false,
  	"vineyard_winery_data_winery_detail" varchar,
  	"vineyard_winery_data_brand_included" boolean DEFAULT false,
  	"vineyard_winery_data_export_relationships" boolean DEFAULT false,
  	"vineyard_winery_data_existing_team" boolean DEFAULT false,
  	"vineyard_winery_data_commercial_context" varchar,
  	"orchard_data_crop_type" varchar,
  	"orchard_data_planted_area" numeric,
  	"orchard_data_tree_age" varchar,
  	"orchard_data_planting_density" varchar,
  	"orchard_data_annual_production_tonnes" numeric,
  	"orchard_data_export_licensing" boolean DEFAULT false,
  	"orchard_data_soil_classification" varchar,
  	"orchard_data_cold_storage" boolean DEFAULT false,
  	"orchard_data_additional_plantable_ha" numeric,
  	"cattle_ranch_data_species" varchar,
  	"cattle_ranch_data_carrying_capacity_head" numeric,
  	"cattle_ranch_data_current_head_count" numeric,
  	"cattle_ranch_data_improved_pasture_ha" numeric,
  	"cattle_ranch_data_natural_pasture_ha" numeric,
  	"cattle_ranch_data_soil_classification" varchar,
  	"cattle_ranch_data_staffed_and_operational" boolean DEFAULT false,
  	"cattle_ranch_data_land_appreciation_context" varchar,
  	"due_diligence_snapshot" jsonb,
  	"advisory_module_id" integer,
  	"execution_module_id" integer,
  	"gated_financials" jsonb,
  	"gated_information_memorandum_id" integer,
  	"hero_image_id" integer,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"published" boolean DEFAULT false,
  	"featured_on_home" boolean DEFAULT false,
  	"published_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "asset_classes" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"category_page_url" varchar,
  	"description" varchar,
  	"icon" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "provinces_regions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "provinces" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "articles_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "articles" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"entity_declaration" varchar NOT NULL,
  	"excerpt" varchar,
  	"body" jsonb NOT NULL,
  	"category" "enum_articles_category",
  	"hero_image_id" integer,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"published" boolean DEFAULT false,
  	"published_at" timestamp(3) with time zone,
  	"author" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "articles_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"faqs_id" integer,
  	"assets_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "faqs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" jsonb NOT NULL,
  	"category" "enum_faqs_category",
  	"sort_order" numeric DEFAULT 0,
  	"published" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "service_pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"service_type" "enum_service_pages_service_type" NOT NULL,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"hero_h1" varchar,
  	"hero_h2" varchar,
  	"body" jsonb,
  	"published" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "service_pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"faqs_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "inquiries_property_inquiry_property_type" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_inquiries_property_inquiry_property_type",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "inquiries_property_inquiry_province_preference" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_inquiries_property_inquiry_province_preference",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "inquiries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"inquiry_type" "enum_inquiries_inquiry_type" NOT NULL,
  	"full_name" varchar NOT NULL,
  	"entity_name" varchar,
  	"email" varchar NOT NULL,
  	"phone" varchar,
  	"country" varchar,
  	"description" varchar,
  	"preferred_response_method" "enum_inquiries_preferred_response_method",
  	"property_inquiry_asset_reference_id" integer,
  	"property_inquiry_size_range_ha" varchar,
  	"property_inquiry_operational_preference" "enum_inquiries_property_inquiry_operational_preference",
  	"property_inquiry_budget_range" "enum_inquiries_property_inquiry_budget_range",
  	"property_inquiry_timeline" "enum_inquiries_property_inquiry_timeline",
  	"property_inquiry_additional_criteria" varchar,
  	"qualification_request_target_asset_id" integer,
  	"qualification_request_investment_scope" "enum_inquiries_qualification_request_investment_scope",
  	"qualification_request_preferred_asset_type" varchar,
  	"qualification_request_preferred_timeline" varchar,
  	"project_scope_property_type" "enum_inquiries_project_scope_property_type",
  	"project_scope_location" varchar,
  	"project_scope_surface_area_ha" numeric,
  	"project_scope_investment_range" varchar,
  	"project_scope_support_level" "enum_inquiries_project_scope_support_level",
  	"project_scope_timeline" "enum_inquiries_project_scope_timeline",
  	"project_scope_current_status" "enum_inquiries_project_scope_current_status",
  	"residency_citizenship_investment_scope" varchar,
  	"residency_citizenship_preferred_asset_type" varchar,
  	"residency_citizenship_preferred_timeline" varchar,
  	"verified_buyer" boolean DEFAULT false,
  	"crm_sync_state" "enum_inquiries_crm_sync_state" DEFAULT 'pending',
  	"crm_id" varchar,
  	"assigned_to_id" integer,
  	"internal_notes" varchar,
  	"status" "enum_inquiries_status" DEFAULT 'new',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"page_type" "enum_pages_page_type" NOT NULL,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"content" jsonb,
  	"published" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"assets_id" integer,
  	"asset_classes_id" integer,
  	"provinces_id" integer,
  	"articles_id" integer,
  	"faqs_id" integer,
  	"service_pages_id" integer,
  	"inquiries_id" integer,
  	"pages_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "site_settings_organization_schema_area_served" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"area" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_name" varchar DEFAULT 'BBI Argentina',
  	"site_tagline" varchar DEFAULT 'Productive Asset Investment Platform',
  	"site_url" varchar DEFAULT 'https://www.bbiargentina.com',
  	"default_meta_title" varchar DEFAULT 'BBI Argentina | Productive Asset Investment Platform',
  	"default_meta_description" varchar DEFAULT 'BBI Argentina originates, advises and executes on productive asset acquisitions across Argentina. Vineyards, orchards and cattle ranches for qualified international buyers.',
  	"organization_schema_name" varchar DEFAULT 'BBI Argentina',
  	"organization_schema_description" varchar DEFAULT 'BBI Argentina is a full-cycle investment platform specialising in productive asset acquisition, advisory and execution across Argentina.',
  	"organization_schema_url" varchar DEFAULT 'https://www.bbiargentina.com',
  	"contact_email" varchar,
  	"contact_phone" varchar,
  	"linked_in_url" varchar,
  	"response_time_commitment" varchar DEFAULT '24 hours',
  	"regulatory_disclaimer" varchar DEFAULT 'All regulatory references including Decree 524/2025 and Ley de Tierras are subject to current Argentine law. Verified with qualified Argentine legal counsel.',
  	"team_email" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "navigation_primary_nav_sub_menu" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "navigation_primary_nav" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"primary_cta" varchar,
  	"primary_cta_url" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "navigation_footer_platform_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "navigation_footer_asset_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "navigation" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_cta_label" varchar DEFAULT 'Tell Us What You''re Looking For',
  	"global_cta_url" varchar DEFAULT '/contact',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  DO $$ BEGIN
   ALTER TABLE "assets_strategic_rationale_tags" ADD CONSTRAINT "assets_strategic_rationale_tags_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."assets"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "assets_expanded_view_infrastructure" ADD CONSTRAINT "assets_expanded_view_infrastructure_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."assets"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "assets_vineyard_winery_data_varietal_mix" ADD CONSTRAINT "assets_vineyard_winery_data_varietal_mix_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."assets"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "assets_cattle_ranch_data_water_sources" ADD CONSTRAINT "assets_cattle_ranch_data_water_sources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."assets"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "assets_gated_full_due_diligence" ADD CONSTRAINT "assets_gated_full_due_diligence_document_id_media_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "assets_gated_full_due_diligence" ADD CONSTRAINT "assets_gated_full_due_diligence_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."assets"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "assets_gallery" ADD CONSTRAINT "assets_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "assets_gallery" ADD CONSTRAINT "assets_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."assets"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "assets" ADD CONSTRAINT "assets_asset_class_id_asset_classes_id_fk" FOREIGN KEY ("asset_class_id") REFERENCES "public"."asset_classes"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "assets" ADD CONSTRAINT "assets_province_id_provinces_id_fk" FOREIGN KEY ("province_id") REFERENCES "public"."provinces"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "assets" ADD CONSTRAINT "assets_advisory_module_id_service_pages_id_fk" FOREIGN KEY ("advisory_module_id") REFERENCES "public"."service_pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "assets" ADD CONSTRAINT "assets_execution_module_id_service_pages_id_fk" FOREIGN KEY ("execution_module_id") REFERENCES "public"."service_pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "assets" ADD CONSTRAINT "assets_gated_information_memorandum_id_media_id_fk" FOREIGN KEY ("gated_information_memorandum_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "assets" ADD CONSTRAINT "assets_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "provinces_regions" ADD CONSTRAINT "provinces_regions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."provinces"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "articles_tags" ADD CONSTRAINT "articles_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "articles" ADD CONSTRAINT "articles_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_assets_fk" FOREIGN KEY ("assets_id") REFERENCES "public"."assets"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "service_pages_rels" ADD CONSTRAINT "service_pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."service_pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "service_pages_rels" ADD CONSTRAINT "service_pages_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "inquiries_property_inquiry_property_type" ADD CONSTRAINT "inquiries_property_inquiry_property_type_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."inquiries"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "inquiries_property_inquiry_province_preference" ADD CONSTRAINT "inquiries_property_inquiry_province_preference_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."inquiries"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "inquiries" ADD CONSTRAINT "inquiries_property_inquiry_asset_reference_id_assets_id_fk" FOREIGN KEY ("property_inquiry_asset_reference_id") REFERENCES "public"."assets"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "inquiries" ADD CONSTRAINT "inquiries_qualification_request_target_asset_id_assets_id_fk" FOREIGN KEY ("qualification_request_target_asset_id") REFERENCES "public"."assets"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "inquiries" ADD CONSTRAINT "inquiries_assigned_to_id_users_id_fk" FOREIGN KEY ("assigned_to_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_assets_fk" FOREIGN KEY ("assets_id") REFERENCES "public"."assets"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_asset_classes_fk" FOREIGN KEY ("asset_classes_id") REFERENCES "public"."asset_classes"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_provinces_fk" FOREIGN KEY ("provinces_id") REFERENCES "public"."provinces"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_service_pages_fk" FOREIGN KEY ("service_pages_id") REFERENCES "public"."service_pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_inquiries_fk" FOREIGN KEY ("inquiries_id") REFERENCES "public"."inquiries"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "site_settings_organization_schema_area_served" ADD CONSTRAINT "site_settings_organization_schema_area_served_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "navigation_primary_nav_sub_menu" ADD CONSTRAINT "navigation_primary_nav_sub_menu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_primary_nav"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "navigation_primary_nav" ADD CONSTRAINT "navigation_primary_nav_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "navigation_footer_platform_links" ADD CONSTRAINT "navigation_footer_platform_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "navigation_footer_asset_links" ADD CONSTRAINT "navigation_footer_asset_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX IF NOT EXISTS "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_hero_sizes_hero_filename_idx" ON "media" USING btree ("sizes_hero_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_og_sizes_og_filename_idx" ON "media" USING btree ("sizes_og_filename");
  CREATE INDEX IF NOT EXISTS "assets_strategic_rationale_tags_order_idx" ON "assets_strategic_rationale_tags" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "assets_strategic_rationale_tags_parent_idx" ON "assets_strategic_rationale_tags" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "assets_expanded_view_infrastructure_order_idx" ON "assets_expanded_view_infrastructure" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "assets_expanded_view_infrastructure_parent_id_idx" ON "assets_expanded_view_infrastructure" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "assets_vineyard_winery_data_varietal_mix_order_idx" ON "assets_vineyard_winery_data_varietal_mix" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "assets_vineyard_winery_data_varietal_mix_parent_id_idx" ON "assets_vineyard_winery_data_varietal_mix" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "assets_cattle_ranch_data_water_sources_order_idx" ON "assets_cattle_ranch_data_water_sources" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "assets_cattle_ranch_data_water_sources_parent_id_idx" ON "assets_cattle_ranch_data_water_sources" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "assets_gated_full_due_diligence_order_idx" ON "assets_gated_full_due_diligence" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "assets_gated_full_due_diligence_parent_id_idx" ON "assets_gated_full_due_diligence" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "assets_gated_full_due_diligence_document_idx" ON "assets_gated_full_due_diligence" USING btree ("document_id");
  CREATE INDEX IF NOT EXISTS "assets_gallery_order_idx" ON "assets_gallery" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "assets_gallery_parent_id_idx" ON "assets_gallery" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "assets_gallery_image_idx" ON "assets_gallery" USING btree ("image_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "assets_slug_idx" ON "assets" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "assets_asset_class_idx" ON "assets" USING btree ("asset_class_id");
  CREATE INDEX IF NOT EXISTS "assets_province_idx" ON "assets" USING btree ("province_id");
  CREATE INDEX IF NOT EXISTS "assets_advisory_module_idx" ON "assets" USING btree ("advisory_module_id");
  CREATE INDEX IF NOT EXISTS "assets_execution_module_idx" ON "assets" USING btree ("execution_module_id");
  CREATE INDEX IF NOT EXISTS "assets_gated_gated_information_memorandum_idx" ON "assets" USING btree ("gated_information_memorandum_id");
  CREATE INDEX IF NOT EXISTS "assets_hero_image_idx" ON "assets" USING btree ("hero_image_id");
  CREATE INDEX IF NOT EXISTS "assets_updated_at_idx" ON "assets" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "assets_created_at_idx" ON "assets" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "asset_classes_slug_idx" ON "asset_classes" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "asset_classes_updated_at_idx" ON "asset_classes" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "asset_classes_created_at_idx" ON "asset_classes" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "provinces_regions_order_idx" ON "provinces_regions" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "provinces_regions_parent_id_idx" ON "provinces_regions" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "provinces_slug_idx" ON "provinces" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "provinces_updated_at_idx" ON "provinces" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "provinces_created_at_idx" ON "provinces" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "articles_tags_order_idx" ON "articles_tags" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "articles_tags_parent_id_idx" ON "articles_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "articles_slug_idx" ON "articles" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "articles_hero_image_idx" ON "articles" USING btree ("hero_image_id");
  CREATE INDEX IF NOT EXISTS "articles_updated_at_idx" ON "articles" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "articles_created_at_idx" ON "articles" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "articles_rels_order_idx" ON "articles_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "articles_rels_parent_idx" ON "articles_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "articles_rels_path_idx" ON "articles_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "articles_rels_faqs_id_idx" ON "articles_rels" USING btree ("faqs_id");
  CREATE INDEX IF NOT EXISTS "articles_rels_assets_id_idx" ON "articles_rels" USING btree ("assets_id");
  CREATE INDEX IF NOT EXISTS "faqs_updated_at_idx" ON "faqs" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "faqs_created_at_idx" ON "faqs" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "service_pages_slug_idx" ON "service_pages" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "service_pages_updated_at_idx" ON "service_pages" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "service_pages_created_at_idx" ON "service_pages" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "service_pages_rels_order_idx" ON "service_pages_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "service_pages_rels_parent_idx" ON "service_pages_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "service_pages_rels_path_idx" ON "service_pages_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "service_pages_rels_faqs_id_idx" ON "service_pages_rels" USING btree ("faqs_id");
  CREATE INDEX IF NOT EXISTS "inquiries_property_inquiry_property_type_order_idx" ON "inquiries_property_inquiry_property_type" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "inquiries_property_inquiry_property_type_parent_idx" ON "inquiries_property_inquiry_property_type" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "inquiries_property_inquiry_province_preference_order_idx" ON "inquiries_property_inquiry_province_preference" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "inquiries_property_inquiry_province_preference_parent_idx" ON "inquiries_property_inquiry_province_preference" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "inquiries_property_inquiry_property_inquiry_asset_reference_idx" ON "inquiries" USING btree ("property_inquiry_asset_reference_id");
  CREATE INDEX IF NOT EXISTS "inquiries_qualification_request_qualification_request_target_asset_idx" ON "inquiries" USING btree ("qualification_request_target_asset_id");
  CREATE INDEX IF NOT EXISTS "inquiries_assigned_to_idx" ON "inquiries" USING btree ("assigned_to_id");
  CREATE INDEX IF NOT EXISTS "inquiries_updated_at_idx" ON "inquiries" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "inquiries_created_at_idx" ON "inquiries" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_assets_id_idx" ON "payload_locked_documents_rels" USING btree ("assets_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_asset_classes_id_idx" ON "payload_locked_documents_rels" USING btree ("asset_classes_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_provinces_id_idx" ON "payload_locked_documents_rels" USING btree ("provinces_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_articles_id_idx" ON "payload_locked_documents_rels" USING btree ("articles_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_faqs_id_idx" ON "payload_locked_documents_rels" USING btree ("faqs_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_service_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("service_pages_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_inquiries_id_idx" ON "payload_locked_documents_rels" USING btree ("inquiries_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX IF NOT EXISTS "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "site_settings_organization_schema_area_served_order_idx" ON "site_settings_organization_schema_area_served" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "site_settings_organization_schema_area_served_parent_id_idx" ON "site_settings_organization_schema_area_served" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "navigation_primary_nav_sub_menu_order_idx" ON "navigation_primary_nav_sub_menu" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "navigation_primary_nav_sub_menu_parent_id_idx" ON "navigation_primary_nav_sub_menu" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "navigation_primary_nav_order_idx" ON "navigation_primary_nav" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "navigation_primary_nav_parent_id_idx" ON "navigation_primary_nav" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "navigation_footer_platform_links_order_idx" ON "navigation_footer_platform_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "navigation_footer_platform_links_parent_id_idx" ON "navigation_footer_platform_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "navigation_footer_asset_links_order_idx" ON "navigation_footer_asset_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "navigation_footer_asset_links_parent_id_idx" ON "navigation_footer_asset_links" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "assets_strategic_rationale_tags" CASCADE;
  DROP TABLE "assets_expanded_view_infrastructure" CASCADE;
  DROP TABLE "assets_vineyard_winery_data_varietal_mix" CASCADE;
  DROP TABLE "assets_cattle_ranch_data_water_sources" CASCADE;
  DROP TABLE "assets_gated_full_due_diligence" CASCADE;
  DROP TABLE "assets_gallery" CASCADE;
  DROP TABLE "assets" CASCADE;
  DROP TABLE "asset_classes" CASCADE;
  DROP TABLE "provinces_regions" CASCADE;
  DROP TABLE "provinces" CASCADE;
  DROP TABLE "articles_tags" CASCADE;
  DROP TABLE "articles" CASCADE;
  DROP TABLE "articles_rels" CASCADE;
  DROP TABLE "faqs" CASCADE;
  DROP TABLE "service_pages" CASCADE;
  DROP TABLE "service_pages_rels" CASCADE;
  DROP TABLE "inquiries_property_inquiry_property_type" CASCADE;
  DROP TABLE "inquiries_property_inquiry_province_preference" CASCADE;
  DROP TABLE "inquiries" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_settings_organization_schema_area_served" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "navigation_primary_nav_sub_menu" CASCADE;
  DROP TABLE "navigation_primary_nav" CASCADE;
  DROP TABLE "navigation_footer_platform_links" CASCADE;
  DROP TABLE "navigation_footer_asset_links" CASCADE;
  DROP TABLE "navigation" CASCADE;
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_media_asset_class";
  DROP TYPE "public"."enum_media_province";
  DROP TYPE "public"."enum_assets_strategic_rationale_tags";
  DROP TYPE "public"."reliability";
  DROP TYPE "public"."enum_assets_gated_full_due_diligence_document_type";
  DROP TYPE "public"."enum_assets_operational_status";
  DROP TYPE "public"."enum_assets_summary_view_productive_area_unit";
  DROP TYPE "public"."enum_assets_expanded_view_water_rights_status";
  DROP TYPE "public"."enum_articles_category";
  DROP TYPE "public"."enum_faqs_category";
  DROP TYPE "public"."enum_service_pages_service_type";
  DROP TYPE "public"."enum_inquiries_property_inquiry_property_type";
  DROP TYPE "public"."enum_inquiries_property_inquiry_province_preference";
  DROP TYPE "public"."enum_inquiries_inquiry_type";
  DROP TYPE "public"."enum_inquiries_preferred_response_method";
  DROP TYPE "public"."enum_inquiries_property_inquiry_operational_preference";
  DROP TYPE "public"."enum_inquiries_property_inquiry_budget_range";
  DROP TYPE "public"."enum_inquiries_property_inquiry_timeline";
  DROP TYPE "public"."enum_inquiries_qualification_request_investment_scope";
  DROP TYPE "public"."enum_inquiries_project_scope_property_type";
  DROP TYPE "public"."enum_inquiries_project_scope_support_level";
  DROP TYPE "public"."enum_inquiries_project_scope_timeline";
  DROP TYPE "public"."enum_inquiries_project_scope_current_status";
  DROP TYPE "public"."enum_inquiries_crm_sync_state";
  DROP TYPE "public"."enum_inquiries_status";
  DROP TYPE "public"."enum_pages_page_type";`)
}
