import { cache_wskaznikow } from "./cache/router";
import { echoHandler } from "./routers/getting";
import { testLoader } from "./test-loader/router";

export const router = {
  echoHandler,
  testLoader,
  cache_wskaznikow,
};
