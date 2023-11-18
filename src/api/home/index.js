import { deepCopy } from 'src/utils/deep-copy';
import { connections, feed, posts, profile } from './data';
import axios from 'axios';

class HomeApi {
  async getFeed(studentid) {
    const postUrl = "http://localhost:8001/students/" + studentid + "/updates"
    let result = await axios.get(postUrl);
    return result['data']['data'];
  }
  
  async increaseLike(studentid, postid) {
    const postUrl = "http://localhost:8001/clubs/" + postid + "/increaseLike/?user_id=" + studentid
    let result = await axios.put(postUrl);
    console.log(result);
  }

  async decreaseLike(studentid, postid) {
    const postUrl = "http://localhost:8001/clubs/" + postid + "/decreaseLike/?user_id=" + studentid
    let result = await axios.put(postUrl);
    console.log(result);
  }
  async getRecommendations(studentid) {
    const recommendationUrl = "http://localhost:8001/students/" + studentid + "/recommended"
    let result = await axios.get(recommendationUrl);
    return result['data']['data'];
  }
}

export const homeAPI = new HomeApi();
