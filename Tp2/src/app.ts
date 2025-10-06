import express from 'express';
import ordersRouter from './routes/order.routes';

export function makeApp() {
  const app = express();
  app.use(express.json());
  app.use('/', ordersRouter);

  // basic error handler (for unexpected)
  app.use((err: any, _req: any, res: any, _next: any) => {
    console.error(err);
    res.status(500).json({ error: 'internal' });
  });

  return app;
}

export default makeApp;