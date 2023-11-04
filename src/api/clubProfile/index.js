import { deepCopy } from 'src/utils/deep-copy';
import { connections, feed, posts, profile, leaders } from './data';

class ClubProfileApi {
  getProfile(request) {
    return Promise.resolve({
      profile: deepCopy(profile),
      leaders: deepCopy(leaders),
    });
  }

  getConnections(request = {}) {
    const { filters } = request;

    let data = deepCopy(connections);
    let count = data.length;


    if (typeof filters !== 'undefined') {

      data = data.filter((connection) => {
        if (typeof filters.gender !== 'undefined' && filters.gender.length > 0) {
          const genderMatched = filters.gender.includes(connection.gender);
          console.log("genderfilters", filters)

          if (!genderMatched) {
            return false;
          }
        }

        // Filter for cluster
        if (typeof filters.cluster !== 'undefined' && filters.cluster.length > 0) {
          const clusterMatched = filters.cluster.includes(connection.cluster);

          if (!clusterMatched) {
            return false;
          }
        }

        // Filter for course
        if (typeof filters.course !== 'undefined' && filters.course.length > 0) {
          const courseMatched = filters.course.includes(connection.course);

          if (!courseMatched) {
            return false;
          }
        }

        // Filter for year
        if (typeof filters.year !== 'undefined' && filters.year.length > 0) {
          const yearMatched = filters.year.includes(connection.year);

          if (!yearMatched) {
            return false;
          }
        }

        return true;
      });

      count = data.length;
    }

    return Promise.resolve(deepCopy(data));
  }

  getPosts(request) {
    return Promise.resolve(deepCopy(posts));
  }

}

export const clubProfileApi = new ClubProfileApi();
