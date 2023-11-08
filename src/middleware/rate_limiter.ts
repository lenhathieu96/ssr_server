import { NextFunction, Request, Response } from 'express';
import { RateLimiterMemory } from 'rate-limiter-flexible';

const OPTIONS = {
  keyPrefix: 'middleware',
  points: 10, // 10 requests
  duration: 1,
};
const rateLimiter = new RateLimiterMemory(OPTIONS);

const RateLimiterMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userIP = req.ip;
    if (!userIP) {
      throw new Error('Invalid IP');
    }
    await rateLimiter.consume(userIP);
    next();
  } catch (e) {
    console.log('Error on RateLimiter Middleware: ', e);
    res.status(429).send('Too Many Requests');
  }
};

export default RateLimiterMiddleware;
