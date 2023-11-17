import { deepCopy } from 'src/utils/deep-copy';

import { post, clubs } from './data';
import axios from "axios";

class ClubsAPI {
  async getClubs(request = {}) {
    // Change this to actual API call
    // Get the clubs based on the category
    const { category, filters } = request;

    const clubs_filtered = clubs.filter((club) => {
      if (club.category === category) {
        return true;
      }
      return false;
    }
    );

    const result = await axios.get(`http://localhost:8001/categories/${category}`)
    let category_data = result['data'][0]['data']['category_info'];
    console.log("category data is", category_data);
    let data = result['data'][0]['data']['clubs'];

    let count = data.length;

    // Filters are members, trainingDay, location and name
    if (typeof filters !== 'undefined') {
      data = data.filter((club) => {
        if (typeof filters.name !== 'undefined' && filters.name !== '') {
          let queryMatched = false;
          const properties = ['title'];

          properties.forEach((property) => {
            if (club[property].toLowerCase().includes(filters.name.toLowerCase())) {
              queryMatched = true;
            }
          });

          if (!queryMatched) {
            return false;
          }
        }

        // It is possible to select multiple category options
        if (typeof filters.members !== 'undefined' && filters.members.length > 0) {
          const memberMatched = filters.members.includes(club.members);

          if (!memberMatched) {
            return false;
          }
        }

        if (typeof filters.trainingDay !== 'undefined' && filters.trainingDay.length > 0) {
          // Split the club.trainingDay by the comma and check if the filters.trainingDay includes any of the splitted values
          let trainingDayMatched = false;

          filters.trainingDay.forEach((trainingDay) => {
            if (club.training.toLowerCase().includes(trainingDay.toLowerCase())) {
               trainingDayMatched = true;
            }
          });

          if (!trainingDayMatched) {
            return false;
          }
        }

        if (typeof filters.location !== 'undefined' && filters.location.length > 0) {
          let locationMatched = false;

          filters.location.forEach((location) => {
            if (club.location.toLowerCase().includes(location.toLowerCase())) {
               locationMatched = true;
            }
          });


          if (!locationMatched) {
            return false;
          }
        }


        return true;
      });
      count = data.length;
    }

    console.log("data is", data);



    return {
      data: data,
      categoryInfo: category_data,
    };
  }

  getClub(request) {
    return Promise.resolve(deepCopy(clubs));
  }
}

export const clubsAPI = new ClubsAPI();
