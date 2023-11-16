import { deepCopy } from "src/utils/deep-copy";
import { clubs } from "./data";

class ProfileAPI {
   
    getClubs() {
        return Promise.resolve(deepCopy(clubs));

    }

     getProfile(studentid) {
        const profileUrl = 'http://localhost:8001/students/' + studentid + '/profile';

        return fetch(profileUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch profile data: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                deepCopy(data);
                return data["data"];
            })
            .catch(error => {
                console.error(error);
                throw error;
            });
    }
    
}

export const profileAPI = new ProfileAPI();