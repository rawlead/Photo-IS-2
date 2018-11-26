import API from '../../../utils/API';
import Actions from './actions';

const fetchPhotosBegin = Actions.fetchPhotosBegin;
const fetchPhotosSuccess = Actions.fetchPhotosSuccess;
const fetchPhotosFailure = Actions.fetchPhotosFailure;

const fetchCategoriesBegin = Actions.fetchCategoriesBegin;
const fetchCategoriesSuccess = Actions.fetchCategoriesSuccess;
const fetchCategoriesFailure = Actions.fetchCategoriesFailure;
const setActiveCategory = Actions.setActiveCategory;

const getCategoriesRequest = API.getCategoriesRequest;
const getPhotosRequest = API.getPhotosRequest;

const setActivePhotoCategory = (photoCategory) => {
  return dispatch => {
    dispatch(setActiveCategory(photoCategory));
  }
}

const fetchPhotos = (page, size) => {
  return dispatch => {
    dispatch(fetchPhotosBegin());
    return getPhotosRequest(page, size)
      .then(response => {
        dispatch(fetchPhotosSuccess(response.data));
        return response.data;
      })
      .catch(() => (
        dispatch(fetchPhotosFailure('Failed to fetch photos: Could not connect to the server'))
      ))
  }
}

const fetchAllCategories = () => {
  return dispatch => {
    dispatch(fetchCategoriesBegin());
    return getCategoriesRequest()
      .then(response => {
        dispatch(fetchCategoriesSuccess(response.data));
        return response.data;
      })
      .catch(() => (
        dispatch(fetchCategoriesFailure('Failed to load resource: Could not connect to the server.'))
      ))
  }
}


export default {
  fetchPhotos,
  setActivePhotoCategory,
  fetchAllCategories
}