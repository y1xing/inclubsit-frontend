import { deepCopy } from 'src/utils/deep-copy';
import { connections, feed, posts, profile, leaders } from './data';

class ClubProfileApi {
  getProfile(request) {
    return Promise.resolve({
      profile: deepCopy(profile),
      leaders: deepCopy(leaders),
    });
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
}

export const clubProfileApi = new ClubProfileApi();
