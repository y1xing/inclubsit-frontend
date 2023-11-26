import axios from 'axios';
import { API_URL } from "../config";

class ProfileAPI {

    async getClubs(studentid) {
        const clubsUrl = API_URL + '/students/' + studentid + '/clubs';
        let result =  await axios.get(clubsUrl)
        return result['data']['data'];

    }

    async getProfile(studentid) {
        const profileUrl = API_URL + '/students/' + studentid + '/profile';
        let result =  await axios.get(profileUrl)
        return result['data']['data'];
    }

}

export const profileAPI = new ProfileAPI();
