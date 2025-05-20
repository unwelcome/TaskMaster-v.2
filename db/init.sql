\connect taskmaster_db;

DROP TYPE IF EXISTS "group_roles";
DROP TYPE IF EXISTS "group_status";
DROP TYPE IF EXISTS "chat_status";
DROP TYPE IF EXISTS "topic_status";

CREATE TYPE "group_roles" AS ENUM (
  'student',
  'senior',
  'teacher'
);
CREATE TYPE "group_status" AS ENUM (
  'open',
  'close'
);
CREATE TYPE "chat_status" AS ENUM (
  'open',
  'close'
);
CREATE TYPE "topic_status" AS ENUM (
  'open',
  'close'
);


CREATE TABLE IF NOT EXISTS "users" (
  "id" serial PRIMARY KEY,
  "password_hash" varchar(255) NOT NULL,
  "password_salt" varchar(255) NOT NULL,
  "email" varchar(255) NOT NULL UNIQUE,
  "first_name" varchar(30) NOT NULL,
  "last_name" varchar(30) NOT NULL,
  "middle_name" varchar(30),
  "created_at" timestamp NOT NULL DEFAULT NOW(),
  "avatar_url" text
);

CREATE TABLE IF NOT EXISTS "groups" (
  "id" serial PRIMARY KEY,
  "title" varchar(255) NOT NULL,
  "password_hash" varchar(255) NOT NULL,
  "password_salt" varchar(255) NOT NULL,
  "score_limit" float DEFAULT NULL,
  "topic_limit" integer DEFAULT NULL,
  "group_status" group_status DEFAULT 'open',
  "chat_status" chat_status DEFAULT 'open',
  "enable_senior" boolean DEFAULT FALSE,
  "created_by" integer
);

