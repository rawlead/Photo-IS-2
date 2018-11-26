import { connect } from 'react-redux';
import PhotosComponent from './PhotosComponent'
import { photosOperations } from './duck';

const mapStateToProps = state => {
  const { photoCategories, isLoading, activePhotoCategory, photos } = state.photosReducer;
  return {
    photoCategories,
    photos,
    isCategoriesLoading: isLoading,
    activePhotoCategory
  }
}

const mapDispatchToProps = dispatch => {
  const setActivePhotoCategory = (photoCategory) => dispatch(photosOperations.setActivePhotoCategory(photoCategory));
  const fetchPhotos = (page, size) => dispatch(photosOperations.fetchPhotos(page,size));
  return {
    setActivePhotoCategory,
    fetchPhotos
  };
};

const PhotosContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PhotosComponent);

export default PhotosContainer;
