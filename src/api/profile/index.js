import axios from 'axios';

class ProfileAPI {
   
    async getClubs(studentid) {
        const clubsUrl = 'http://localhost:8001/students/' + studentid + '/clubs';
        let result =  await axios.get(clubsUrl)
        return result['data']['data'];

    }

    async getProfile(studentid) {
        const profileUrl = 'http://localhost:8001/students/' + studentid + '/profile';
        let result =  await axios.get(profileUrl)
        return result['data']['data'];
    }
    
}

export const profileAPI = new ProfileAPI();