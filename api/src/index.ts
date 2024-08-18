import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import { router as playerRouter } from './routes/players.route';
import { router as matchRouter } from './routes/matches.route';
import bodyParser from 'body-parser';

//For env File 
dotenv.config();

const app: Application = express();
const port = process.env.PORT ?? 8000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/players", playerRouter)
app.use("/matches", matchRouter)

app.get('/', (req: Request, res: Response) => {
  res.send('Pong Rating API');
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
