CREATE TABLE `goals` (
	`id` integer PRIMARY KEY NOT NULL,
	`goal` text NOT NULL,
	`year` integer NOT NULL,
	`is_complete` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP
);
