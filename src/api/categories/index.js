import { deepCopy } from 'src/utils/deep-copy';

import { post, categories } from './data';

class CategoryAPI {
  getCategories(request = {}) {
    // Change this to actual API call
    return Promise.resolve(deepCopy(categories));
  }

  getCategory(categoryId) {
    const categoryData = categories.find((category) => category.id === categoryId);

    return Promise.resolve(deepCopy(categoryData));
  }
}

export const categoryAPI = new CategoryAPI();
