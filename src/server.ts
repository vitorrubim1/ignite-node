import express, { NextFunction, Request, Response } from "express";
import 'express-async-errors';
import swaggerUI from "swagger-ui-express";

import "./database";

import "./shared/container";

import { AppError } from "./errors/AppError";
import { router } from "./routes";
import swaggerFile from "./swagger.json";

const app = express();

app.use(express.json());

// Swagger-ui configuration
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use(router);

app.use((error: Error, request: Request, response: Response, _: NextFunction) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ message: error.message });
  }

  return response.status(500).json({
    status: "error",
    message: `Internal server error - ${error.message}`
  });
});

app.listen(3333, () => console.log("\n\nServer is running! 🏃"));
