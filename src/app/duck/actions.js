import types from './types';

const fetchCurrentUserBegin = () => ({
  type: types.FETCH_CURRENT_USER_BEGIN
});

const fetchCurrentUserSuccess = user => ({
  type: types.FETCH_CURRENT_USER_SUCCESS,
  payload: {
    user
  }
})

const fetchCurrentUserFailure = error => ({
  type: types.FETCH_CURRENT_USER_FAILURE,
  payload: {
    error
  }
})

const fetchFavoritePhotosSuccess = favoritePhotos => ({
  type: types.FETCH_FAVORITE_PHOTOS_SUCCESS,
  payload: {
    favoritePhotos
  }
})

const fetchFavoriteUsersSuccess = favoriteUsers => ({
  type: types.FETCH_FAVORITE_USERS_SUCCESS,
  payload: {
    favoriteUsers
  }
})
const fetchUploadedPhotosSuccess = uploadedPhotos => ({
  type: types.FETCH_UPLOADED_PHOTOS_SUCCESS,
  payload: {
    uploadedPhotos
  }
})

export default {
  fetchCurrentUserBegin,
  fetchCurrentUserSuccess,
  fetchCurrentUserFailure,
  fetchFavoritePhotosSuccess,
  fetchFavoriteUsersSuccess,
  fetchUploadedPhotosSuccess
}
