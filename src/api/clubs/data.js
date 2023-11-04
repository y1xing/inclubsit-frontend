import { subDays, subHours, subMinutes, subSeconds } from 'date-fns';

const now = new Date();

export const clubs = [
  {
    id: "adventure",
    media: '/assets/clubs/adventure.jpeg',
    title: 'Adventure',
    category: 'sports',
    members: "1-10",
    training: "Every Friday, 6pm to 8pm",
    location: "Dover Campus"
  },
  {
    id: 'badminton',
    media: '/assets/clubs/badminton.jpeg',
    title: 'Badminton',
    category: 'sports',
    members: '41-50',
    training: "Every Thursday, 6pm to 8pm",
    location: "Dover Campus"
  },
  {
    id: 'basketball',
    media: '/assets/clubs/adventure.jpeg',
    title: 'Basketball',
    category: 'sports',
    members: '1-10',
    training: "Every Friday, 6pm to 8pm",
    location: "Dover Campus"
  },
  {
    id: 'soccer',
    media: '/assets/clubs/badminton.jpeg',
    title: 'Soccer',
    category: 'sports',
    members: '41-50',
    training: "Every Thursday, 6pm to 8pm",
    location: "Dover Campus"
  },
  // New clubs
  {
    id: 'painting',
    media: '/assets/clubs/painting.jpeg',
    title: 'Painting Club',
    category: 'special-interests',
    members: '11-20',
    training: "Every Wednesday, 5pm to 7pm",
    location: "City Campus"
  },
  {
    id: 'photography',
    media: '/assets/clubs/photography.jpeg',
    title: 'Photography Club',
    category: 'special-interests',
    members: '21-30',
    training: "Every Monday, 4pm to 6pm",
    location: "City Campus"
  },
  {
    id: 'cooking',
    media: '/assets/clubs/cooking.jpeg',
    title: 'Cooking Club',
    category: 'special-interests',
    members: '31-40',
    training: "Every Saturday, 3pm to 5pm",
    location: "Dover Campus"
  },
  {
    id: 'yoga',
    media: '/assets/clubs/yoga.jpeg',
    title: 'Yoga Club',
    category: 'special-interests',
    members: '41-50',
    training: "Every Tuesday, 6pm to 8pm",
    location: "City Campus"
  },

];

export const post = {
  id: '24b76cac9a128cd949747080',
  author: {
    avatar: '/assets/avatars/avatar-jie-yan-song.png',
    name: 'Jie Yan Song',
  },
  category: 'Programming',
  content: `
## Cras at molestie lacus. Phasellus feugiat leo quis sem iaculis, sed mattis nibh accumsan.

Phasellus ullamcorper ultrices ullamcorper. Nunc auctor porttitor ex, non consequat ipsum aliquam at. Duis dapibus dolor in nisi viverra, a elementum nulla viverra. Etiam feugiat turpis leo, nec finibus diam rhoncus ac. Sed at metus et orci consequat facilisis vel vel diam.

## Cras at molestie lacus. Phasellus feugiat leo quis sem iaculis, sed mattis nibh accumsan.


Etiam faucibus massa auctor gravida finibus.
Cras nulla magna, dapibus sit amet accumsan nec, ullamcorper sit amet dolor.

Donec leo nisi, porta et gravida nec, tincidunt ac velit. Aliquam in turpis a quam tempus dapibus. Morbi in tellus tempor, hendrerit mi vel, aliquet tellus. Quisque vel interdum ante. Nunc quis purus sem. Donec at risus lacinia ipsum cursus condimentum at ac dui. Nulla bibendum feugiat tellus ac tristique. Proin auctor, lectus et accumsan varius, justo odio vulputate neque, et efficitur augue leo id ex. Aliquam eget turpis nisl. Nam sapien massa, sollicitudin et vehicula a, fringilla vitae purus. Praesent a vestibulum felis.

\`\`\`javascript
// This is a comment

const x = () => {};

\`\`\`

Class aptent taciti sociosqu ad litora torquent \`const d = 3;\` per conubia nostra, per inceptos himenaeos. Morbi maximus metus eget nulla malesuada, sit amet luctus est fringilla. Aenean imperdiet rhoncus justo, ut pharetra lorem gravida placerat. Duis et enim lorem. Aliquam placerat elit est, vitae fermentum ipsum finibus sed. Donec dapibus magna non tortor commodo rhoncus. Suspendisse luctus tincidunt eros, aliquet pellentesque neque venenatis quis. Aliquam auctor felis nec orci ornare gravida. Fusce ac neque sit amet nibh scelerisque molestie. Nullam in lorem viverra, aliquam nunc vel, interdum orci. Fusce mattis est neque, et tincidunt justo blandit quis. Etiam tincidunt purus in libero semper, vitae placerat dui vehicula. Pellentesque sit amet imperdiet purus, quis lacinia eros.

Duis placerat turpis non metus dapibus sagittis. Vestibulum ex massa, tempus pulvinar varius at, placerat non justo. Ut tristique nisl sed porta pulvinar. Nunc ex nibh, tempor eget elit vel, fringilla ornare risus. Praesent vel lacus finibus, laoreet nulla quis, semper tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec volutpat quis dui ac varius. Suspendisse potenti. Maecenas sagittis lacus vitae ex rhoncus, eu fringilla urna luctus.

## Donec vel erat augue. Aenean ut nisl cursus nulla tempus ultricies vel eget lorem.

Suspendisse pharetra dolor in massa molestie, vel molestie nunc accumsan. Cras varius aliquet pellentesque. Curabitur ac mi fermentum nibh congue pharetra in eu nunc. Vivamus mattis urna a fringilla facilisis. Cras finibus nulla in nulla imperdiet pharetra. Morbi vel tortor turpis.
`,
  cover: '/assets/covers/business-2-4x4-large.png',
  publishedAt: subMinutes(subSeconds(now, 16), 45).getTime(),
  readTime: '5 min',
  shortDescription:
    'Aliquam dapibus elementum nulla at malesuada. Ut mi nisl, aliquet non mollis vel, feugiat non nibh.',
  title: 'Why I Still Lisp, and You Should Too',
};
