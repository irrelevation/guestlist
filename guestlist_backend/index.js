import "dotenv/config";
import { logger } from "./src/logger/index.js";
import { app } from "./src/app.js";

const PORT = process.env.port ?? 3000;

app.listen(PORT, () => logger.info(`listening on port ${PORT}`));
