CREATE TABLE IF NOT EXISTS "dice_rolls" (
	"id" serial PRIMARY KEY NOT NULL,
	"roll_value" integer NOT NULL,
	"created_at" timestamp DEFAULT now()
);
