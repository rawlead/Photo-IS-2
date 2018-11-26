import { connect } from 'react-redux';
import MyProfileComponent from './MyProfileComponent';
import { userOperations } from '../../duck';


const mapStateToProps = state => {
  const { photoCategories } = state.photosReducer;
  return {
    loggedInUser: state.userReducer,
    photoCategories
  }
};

const mapDispatchToProps = dispatch => {
  const fetchFavoriteUsers = (user) => dispatch(userOperations.fetchFavoriteUsers(user));
  const fetchFavoritePhotos = (user) => dispatch(userOperations.fetchFavoritePhotos(user));
  const fetchUploadedPhotos = (user) => dispatch(userOperations.fetchUploadedPhotos(user));
  return {
    fetchFavoriteUsers,
    fetchFavoritePhotos,
    fetchUploadedPhotos
  };
};

const MyProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyProfileComponent);

export default MyProfileContainer;
