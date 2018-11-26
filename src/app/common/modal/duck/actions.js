import types from './types';

const openModalPhotoAction = (photo) => ({
  type: types.OPEN_MODAL_PHOTO,
  payload: {
    photo
  }
})

const closeModalPhotoAction = () => ({
  type: types.CLOSE_MODAL_PHOTO
})

export default {
  openModalPhotoAction,
  closeModalPhotoAction
}
