import { deepCopy } from 'src/utils/deep-copy';
import { connections, feed, posts, clubs, profile } from './data';

class HomeApi {
  getProfile(request) {
    return Promise.resolve(deepCopy(profile));
  }

  getConnections(request) {
    return Promise.resolve(deepCopy(connections));
  }

  getPosts(request) {
    return Promise.resolve(deepCopy(posts));
  }

  getFeed(request) {
    return Promise.resolve(deepCopy(feed));
  }

  getClubs(request) {
    return Promise.resolve(deepCopy(clubs));
  }
}

export const homeApi = new HomeApi();
