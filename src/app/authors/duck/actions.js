import types from './types';

const fetchAuthorsBegin = () => ({
  type: types.FETCH_AUTHORS_BEGIN
});

const fetchAuthorsSuccess = data => ({
  type: types.FETCH_AUTHORS_SUCCESS,
  payload: {
    content: data.content,
    page: data.page,
    size: data.size,
    totalElements: data.totalElements,
    totalPages: data.totalPages,
    isLast: data.last
  }
});

const fetchAuthorsFailure = error => ({
  type: types.FETCH_AUTHORS_FAILURE,
  payload: { error }
});

export default {
  fetchAuthorsBegin,
  fetchAuthorsSuccess,
  fetchAuthorsFailure
}
