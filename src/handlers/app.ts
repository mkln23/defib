import serverlessExpress from '@codegenie/serverless-express';
import router from '../routes/app';
import express from 'express';

const app = express();

app.use(express.json({ strict: false, limit: '1mb' }));
app.use('/api', router);

export const handler = serverlessExpress({ app });
export default app;

// To local start
// rm -rf .esbuild .serverless
// env-cmd -f .env npx sls offline start