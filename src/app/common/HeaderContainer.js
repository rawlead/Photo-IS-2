import { connect } from 'react-redux';
import { photosOperations } from '../photos/duck';
import HeaderComponent from './HeaderComponent';

const mapStateToProps = state => {
  // const { loggedInUser, isLoading, error } = state.userReducer;
  return {
    loggedInUser: state.userReducer,
    photos: {
      photoCategories: state.photosReducer.photoCategories,
      isLoading: state.photosReducer.isLoading,
      activePhotoCategory: state.photosReducer.activePhotoCategory,
      error: state.photosReducer.error
    }
  }
};

const mapDispatchToProps = dispatch => {
  const setActivePhotoCategory = (photoCategory) => dispatch(photosOperations.setActivePhotoCategory(photoCategory));
  return {
    setActivePhotoCategory
  };
};

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderComponent);

export default HeaderContainer;
