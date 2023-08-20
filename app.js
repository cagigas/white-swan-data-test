//https://medium.com/@prashantramnyc/authenticate-rest-apis-in-node-js-using-jwt-json-web-tokens-f0e97669aad3
import express from 'express';
import { oddsRouter } from './routes/odds.js';
import { authRouter } from './routes/auth.js';
import { validateToken } from './middleware/auth.js';
import { PORT } from './constants.js';

const app = express();

app.disable('x-powered-by');
app.use('/odds', validateToken, oddsRouter);
app.use('/auth', authRouter);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;
