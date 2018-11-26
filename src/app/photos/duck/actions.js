import types from './types';

const fetchPhotosBegin = () => ({
  type: types.FETCH_PHOTOS_BEGIN,
})

const fetchPhotosSuccess = (data) => ({
  type: types.FETCH_PHOTOS_SUCCESS,
  payload: {
   photos: data
  }
})

const fetchPhotosFailure = (error) => ({
  type: types.FETCH_PHOTOS_FAILURE,
  payload: { error }
})

const fetchCategoriesBegin = () => ({
  type: types.FETCH_PHOTO_CATEGORIES_BEGIN,
});

const fetchCategoriesSuccess = data => ({
  type: types.FETCH_PHOTO_CATEGORIES_SUCCESS,
  payload: {
    photoCategories: data,
  }
});

const fetchCategoriesFailure = error => ({
  type: types.FETCH_PHOTO_CATEGORIES_FAILURE,
  payload: { error }
});

const setActiveCategory = photoCategory => ({
  type: types.SET_ACTIVE_PHOTO_CATEGORY,
  payload: {
    activePhotoCategory: photoCategory
  }
});



export default {
  fetchPhotosBegin,
  fetchPhotosSuccess,
  fetchPhotosFailure,
  fetchCategoriesBegin,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
  setActiveCategory
}
