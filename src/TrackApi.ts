import { RESTDataSource } from '@apollo/datasource-rest';

export default class TrackApi extends RESTDataSource {
  baseURL = 'https://odyssey-lift-off-rest-api.herokuapp.com/';

  getTracksForHome() {
    return this.get('tracks');
  }

  getAuthor(authorId: string) {
    return this.get(`author/${authorId}`);
  }
}
