import { connect } from 'react-redux';
import AuthorsComponent from './AuthorsComponent';
import { authorsOperations } from './duck';

const mapStateToProps = state => {
  const { content, page, size, totalElements, totalPages, isLast, isLoading, error } = state.authorsReducer;
  
  return {
    authors: content,
    page,
    size,
    totalElements,
    totalPages,
    isLast,
    isLoading,
    error
  }
};

const mapDispatchToProps = dispatch => {
  const loadAuthorList = (page, size) => dispatch(authorsOperations.loadAuthorList(page, size));
  return {
    loadAuthorList
  };
};

const AuthorsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthorsComponent);

export default AuthorsContainer;
