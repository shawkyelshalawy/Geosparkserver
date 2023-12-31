import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { loggerMiddleware } from './middleware/loggerMiddleware';
import { LOGGER } from './utils/logging';
import { initDb } from './datastore';
import { errHandler } from './middleware/errorMiddleware';
import { userRouter } from './routes/userRoutes';
import { courseRouter } from './routes/courseRoutes';
import { chapterRouter } from './routes/chapterRoutes';
import { videoRouter } from './routes/videoRoutes';
import { examRouter } from './routes/examRoutes';
import { questionRouter } from './routes/questionRoutes';
import { resultsRouter } from './routes/resultRoutes';
import bodyParser from 'body-parser';
(async (logRequests = true) => {
  await initDb();

  // create express app
  const app = express();

  // middlewares for parsing JSON payloads and opening up cors policy
  app.use(express.json());
  app.use(bodyParser.json({ limit: '5mb' }));
  app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

  const whitelist = [
    'http://localhost:3000',
    'https://geospark-frontend.vercel.app',
  ];
  const corsOpts = {
    origin: whitelist,
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],

    allowedHeaders: ['Content-Type', 'credentials'],
    credentials: true,
  };
  app.use(cors(corsOpts));
  if (logRequests) {
    // log incoming Requests
    app.use(loggerMiddleware);
  }
  app.use(cookieParser());
  app.get('/healthz', (req, res) => {
    res.send({ status: '✌️ ' });
  });
  app.use(courseRouter);
  app.use(chapterRouter);
  app.use(userRouter);
  app.use(videoRouter);
  app.use(examRouter);
  app.use(questionRouter);
  app.use(resultsRouter);
  dotenv.config();
  //app.use(errHandler);

  const { ENV, PORT } = process.env;
  if (!ENV || !PORT) {
    LOGGER.error('Missing some required env vars');
    process.exit(1);
  }

  app.listen(PORT, () =>
    LOGGER.info(`Listening on port ${PORT} in ${ENV} environment`)
  );
})();
