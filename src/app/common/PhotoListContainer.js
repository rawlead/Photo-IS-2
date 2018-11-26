import { connect } from 'react-redux';
import PhotoListComponent from './PhotoListComponent'
import { modalPhotoOperations } from './modal/duck';

const mapDispatchToProps = dispatch => {
  const openModalPhoto = (photo) => dispatch(modalPhotoOperations.openModalPhoto(photo));

  return {
    openModalPhoto
  };
};

const PhotoListContainer = connect(
  null,
  mapDispatchToProps
)(PhotoListComponent);

export default PhotoListContainer;
