import axios from 'axios';
import { OAUTH_BASE_URL, API_BASE_URL, USER_LIST_SIZE, PHOTOS_LIST_SIZE } from './constants';
import { accessToken } from './helpers';

const getAuthors = (page, size) => {
  page = page || 0;
  size = size || USER_LIST_SIZE;
  return axios({
    url: API_BASE_URL + "/users?page=" + page + "&size=" + size,
    method: 'GET'
  });
};

const getPhotosRequest = (page, size) => {
  page = page || 0;
  size = size || USER_LIST_SIZE;
  return axios({
    url: API_BASE_URL + "/photos?page=" + page + "&size=" + size,
    method: 'GET'
  });
}

const getCurrentUserRequest = () => {
  return axios.get(API_BASE_URL + "/users/loggedUser?" + accessToken());
};

const userLoginRequest = params => {
  return axios({
    method: 'post',
    url: OAUTH_BASE_URL,
    auth: {
      username: 'photois-client', password: 'photois-secret'
    },
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
    },
    data: params
  });
};

const signOutRequest = () => {
  return axios.get(API_BASE_URL + "/users/signout?" + accessToken());
};

const userSignupRequest = params => {
  return axios({
    method: 'post',
    url: API_BASE_URL + '/users/signup',
    headers: {
      'Content-Type': 'application/json'
    },
    data: params
  });
};

const getCategoriesRequest = () => {
  return axios.get(API_BASE_URL + "/categories");
}

const getFavoritePhotosRequest = (userId) => {
  return axios.get(API_BASE_URL + '/users/' + userId + '/favorite/photos');
}
const addPhotoToFavoritesRequest = (userId, favoritePhotoId) => {
  return axios({
    method: 'post',
    url: API_BASE_URL + '/users/' + userId + '/favorite/photos?' + accessToken(),
    params: {
      favoritePhotoId,
    },
  })
}
const removePhotoFromFavoritesRequest = (userId, photoId) => {
  return axios({
    method: 'delete',
    url: API_BASE_URL + '/users/' + userId + '/favorite/photos/' + photoId + '/?' + accessToken(),
  })
}

const getFavoriteUsersRequest = (userId) => {
  return axios.get(API_BASE_URL + "/users/" + userId + "/favorite/users")
}
const addUserToFavoritesRequest = (logedInUserId, favoriteUserId) => {
  return axios({
    method: 'post',
    url: API_BASE_URL + '/users/' + logedInUserId + '/favorite/users?' + accessToken(),
    params: {
      favoriteUserId
    }
  })
}
const removeUserFromFavoritesRequest = (logedInUserId, favoriteUserId) => {
  return axios({
    method: 'delete',
    url: API_BASE_URL + '/users/' + logedInUserId + '/favorite/users/ ' + favoriteUserId + ' ?' + accessToken(),
  })
}

const getSinglePhotoRequest = (photoId) => {
  return axios.get(API_BASE_URL + '/photos/' + photoId);
}

const getPhotosByUsernameRequest = (username, page, size) => {
  page = page || 0;
  size = size || PHOTOS_LIST_SIZE;
  return axios({
    url: API_BASE_URL + '/users/' + username + '/photos?page=' + page + '&size=' + size,
    method: 'GET'
  });
}

const getCommentsToPhotoRequest = (photoId) => {
  return axios.get(API_BASE_URL + '/photos/' + photoId + '/comments');
}

const postCommentRequest = (photoId, content) => {
  return axios({
    method: 'post',
    url: API_BASE_URL + '/photos/' + photoId + '/comments?' + accessToken(),
    headers: {
      'Content-Type': 'application/json'
    },
    data: content
  });
}

const deleteCommentRequest = (userId, commentId) => {
    return axios.delete( API_BASE_URL + '/users/' + userId + '/comments/' + commentId + '?' + accessToken());
}

const uploadPhotoRequest = (userId, formData) => {
  return axios({
      method: 'post',
      url: API_BASE_URL + '/users/' + userId + '/photos?' + accessToken(),
      data: formData,
  })
}

const updateAvatarRequest = (userId, formData) => {
  return axios.put( API_BASE_URL + '/users/' + userId + '/avatar?' + accessToken(), formData);
}

const updateEmailRequest = (userId, newEmail, newEmailConfirm) => {
  return axios({
      method: 'put',
      url: API_BASE_URL + '/users/' + userId + '/email?' + accessToken(),
      params: {newEmail, newEmailConfirm}
  })
}

const updatePasswordRequest = (userId, oldPass, newPass, newPassConfirm) => {
  return axios({
      method: 'put',
      url: API_BASE_URL + '/users/' + userId + '/password?' + accessToken(),
      params: {oldPass, newPass, newPassConfirm}
  })
}

const getUserByUsernameRequest = (username) => {
  return axios.get(API_BASE_URL + "/users/" + username);
}

export default {
  getAuthors,
  getPhotosRequest,
  getCurrentUserRequest,
  userLoginRequest,
  signOutRequest,
  userSignupRequest,
  getCategoriesRequest,
  getFavoritePhotosRequest,
  addPhotoToFavoritesRequest,
  removePhotoFromFavoritesRequest,
  getFavoriteUsersRequest,
  addUserToFavoritesRequest,
  removeUserFromFavoritesRequest,
  getSinglePhotoRequest,
  getPhotosByUsernameRequest,
  getCommentsToPhotoRequest,
  postCommentRequest,
  deleteCommentRequest,
  uploadPhotoRequest,
  updateAvatarRequest,
  updateEmailRequest,
  updatePasswordRequest,
  getUserByUsernameRequest
};
