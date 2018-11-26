import types from './types';

const initialState = {
  photoCategories: [],
  photos: {
    content: [],
    page: 0,
    size: 0,
    totalElements: 0,
    totalPages: 0,
    isLast: true,
    isLoading: false
  },
  activePhotoCategory: null,
  error: null,
  isLoading: false
}

const photosReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_PHOTOS_BEGIN:
      return {
        ...state,
        photos: {
          ...state.photos,
          isLoading: true,
        }
      }
    case types.FETCH_PHOTOS_SUCCESS:
      const photosContentCopy = state.photos.content.slice();
      const photos = action.payload.photos;
      return {
        ...state,
        photos: {
          content: photosContentCopy.concat(photos.content),
          page: photos.page,
          size: photos.size,
          totalElements: photos.totalElements,
          totalPages: photos.totalPages,
          isLast: photos.last,
          isLoading: false
        }
      }
    case types.FETCH_PHOTOS_FAILURE:
      return {
        ...state,
        photos: {
          ...state.photos,
          isLoading: false
        }
      }
    case types.FETCH_PHOTO_CATEGORIES_BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case types.FETCH_PHOTO_CATEGORIES_SUCCESS:
      return {
        ...state,
        photoCategories: action.payload.photoCategories,
        isLoading: false,
        error: action.payload.error
      }
    case types.FETCH_PHOTO_CATEGORIES_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
        photoCategories: []
      }
    case types.SET_ACTIVE_PHOTO_CATEGORY:
      return {
        ...state,
        activePhotoCategory: action.payload.activePhotoCategory,
      }
    default:
      return state;
  }
}

export default photosReducer;
