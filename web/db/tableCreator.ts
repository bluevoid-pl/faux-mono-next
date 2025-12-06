import {
	pgTableCreator,
} from "drizzle-orm/pg-core";
import { env } from "@/env";

export const createTable = pgTableCreator(
	(name) => `${env.DATABASE_PREFIX}${name}`,
);
