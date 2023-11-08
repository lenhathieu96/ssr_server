import express from 'express';
const AuthRouter = express.Router();

AuthRouter.get('/', (_, res) => {
  res.send('login ne');
});

export default AuthRouter;
