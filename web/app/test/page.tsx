"use client";
import { useQuery } from "@tanstack/react-query";
import { orpc } from "@/lib/orpc";
import { sections2 } from "../_utils/pkd";

function TestPage() {
  const { data } = useQuery(
    orpc.cache_wskaznikow.queryOptions({ input: { pkds: sections2 } }),
  );
  return <pre>{JSON.stringify(data ?? {}).replaceAll("},", "},\n")}</pre>;
}
export default TestPage;
