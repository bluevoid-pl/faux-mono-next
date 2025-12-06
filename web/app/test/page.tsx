"use client";
import { useQuery } from "@tanstack/react-query";
import { orpc } from "@/lib/orpc";

function TestPage() {
  const { data } = useQuery(
    orpc.echoHandler.queryOptions({ input: { message: "test" } }),
  );
  console.log(orpc.echoHandler.queryOptions({ input: { message: "test" } }));
  return <div>{JSON.stringify(data ?? {}, null, 2)}</div>;
}
export default TestPage;
