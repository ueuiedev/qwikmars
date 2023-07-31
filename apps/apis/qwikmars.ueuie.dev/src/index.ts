import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { log } from "./modules/middleware/logs";
import { routes } from "./routes";

const router = new Hono<Env>();

router.use("*", log());
router.use("*", async ({ get, req }, next) => {
  get("log").captureMessage("Processing Request...", "log", {
    data: {
      url: req.url,
      method: req.method,
    },
  });
  await next();
});
router.route("/", routes);
router.notFound(async ({ get, text }) => {
  get("log").captureMessage("Not Found...", "log");
  return text("404 Not Found", 404);
});
router.onError((cause, { get, json }) => {
  if (cause instanceof HTTPException) {
    // Get the custom response
    return cause.getResponse();
  } else {
    get("log").captureMessage(cause.message, "error", {
      originalException: cause,
    });
    console.error(cause);
    return json(
      {
        status: "error",
      },
      { status: 500 },
    );
  }
});

export default {
  /**
   * - API Requests (Public)
   */
  fetch: async (req: Request, env: Bindings, ctx: ExecutionContext) => {
    return router.fetch(req, env, ctx);
  },
  /**
   * - Routine Database Clean Ups
   * - Newsletter
   */
};
