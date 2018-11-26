import Actions from './actions';

const openModalPhotoAction = Actions.openModalPhotoAction;
const closeModalPhotoAction = Actions.closeModalPhotoAction;

const openModalPhoto = (photo) => {
  return dispatch => {
    dispatch(openModalPhotoAction(photo));
  }
}

const closeModalPhoto = () => {
  return dispatch => {
    dispatch(closeModalPhotoAction());
  }
}

export default {
  openModalPhoto,
  closeModalPhoto
}
