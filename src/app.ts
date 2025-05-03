import express, { Application, Request, Response } from 'express';

import cors from 'cors';
import morgan from 'morgan';
import router from './routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';

const app: Application = express();

// INCREASING BODY SIZE
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// CORS
//SHOULD HAVE TO CHANGE THE ORIGIN WHEN PRODUCTION!
app.use(
  cors({
    origin: [
      'https://next-portolio-client.vercel.app',
      'https://mdrezaulkarim.vercel.app',
      'http://localhost:3000',
    ], // No trailing slash
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'], // Allow all necessary methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Include necessary headers
  }),
);

app.options('*', cors()); // Handle preflight

// 3rd PARTY MIDDLEWARE
app.use(morgan('dev'));

// BODY PARSER
app.use(express.json());

// ROUTER
app.use('/api/v1', router);

// HELLO RESPONSE
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Hello World! 👋' });
});

// GLOBAL ERROR HANDLER
app.use(globalErrorHandler);

// NOT FOUND
app.use(notFound);
export default app;
