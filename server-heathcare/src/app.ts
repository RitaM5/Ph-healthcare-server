import express, { Application, NextFunction, Request, Response } from "express";
import { indexRoutes } from "./app/routes";
import { success } from "better-auth";


const app: Application = express();

app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(express.json());

app.use("/api/v1", indexRoutes);

// Basic route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript + Express!');
});

//global error handler
app.use()
export default app;