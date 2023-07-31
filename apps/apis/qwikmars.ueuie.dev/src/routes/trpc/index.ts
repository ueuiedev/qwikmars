import { t } from "@/routes/trpc/utils/trpc";

export const trpc = t.router({
  hello: t.procedure.query(async () => {
    return "hello";
  }),
});

export type TRPCRouter = typeof trpc;
