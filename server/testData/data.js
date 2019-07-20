import jsonwebtoken from 'jsonwebtoken';
import { User, Business, Review, Followers } from '../models';

const users = [
  {
    Fullname: 'User One',
    email: 'userone@ymail.co.uk',
    username: 'userone',
    password: 'userone234',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    Fullname: 'User Two',
    email: 'usertwo@gmail.com',
    username: 'usertwo',
    password: 'usertwo345',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  }
];
const followData = [
  {
    userId: 1,
    followerId: 2,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    userId: 2,
    followerId: 1,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  }
];
const businesses = [
  {
    id: 1,
    businessName: 'Johndare Construction',
    businessAddress1: '24, off America Embassy,Maitama, Abuja.',
    tagline: 'number one business in africa',
    phoneNumber1: '081534832467',
    website: 'www.johndare.com.ng',
    category: 'construction',
    businessImageUrl: null,
    defaultBusinessImageUrl: null,
    businessDescription: 'Johndare Nigeria LTD. specializes in the construction of roads, bridges and civil engineering',
    viewCount: 0,
    upvotes: 0,
    downvotes: 0,
    userId: 1,
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: 2,
    businessName: 'Halleluyah Restaurant',
    businessAddress1: '52 Ishaga road, Surulere, Lagos.',
    tagline: 'simply Halle-licious',
    phoneNumber1: '0815332467',
    website: 'www.halleluyah-restaurant.com.ng',
    category: 'restaurant',
    businessImageUrl: null,
    defaultBusinessImageUrl: null,
    businessDescription: 'Halleluyah Restaurant is a 1950s style diner located in Ikorodu, Lagos.',
    viewCount: 0,
    upvotes: 0,
    downvotes: 0,
    userId: 1,
    createdAt: Date.now(),
    updatedAt: Date.now()
  }
];

const reviews = [
  {
    businessId: 1,
    userId: 1,
    title: 'review 1',
    content: 'This is a test review 1',
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    businessId: 1,
    userId: 1,
    title: 'review 2',
    content: 'This is a test review 2',
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    businessId: 1,
    userId: 1,
    title: 'review 3',
    content: 'This is a test review 3',
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    businessId: 1,
    userId: 1,
    title: 'review 4',
    content: 'This is a test review 4',
    createdAt: Date.now(),
    updatedAt: Date.now()
  }
];

/**
 * @description Insert data in user model
 *
 * @returns {void} Nothing
 */
export const insertUserData = () => {
  User.bulkCreate(users);
};

/**
 * @description Insert data into business model
 *
 * @returns {void} Nothing
 */
export const insertBusinessData = () => {
  Business.bulkCreate(businesses);
};

/**
 * @description Insert data into reviews model
 *
 * @returns {void} Nothing
 */
export const insertReviewData = () => {
  Review.bulkCreate(reviews);
};

export const insertFollowData = () => {
  Followers.bulkCreate(followData);
};

/**
 * @description Generates token from data
 *
 * @param {Number} id - User ID
 *
 * @param {string} username - Username
 *
 * @returns {string} token - Generated token
 */
const generateToken = (id, username) => {
  const token = jsonwebtoken.sign({
    id,
    username,
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)
  }, 'process.env.JWT_SECRET');

  return token;
};

export const user1token = generateToken(1, users[0].username);

export const user2token = generateToken(2, users[1].username);

export const validUser = {
  fullname: 'User One',
  email: 'userone@ymail.co.uk',
  username: 'userone',
  password: 'userone234'
};

export const inValidUserId = {
  businessId: 1,
  userId: 10
};

export const userWithNoEmail = {
  Fullname: 'User One',
  email: '',
  username: 'userone',
  password: 'userone234'
};

export const userWithNoName = {
  Fullname: '',
  email: 'userone@ymail.co.uk',
  username: 'userone',
  password: 'userone234'
};

export const userWithNoUsername = {
  Fullname: 'User One',
  email: 'userone@ymail.co.uk',
  username: '',
  password: 'userone234'
};
export const userWithNoPassword = {
  Fullname: 'User One',
  email: 'userone@ymail.co.uk',
  username: 'userone',
  password: ''
};
export const duplicateUsername = {
  Fullname: 'User One',
  email: 'userone@ymail.co.uk',
  username: 'userone',
  password: 'userone234'
};

export const badEmail = {
  Fullname: 'User One',
  email: 'userone@ymail',
  username: 'userone',
  password: 'userone234'
};

export const duplicateEmail = {
  Fullname: 'User One',
  email: 'userone@ymail.co.uk',
  username: 'userone',
  password: 'userone234'
};

export const checkPassword = {
  Fullname: 'User One',
  email: 'userone@ymail.co.uk',
  username: 'userone',
  password: '1qw2'
};

export const inValidBusinessId = {
  businessId: 3,
  userId: 1
};

export const validBusiness = {
  businessName: 'Johndare Construction',
  businessAddress1: '24, off America Embassy,Maitama, Abuja.',
  businessDescription: 'Johndare Nigeria LTD. specializes in the construction of roads, bridges and civil engineering',
  userId: 1
};

export const businessWithNoName = {
  businessName: '',
  businessAddress1: '24, off America Embassy,Maitama, Abuja.',
  businessDescription: 'Johndare Nigeria LTD. specializes in the construction of roads, bridges and civil engineering',
  userId: 1
};

export const businessWithNoAddress = {
  businessName: '',
  businessAddress1: '',
  businessDescription: 'Johndare Nigeria LTD. specializes in the construction of roads, bridges and civil engineering',
  userId: 1
};

export const businessWithNoDescription = {
  businessName: 'Johndare Construction',
  businessAddress1: '24, off America Embassy,Maitama, Abuja.',
  userId: 1
};

export const validReview = {
  title: 'thumbs up',
  content: 'I love this business, keep up the good work',
  businessId: 1,
  userId: 1,
};

export const reviewWithNoTitle = {
  title: '',
  content: 'I love this business, keep up the good work',
  businessId: 1,
  userId: 1,
};

export const reviewWithNoContent = {
  title: 'thumbs up',
  content: '',
  businessId: 1,
  userId: 1,
};

export const validVote = {
  businessId: 1,
  userId: 1
};


export const validFollow = {
  businessId: 1,
  userId: 1
};

export const validFavorite = {
  businessId: 1,
  userId: 1
};
