import { Request, Response } from 'express';

const AuthMiddleware = (_: Request, res: Response) => {
  res.status(401).send('Invalid Token');
};

export default AuthMiddleware;
