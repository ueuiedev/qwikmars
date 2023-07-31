CREATE TABLE `emails` (
	`id` integer PRIMARY KEY NOT NULL,
	`email` text(256) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `emails_id_unique` ON `emails` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `emails_email_unique` ON `emails` (`email`);