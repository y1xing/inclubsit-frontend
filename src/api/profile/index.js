import { deepCopy } from "src/utils/deep-copy";
import { clubs, profile } from "./data";

class ProfileAPI {
    getClubs() {
        return Promise.resolve(deepCopy(clubs));
    }

    getProfile() {
        return Promise.resolve(deepCopy(profile));
    }
    
}

export const profileAPI = new ProfileAPI();