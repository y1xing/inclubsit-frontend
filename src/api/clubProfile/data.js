import { subHours, subMinutes } from 'date-fns';

const now = new Date();

export const profile = {
  id: '5e86809283e28b96d2d38537',
  avatar: '/assets/clubs/badminton.jpeg',
  category: 'Sports',
  cover: '/assets/covers/abstract-1-4x3-large.png',
  trainingTime: '6pm to 10pm',
  trainingDay: 'Every Wednesday ',
  email: 'sitbball@outlook.com',
  instagram: 'https://www.instagram.com/sitbasketball',
  name: 'Basketball Club',
  location: 'SIT Dover Campus',
  description: 'At SIT Basketball, we train hard on the court, but we also play hard and bond as a team off the court! Training sessions are usually of high intensity, but it is very fulfilling, and the friendships formed are treasured.\n' +
    '\n' +
    'Both Men\'s and Women\'s team train for the SUniG and IVP competitions every year. As the competition approaches, our training will be ramped up as well.\n' +
    '\n' +
    'Whether you are here to gain some exposure or you are an experienced basketball player, do join us as it is an opportunity to unleash your potential and take your skills to a new height!\n' +
    '\n' +
    'Even off the court, we do have regular team bonding sessions to get to know each other better :)',
};

export const leaders = [
  {
    avatar: '/assets/avatars/avatar-carson-darrin.png',
    role: 'President',
    name: 'Ng Zi Bin',
    course: 'Applied Artificial Intelligence',
    year: 'Y2',
  },
  {
    avatar: '/assets/avatars/avatar-fran-perez.png',
    role: 'Vice President',
    name: 'Jurgen Tan',
    course: 'Applied Artificial Intelligence',
    year: 'Y2',
  },
  {
    avatar: '/assets/avatars/avatar-miron-vitold.png',
    role: 'Secretary',
    name: 'Wong Yok Hung',
    course: 'Applied Artificial Intelligence',
    year: 'Y2',
  },
];


export const connections = [
  {
    id: '5e887ac47eed253091be10cb',
    avatar: '/assets/avatars/avatar-carson-darrin.png',
    commonConnections: 10,
    name: 'Carson Darrin',
    status: 'rejected',
  },
  {
    id: '5e887b209c28ac3dd97f6db5',
    avatar: '/assets/avatars/avatar-fran-perez.png',
    commonConnections: 8,
    name: 'Fran Perez',
    status: 'pending',
  },
  {
    id: '5e86805e2bafd54f66cc95c3',
    avatar: '/assets/avatars/avatar-miron-vitold.png',
    commonConnections: 5,
    name: 'Miron Vitold',
    status: 'not_connected',
  },
  {
    id: '5e887a1fbefd7938eea9c981',
    avatar: '/assets/avatars/avatar-penjani-inyene.png',
    commonConnections: 1,
    name: 'Penjani Inyene',
    status: 'connected',
  },
];

export const posts = [
  {
    id: '5e887faca2b7a1ddce01221a',
    avatar: '/assets/clubs/badminton.jpeg',
    name: 'Basketball Club',
    postType: 'event',
    createdAt: subHours(now, 4).getTime(),
    isLiked: true,
    likes: 24,
    media: '/assets/covers/bball-cover-2.png',
    message: 'SuniG’23 Women’s Game ScheduleLess than a week till our Women’s Team go again at this year’s university games! 😤 Catch them in action at The Wave@NTU. All the best girls! ✨💪🏻#sitsports #sitpride #sitbasketball',
  },
  {
    id: '5e887faf03e78a5359765636',
    avatar: '/assets/clubs/badminton.jpeg',
    name: 'Basketball Club',
    postType: 'update',
    createdAt: subHours(now, 7).getTime(),
    isLiked: false,
    likes: 65,
    message:
      'As a human being, you are designed in a way that makes you incapable of experiencing any positive emotion unless you set an aim and progress towards it. What makes you happy is not, in fact, attaining it, but making progress towards it.',
  },
];
