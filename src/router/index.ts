import AuthRouter from './auth';
import RestaurantRouter from './restaurant';

const Router = {
  authentication: AuthRouter,
  restaurant: RestaurantRouter,
};

export default Router;
