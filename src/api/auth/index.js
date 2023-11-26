import axios from "axios";
import { API_URL } from "../config";

const STORAGE_KEY = 'users';

// NOTE: We use sessionStorage since memory storage is lost after page reload.
//  This should be replaced with a server call that returns DB persisted data.

const getPersistedUsers = () => {
  try {
    const data = sessionStorage.getItem(STORAGE_KEY);

    if (!data) {
      return [];
    }

    return JSON.parse(data);
  } catch (err) {
    console.error(err);
    return [];
  }
};

const persistUser = (user) => {
  try {
    const users = getPersistedUsers();
    const data = JSON.stringify([...users, user]);
    sessionStorage.setItem(STORAGE_KEY, data);
  } catch (err) {
    console.error(err);
  }
};

class AuthApi {
  async me(studentID, clubID) {

    console.log("studentID", studentID)
    console.log("clubID", clubID)

    let result = await axios.get(`${API_URL}/students/${studentID}/${clubID}/role`)
    let role = result['data'][0]['data']

    if (role === 0) {
      return {
        role: "non member",
        studentID: studentID,
      }
    }

    if (role === 1) {
      return {
        role: "member",
        studentID: studentID,
      }
    }

    if (role > 1) {
      return {
        role: "student leader",
        studentID: studentID,
      }
    }


  }

}

export const authApi = new AuthApi();
