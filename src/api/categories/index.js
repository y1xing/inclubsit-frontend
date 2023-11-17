import { deepCopy } from 'src/utils/deep-copy';

import { post, categories } from './data';
import axios from "axios";

class CategoryAPI {
  async getCategories(request = {}) {
    // Change this to actual API call
    // return Promise.resolve(deepCopy(categories));
    let result = await axios.get(`http://localhost:8001/categories/all`)
    return result['data'][0]['data'];
  }

  getCategory(categoryId) {
    const categoryData = categories.find((category) => category.id === categoryId);

    return Promise.resolve(deepCopy(categoryData));
  }
}

export const categoryAPI = new CategoryAPI();
