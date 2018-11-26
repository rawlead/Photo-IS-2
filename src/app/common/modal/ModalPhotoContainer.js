import { connect } from 'react-redux';
import ModalPhotoComponent from './ModalPhotoComponent';
import { photosOperations } from '../../photos/duck';
import { userOperations } from '../../duck';
import { modalPhotoOperations } from './duck';


const mapStateToProps = state => {
  const { photo, isOpen } = state.modalPhotoReducer;
  // const { loggedInUser, loggedIn } = state.userReducer;
  return {
    photo,
    isOpen,
    loggedInUser: state.userReducer
  }
};

const mapDispatchToProps = dispatch => {
  const setActivePhotoCategory = (photoCategory) => dispatch(photosOperations.setActivePhotoCategory(photoCategory));
  const fetchFavoritePhotos = (user) => dispatch(userOperations.fetchFavoritePhotos(user));
  const closeModalPhoto = () => dispatch(modalPhotoOperations.closeModalPhoto());
  return {
    setActivePhotoCategory,
    fetchFavoritePhotos,
    closeModalPhoto
  };
};

const ModalPhotoContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalPhotoComponent);

export default ModalPhotoContainer;
