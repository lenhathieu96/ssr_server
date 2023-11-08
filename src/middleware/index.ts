import AuthMiddleware from './auth';
import RateLimiterMiddleware from './rate_limiter';

const Middleware = {
  rateLimiter: RateLimiterMiddleware,
  authentication: AuthMiddleware,
};

export default Middleware;
