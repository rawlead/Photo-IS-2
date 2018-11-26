import { connect } from 'react-redux';
import SinglePhotoComponent from './SinglePhotoComponent';
import { photosOperations } from '../photos/duck';
import { userOperations } from '../duck';


const mapStateToProps = state => {
  // const { content, loggedIn, isLoading } = state.user;
  return {
    loggedInUser: state.userReducer,
  }
};

const mapDispatchToProps = dispatch => {
  const setActivePhotoCategory = (photoCategory) => dispatch(photosOperations.setActivePhotoCategory(photoCategory));
  const fetchFavoritePhotos = (user) => dispatch(userOperations.fetchFavoritePhotos(user));
  return {
    setActivePhotoCategory,
    fetchFavoritePhotos,
  };
};

const SinglePhotoContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SinglePhotoComponent);

export default SinglePhotoContainer;
