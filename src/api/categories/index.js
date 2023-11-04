import { deepCopy } from 'src/utils/deep-copy';

import { post, categories } from './data';

class CategoryAPI {
  getCategories(request = {}) {
    // Change this to actual API call
    return Promise.resolve(deepCopy(categories));
  }

  getCategory(request) {
    return Promise.resolve(deepCopy(categories));
  }
}

export const categoryAPI = new CategoryAPI();
