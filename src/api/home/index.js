import axios from 'axios';
import { API_URL } from "../config";

class HomeApi {
  async getFeed(studentid) {
    const postUrl = API_URL + "/students/" + studentid + "/updates"
    let result = await axios.get(postUrl);
    return result['data']['data'];
  }

  async increaseLike(studentid, postid) {
    const postUrl = API_URL + "/clubs/" + postid + "/increaseLike/?user_id=" + studentid
    let result = await axios.put(postUrl);
    console.log(result);
  }

  async decreaseLike(studentid, postid) {
    const postUrl = API_URL + "/clubs/" + postid + "/decreaseLike/?user_id=" + studentid
    let result = await axios.put(postUrl);
    console.log(result);
  }
  async getRecommendations(studentid) {
    const recommendationUrl = API_URL + "/students/" + studentid + "/recommended"
    let result = await axios.get(recommendationUrl);
    return result['data']['data'];
  }
}

export const homeAPI = new HomeApi();