CREATE TABLE IF NOT EXISTS "senior_access" (
  "id" serial PRIMARY KEY,
  "group_id" integer,
  "use_closed_chat" boolean DEFAULT FALSE,
  "create_seminars" boolean DEFAULT FALSE,
  "create_topics" boolean DEFAULT FALSE,
  "evaluate_topics" boolean DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS "group_members" (
  "id" serial PRIMARY KEY,
  "user_id" integer,
  "group_id" integer,
  "role" group_roles DEFAULT 'student'
);

CREATE TABLE IF NOT EXISTS "chats" (
  "id" serial PRIMARY KEY,
  "group_id" integer
);

CREATE TABLE IF NOT EXISTS "chat_messages" (
  "id" serial PRIMARY KEY,
  "chat_id" integer,
  "author_id" integer,
  "created_at" timestamp DEFAULT NOW(),
  "message" text NOT NULL
);

CREATE TABLE IF NOT EXISTS "seminars" (
  "id" serial PRIMARY KEY,
  "group_id" integer,
  "title" varchar(255) NOT NULL,
  "total_topics" integer DEFAULT 0,
  "free_topics" integer DEFAULT 0,
  "date" timestamp DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "topics" (
  "id" serial PRIMARY KEY,
  "seminar_id" integer,
  "title" varchar(255) NOT NULL,
  "score" float DEFAULT 0,
  "total_space" integer DEFAULT 0,
  "free_space" integer DEFAULT 0,
  "status" topic_status DEFAULT 'open'
);

CREATE TABLE IF NOT EXISTS "topic_executors" (
  "id" serial PRIMARY KEY,
  "topic_id" integer,
  "user_id" integer
);

CREATE TABLE IF NOT EXISTS "topic_files" (
  "id" serial PRIMARY KEY,
  "topic_id" integer,
  "url" text DEFAULT NULL,
  "name" varchar(255) DEFAULT NULL,
  "size" integer DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS "performance" (
  "id" serial PRIMARY KEY,
  "user_id" integer,
  "group_id" integer,
  "seminar_id" integer,
  "score" float DEFAULT NULL
);

ALTER TABLE "groups" DROP CONSTRAINT IF EXISTS "groups_title_password_hash_unique";
ALTER TABLE "groups" DROP CONSTRAINT IF EXISTS "groups_created_by_users";
ALTER TABLE "senior_access" DROP CONSTRAINT IF EXISTS "groups_senior_access";
ALTER TABLE "group_members" DROP CONSTRAINT IF EXISTS "group_members_users";
ALTER TABLE "group_members" DROP CONSTRAINT IF EXISTS "group_members_groups";
ALTER TABLE "chats" DROP CONSTRAINT IF EXISTS "chats_groups";
ALTER TABLE "chat_messages" DROP CONSTRAINT IF EXISTS "chat_messages_chats";
ALTER TABLE "chat_messages" DROP CONSTRAINT IF EXISTS "chat_messages_users";
ALTER TABLE "seminars" DROP CONSTRAINT IF EXISTS "seminars_groups";
ALTER TABLE "topics" DROP CONSTRAINT IF EXISTS "topics_seminars";
ALTER TABLE "topic_executors" DROP CONSTRAINT IF EXISTS "topic_executors_topics";
ALTER TABLE "topic_executors" DROP CONSTRAINT IF EXISTS "topic_executors_users";
ALTER TABLE "topic_files" DROP CONSTRAINT IF EXISTS "topic_files_topics";
ALTER TABLE "performance" DROP CONSTRAINT IF EXISTS "performance_users";
ALTER TABLE "performance" DROP CONSTRAINT IF EXISTS "performance_groups";
ALTER TABLE "performance" DROP CONSTRAINT IF EXISTS "performance_seminars";

ALTER TABLE "groups" ADD CONSTRAINT "groups_title_password_hash_unique" UNIQUE(title, password_hash);

ALTER TABLE "groups" ADD CONSTRAINT "groups_created_by_users" FOREIGN KEY ("created_by") REFERENCES "users" ("id") ON DELETE CASCADE;

ALTER TABLE "senior_access" ADD CONSTRAINT "groups_senior_access" FOREIGN KEY ("group_id") REFERENCES "groups" ("id") ON DELETE CASCADE;

ALTER TABLE "group_members" ADD CONSTRAINT "group_members_users" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE;

ALTER TABLE "group_members" ADD CONSTRAINT "group_members_groups" FOREIGN KEY ("group_id") REFERENCES "groups" ("id") ON DELETE CASCADE;

ALTER TABLE "chats" ADD CONSTRAINT "chats_groups" FOREIGN KEY ("group_id") REFERENCES "groups" ("id") ON DELETE CASCADE;

ALTER TABLE "chat_messages" ADD CONSTRAINT "chat_messages_chats" FOREIGN KEY ("chat_id") REFERENCES "chats" ("id") ON DELETE CASCADE;

ALTER TABLE "chat_messages" ADD CONSTRAINT "chat_messages_users" FOREIGN KEY ("author_id") REFERENCES "users" ("id") ON DELETE CASCADE;

ALTER TABLE "seminars" ADD CONSTRAINT "seminars_groups" FOREIGN KEY ("group_id") REFERENCES "groups" ("id") ON DELETE CASCADE;

ALTER TABLE "topics" ADD CONSTRAINT "topics_seminars" FOREIGN KEY ("seminar_id") REFERENCES "seminars" ("id") ON DELETE CASCADE;

ALTER TABLE "topic_executors" ADD CONSTRAINT "topic_executors_topics" FOREIGN KEY ("topic_id") REFERENCES "topics" ("id") ON DELETE CASCADE;

ALTER TABLE "topic_executors" ADD CONSTRAINT "topic_executors_users" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE;

ALTER TABLE "topic_files" ADD CONSTRAINT "topic_files_topics" FOREIGN KEY ("topic_id") REFERENCES "topics" ("id") ON DELETE CASCADE;

ALTER TABLE "performance" ADD CONSTRAINT "performance_users" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE;

ALTER TABLE "performance" ADD CONSTRAINT "performance_groups" FOREIGN KEY ("group_id") REFERENCES "groups" ("id") ON DELETE CASCADE;

ALTER TABLE "performance" ADD CONSTRAINT "performance_seminars" FOREIGN KEY ("seminar_id") REFERENCES "seminars" ("id") ON DELETE CASCADE;
