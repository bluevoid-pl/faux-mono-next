import _ from "lodash";
import { z } from "zod";
import { pub } from "@/server/api/orpc";
import { retry } from "@/server/middlewares/retry";

export const echoHandler = pub
  .use(retry({ times: 3 }))
  .route({
    method: "GET",
    path: "/planets",
    summary: "List all planets",
    tags: ["Planets"],
  })
  .input(z.object({ message: z.string() }))
  .output(z.object({ echoedMessage: z.string() }))
  .handler(async ({ input, context }) => {
    return {
      echoedMessage: `Server received: ${input.message} ${JSON.stringify(context.user ?? {})}${context.user.id}`,
    };
  });
