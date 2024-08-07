import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

import router from "../src/routes/api.route";

app.get("/", (req: Request, res: Response) => {
  res.send("Troste");
});

app.use("/players", router)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});