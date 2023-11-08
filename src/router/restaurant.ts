import express from 'express';
const RestaurantRouter = express.Router();

RestaurantRouter.get('/', (_, res) => {
  res.send('restaurant ne');
});

export default RestaurantRouter;
