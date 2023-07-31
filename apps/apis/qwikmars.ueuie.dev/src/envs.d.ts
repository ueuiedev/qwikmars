import { type MessageBody } from "@bosscard/mails-service";

type Environment = {
  // [databases]
  DB: D1Database;
  // [vars]
  SENTRY_DSN: string;
};

declare global {
  type Bindings = Environment;
  type Env = { Bindings: Bindings };

  declare const process: {
    env: {
      NODE_ENV: "production" | "development";
    };
  };
}

export {};
