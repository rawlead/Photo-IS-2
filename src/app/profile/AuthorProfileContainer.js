import { connect } from 'react-redux';
import AuthorProfileComponent from './AuthorProfileComponent';
import { userOperations } from '../duck';


const mapStateToProps = state => {
  // const { content, loggedIn } = state.user;
  return {
    loggedInUser: state.userReducer
  }
};

const mapDispatchToProps = dispatch => {
  const fetchFavoriteUsers = (user) => dispatch(userOperations.fetchFavoriteUsers(user));
  return {
    fetchFavoriteUsers,
  };
};

const AuthorProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthorProfileComponent);

export default AuthorProfileContainer;
