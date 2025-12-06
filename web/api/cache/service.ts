import { db } from "@/db";

async function getAllWithMeta(pkd: string[]) {
  const data = await db.query.cache_wskaznikow.findMany({
    where: {
      pkd_section: { in: pkd },
    },
  });
  if (!data)
    throw new Error(`[CacheService]: Could not find cache with id ${data.id}`);
  return data;
}

export const cacheService = {
  getAllWithMeta,
};
