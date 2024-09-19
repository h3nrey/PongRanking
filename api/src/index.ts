import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";
import { router as playerRouter } from "./routes/players.route";
import { router as matchRouter } from "./routes/matches.route";
import { router as userRouter } from "./routes/users.route";
import bodyParser from "body-parser";
import { CorsOptions } from "cors";
//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT ?? 8000;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/players", playerRouter);
app.use("/matches", matchRouter);
app.use("/users", userRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Pong Rating API");
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
