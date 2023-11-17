import { deepCopy } from "src/utils/deep-copy";
import { clubs } from "./data";
import axios from 'axios';

class ProfileAPI {
   
    getClubs() {
        return Promise.resolve(deepCopy(clubs));

    }

    //  getProfile(studentid) {
    //     const profileUrl = 'http://localhost:8001/students/' + studentid + '/profile';

    //     return fetch(profileUrl)
    //         .then(response => {
    //             if (!response.ok) {
    //                 throw new Error(`Failed to fetch profile data: ${response.status}`);
    //             }
    //             return response.json();
    //         })
    //         .then(data => {
    //             deepCopy(data);
    //             return data["data"];
    //         })
    //         .catch(error => {
    //             console.error(error);
    //             throw error;
    //         });
    // }

    async getProfile(studentid) {
        const profileUrl = 'http://localhost:8001/students/' + studentid + '/profile';
        let result =  await axios.get(profileUrl)
        return result["data"]["data"];
    }
    
}

export const profileAPI = new ProfileAPI();