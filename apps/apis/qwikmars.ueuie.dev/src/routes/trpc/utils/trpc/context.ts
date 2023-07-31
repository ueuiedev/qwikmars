import { inferAsyncReturnType } from "@trpc/server";
import { type Context } from "hono";

// ----
export function createContextFunction(ctx: Context<Env>) {
  return async function createContext() {
    return {
      log: ctx.get("log"),
    };
  };
}

export type TRPCContext = inferAsyncReturnType<
  ReturnType<typeof createContextFunction>
>;
