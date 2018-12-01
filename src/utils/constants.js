const PORT = '';
const BASE_URL = 'https://www.ivans.tech'
// const BASE_URL = 'http://photois.us-east-1.elasticbeanstalk.com'

// const PORT = 5000;
// const BASE_URL = 'http://localhost'

const GA_TRACKING_ID = 'UA-122686270-3';


const OAUTH_BASE_URL = BASE_URL + ':' + PORT + '/oauth/token';
const API_BASE_URL = BASE_URL + ':' + PORT + '/api';
const USER_LIST_SIZE = 14;
const PHOTOS_LIST_SIZE = 10;
const COMMENT_MAX_SIZE = 150;
const TITLE_MAX_SIZE = 75;
const DESCRIPTION_MAX_SIZE = 150;

export {
  OAUTH_BASE_URL,
  API_BASE_URL,
  USER_LIST_SIZE,
  PHOTOS_LIST_SIZE,
  COMMENT_MAX_SIZE,
  TITLE_MAX_SIZE,
  DESCRIPTION_MAX_SIZE,
  GA_TRACKING_ID
}
