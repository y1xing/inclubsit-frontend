import { deepCopy } from 'src/utils/deep-copy';
import { connections, feed, posts, profile, leaders } from './data';
import axios from "axios";

class ClubProfileApi {
  async getProfile(clubId) {
    // Request endpoints /clubs/:clubId/profile

    const result = await axios.get(`http://localhost:8001/clubs/${clubId}/profile`);

    return result['data'][0]['data'];
  }

  async updateProfile(clubId, data) {
    // Request endpoints /clubs/:clubId/profile

    const result = await axios.put(`http://localhost:8001/clubs/${clubId}/profile`, data);

    return result['data'];
  }

  async getConnections(clubId, filters) {


    console.log("filters", filters)
    console.log("clubId", clubId)

    let result = await axios.get(`http://localhost:8001/clubs/${clubId}/members`);
    console.log("result", result)
    let data = result['data'][0]['data'];


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

  async getPosts(clubId) {
    let result = await axios.get(`http://localhost:8001/clubs/${clubId}/updates`);
    return result['data'][0]['data'];
  }

  async updatePost(postId, data) {
    let result = await axios.put(`http://localhost:8001/clubs/${postId}/updates`, data);
    return result['data']['data'];
  }

  async createPost(clubId, data) {
    let result = await axios.post(`http://localhost:8001/clubs/${clubId}/updates`, data);
    console.log("result", result)
    return result['data']['data'];
  }

  async deletePost(postId) {
    let result = await axios.delete(`http://localhost:8001/clubs/${postId}/updates`);
    return result['data'];
  }

  async joinClub(clubId, studentId) {
    let result = await axios.post(`http://localhost:8001/clubs/${clubId}/member`, { StudentID: studentId });
    return result['data'];
  }

  async leaveClub(clubId, studentId) {
    let result = await axios.delete(`http://localhost:8001/clubs/${clubId}/member/${studentId}`);
    return result['data'];
  }

  async likePost(postId, studentId) {
    let result = await axios.put(`http://localhost:8001/clubs/${postId}/increaseLike`, { studentID: studentId });
    return result['data'];
  }

  async unlikePost(postId, studentId) {
    let result = await axios.put(`http://localhost:8001/clubs/${postId}/decreaseLike`, { studentID: studentId });
    return result['data'];
  }


}

export const clubProfileApi = new ClubProfileApi();
