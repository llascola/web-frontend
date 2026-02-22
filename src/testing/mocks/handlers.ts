import { authHandlers } from "./handlers/auth";
import { adminHandlers } from "./handlers/admin";

export const handlers = [...authHandlers, ...adminHandlers];
