import { model, Schema } from 'mongoose';

const schema = new Schema({
  name: String,
  domain: String,
});

const Restaurant = model('Restaurant', schema);
export default Restaurant;
