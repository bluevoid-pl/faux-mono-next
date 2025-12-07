import { inArray } from "drizzle-orm";
import { db } from "@/db";
import { cache_wskaznikow } from "./schema";

async function getAllWithPKD(pkd: string[]) {
  const data = await db.query.cache_wskaznikow.findMany({
    where: inArray(cache_wskaznikow.pkd_section, pkd),
  });
  if (!data)
    throw new Error(
      `[CacheService]: Could not find cache with id ${pkd.reduce((prev, next) => prev + ", " + next, "")}`,
    );
  return data;
}

export const cacheService = {
  getAllWithPKD,
};
