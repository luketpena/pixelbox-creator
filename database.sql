
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- This tracks the information for registration, login, and account management.
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

-- This table tracks extra information about the user, such as their avatar and any preferences that are added further in development.
-- REFERENCES "user" table
CREATE TABLE "user_info" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INTEGER REFERENCES "user",
	"avatar" VARCHAR (256)
);

-- This table tracks the global information about a given frame
-- REFERNCES "user" table
-- IS REFERENCED BY "layer" table
CREATE TABLE frame (
	id SERIAL PRIMARY KEY,
	user_id INTEGER REFERENCES "user",
	frame_name VARCHAR (255),
	bkg_url VARCHAR,
	size_x INTEGER,
	size_y INTEGER,
	extend_x INTEGER,
	extend_y INTEGER,
	display_x INTEGER,
	display_y INTEGER,
	smoothing DECIMAL,
	framerate INTEGER,
	pixelsnap BOOLEAN,
	hideoverflow BOOLEAN
);

-- This table tracks information about individual layers within a frame
-- REFERENCES "frame" table, tying it to the "user" table as well
CREATE TABLE layer (
	id SERIAL PRIMARY KEY,
	frame_id INTEGER REFERENCES "frame",
	layer_name VARCHAR (255),
	layer_url VARCHAR,
	layer_str DECIMAL,
	blendmode VARCHAR (32),
	"filter" VARCHAR[][]
);