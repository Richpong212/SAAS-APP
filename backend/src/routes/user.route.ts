import { Router } from "express";
import { loginUser, registerUser } from "../controllers/users.controller";

const userRouter = Router();


// register user
userRouter.post('/register', registerUser);

// login user
 userRouter.post('/login', loginUser);

export default userRouter;