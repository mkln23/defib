import serverlessExpress from '@codegenie/serverless-express';
// import serverlessHttp from "@codegenie/serverless-express"
import router from '../routes/app';
import express from 'express';
// import { Request, Response } from "express";

const app = express();

app.use(express.json({ strict: false, limit: '1mb' }));
app.use('/api', router);

// export const handler = serverlessHttp({ app })
export const handler = serverlessExpress({ app });
export default app;
