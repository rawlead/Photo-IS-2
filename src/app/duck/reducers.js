import types from './types';

const initialState = {
  content: null,
  favoritePhotos: [],
  favoriteUsers: [],
  uploadedPhotos: [],
  isLoading: false,
  loggedIn: false,
  error: null
}

const currentUserReducer = (state = initialState, action) => {
  const payload = action.payload;

  switch (action.type) {
    case types.FETCH_CURRENT_USER_BEGIN:
      return {
        ...state,
        isLoading: true,
        loggedIn: false,
        error: null
      }

    case types.FETCH_CURRENT_USER_SUCCESS:
      return {
        ...state,
        content: payload.user,
        error: payload.error,
        isLoading: false,
        loggedIn: true
      }

    case types.FETCH_CURRENT_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload.error,
        loggedIn: false,
        content: null,
      }

    case types.FETCH_FAVORITE_PHOTOS_SUCCESS:
      return {
        ...state,
        favoritePhotos: payload.favoritePhotos,
      }

    case types.FETCH_FAVORITE_USERS_SUCCESS:
      return {
        ...state,
        favoriteUsers: payload.favoriteUsers,

      }
    
    case types.FETCH_UPLOADED_PHOTOS_SUCCESS:
      return {
        ...state,
        uploadedPhotos: payload.uploadedPhotos,
      }
      
    default:
      return state;
  }
}

export default currentUserReducer;
