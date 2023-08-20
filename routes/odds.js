import { Router } from 'express';

import { getOdds } from '../controllers/OddsController.js';

export const oddsRouter = Router();

oddsRouter.post("/", getOdds); 
