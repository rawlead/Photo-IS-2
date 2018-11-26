import types from './types';

const initialState = {
  content: [],
  page: 0,
  size: 10,
  totalElements: 0,
  totalPages: 0,
  isLast: true,
  error: null,
  isLoading: false,
}

const authorsReducer = (state = initialState, action) => {
  const payload = action.payload;

  switch (action.type) {
    case types.FETCH_AUTHORS_BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case types.FETCH_AUTHORS_SUCCESS:
      const authors = state.content.slice();
      return {
        ...state,
        content: authors.concat(payload.content),
        page: payload.page,
        size: payload.size,
        totalElements: payload.totalElements,
        totalPages: payload.totalPages,
        isLast: payload.isLast,
        error: payload.error,
        isLoading: false,
      };

    case types.FETCH_AUTHORS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
        content: []
      };

    default:
      return state;
  }
}

export default authorsReducer;
