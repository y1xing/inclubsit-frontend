import { deepCopy } from 'src/utils/deep-copy';

import { post, clubs } from './data';

class ClubsAPI {
  getClubs(request = {}) {
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

    let data = deepCopy(clubs_filtered);
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
          const clubTrainingDay = club?.training.split(',')[0].toLowerCase();
          const trainingDayMatched = filters.trainingDay.includes(clubTrainingDay);

          if (!trainingDayMatched) {
            return false;
          }
        }

        if (typeof filters.location !== 'undefined' && filters.location.length > 0) {
          const locationMatched = filters.location.includes(club.location.toLowerCase());

          if (!locationMatched) {
            return false;
          }
        }


        return true;
      });
      count = data.length;
    }



    return Promise.resolve(data);
  }

  getClub(request) {
    return Promise.resolve(deepCopy(clubs));
  }
}

export const clubsAPI = new ClubsAPI();
