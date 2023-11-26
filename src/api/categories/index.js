import axios from "axios";
import { API_URL } from "../config";

class CategoryAPI {
  async getCategories(request = {}) {
    // Change this to actual API call
    // return Promise.resolve(deepCopy(categories));
    let result = await axios.get(`${API_URL}categories/all`)
    return result['data'][0]['data'];
  }

  async getCategory(categoryId) {
    // const categoryData = categories.find((category) => category.id === categoryId);
    const result = await axios.get(`${API_URL}/categories/${categoryId}`)

    return result['data'][0]['data'];
  }


  async getClubID(search){
    const result = await axios.get(`${API_URL}/clubs/search/${search}`)
    return result['data']
  }
}

export const categoryAPI = new CategoryAPI();
