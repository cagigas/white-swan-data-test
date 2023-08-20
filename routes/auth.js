import { Router } from 'express';

import { loginUser, /* createUser */ } from '../controllers/LoginController.js';

export const authRouter = Router();

authRouter.get("/login", loginUser); 
//authRouter.post("/signup", createUser); 
