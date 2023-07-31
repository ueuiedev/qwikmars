import { type MiddlewareHandler } from "hono";

import { trpc } from "@/routes/trpc";
import { createContextFunction } from "@/routes/trpc/utils/trpc/context";

declare module "hono" {
  export interface ContextVariableMap {
    trpc: ReturnType<typeof trpc.createCaller>;
  }
}

export function trpcModule(): MiddlewareHandler<Env> {
  return async function handle(ctx, next) {
    const caller = trpc.createCaller(await createContextFunction(ctx)());
    ctx.set("trpc", caller);
    await next();
  };
}
