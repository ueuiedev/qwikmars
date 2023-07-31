import { trpcServer } from "@hono/trpc-server";
import { Hono } from "hono";

import { createContextFunction } from "@/routes/trpc/utils/trpc/context";

import { trpc } from "./trpc";

const router = new Hono<Env>();

router.use("/trpc/*", async (c, next) => {
  return await trpcServer({
    createContext: createContextFunction(c),
    endpoint: "/trpc",
    router: trpc,
    onError: ({ error, type, path }) => {
      c.get("log").captureException(error, { data: { type, path } });
    },
  })(c, next);
});

router.get("status", async (c) => {
  return c.json({
    status: "ok",
  });
});

export { router as routes };
