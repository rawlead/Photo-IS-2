import types from './types';

const initialState = {
  photo: null,
  isOpen: false,
}

const modalPhotoReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.OPEN_MODAL_PHOTO:
      return {
        isOpen: true,
        photo: action.payload.photo
      }
    case types.CLOSE_MODAL_PHOTO:
      return {
        isOpen: false,
        photo: null
      }
    default:
      return state;
  }
}

export default modalPhotoReducer;
