import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import { router as playerRouter } from './routes/players.route';
import bodyParser from 'body-parser';

//For env File 
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/players", playerRouter)

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
