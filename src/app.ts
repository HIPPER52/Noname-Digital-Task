import express, { Express, Request, Response, NextFunction } from 'express';
import routes from './routes';
import { ErrorHandler, handleError } from './utils/errorHandler';

const app: Express = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Server is up and running!');
});

app.use('/', routes);

app.use((req, res, next) => {
  const error = new ErrorHandler(404, 'Not Found');
  next(error);
});

app.use((err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
  handleError(err, res);
});

export default app;
