import express from "express";
import swaggerUI from 'swagger-ui-express';

import { router } from "./routes";
import swaggerFile from './swagger.json'

const app = express();

app.use(express.json());

// Swagger-ui configuration
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use(router);

app.listen(3333, () => console.log("\n\nServer is running! 🏃"));
