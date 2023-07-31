import { MiddlewareHandler } from "hono";
import { Toucan } from "toucan-js";

declare module "hono" {
  export interface ContextVariableMap {
    log: Toucan;
  }
}

export function log(): MiddlewareHandler<Env> {
  return async function handle({ req, executionCtx: ctx, set, env }, next) {
    const client = new Toucan({
      dsn: env.SENTRY_DSN,
      context: ctx,
      request: req.raw,
      environment: process.env.NODE_ENV,
    });
    set("log", client);
    await next();
  };
}
