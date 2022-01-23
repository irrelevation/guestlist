import { developmentLogger } from "./developmentLogger";
import { productionLogger } from "./productionLogger";

export let logger = null;

if (process.env.NODE_ENV !== "production") {
  logger = developmentLogger();
} else {
  logger = productionLogger();
}
