import { USER_LIST_SIZE } from '../../../utils/constants';
import Creators from './actions';
import API from '../../../utils/API';

const fetchAuthorsBegin = Creators.fetchAuthorsBegin;
const fetchAuthorsSuccess = Creators.fetchAuthorsSuccess;
const fetchAuthorsFailure = Creators.fetchAuthorsFailure;

const getAuthors = API.getAuthors;

const loadAuthorList = (page = 0, size = USER_LIST_SIZE) => {
  return dispatch => {
    dispatch(fetchAuthorsBegin());
    return getAuthors(page, size)
      .then(response => {
        dispatch(fetchAuthorsSuccess(response.data))
        return response.data;
      })
      .catch(() => (
        dispatch(fetchAuthorsFailure('Failed to load resource: Could not connect to the server.'))
      ))
  }
}

export default {
  loadAuthorList
}
