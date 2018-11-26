import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import API from '../../../utils/API';

const addPhotoToFavoritesRequest = API.addPhotoToFavoritesRequest;
const removePhotoFromFavoritesRequest = API.removePhotoFromFavoritesRequest;

class ModalPhotoComponent extends Component {
  constructor(props) {
    super(props);
    this.setActiveCategory = this.setActiveCategory.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleIsPhotoFavorite = this.handleIsPhotoFavorite.bind(this);
    this.handleAddPhotoToFavorites = this.handleAddPhotoToFavorites.bind(this);
    this.handleRemovePhotoFromFavorites = this.handleRemovePhotoFromFavorites.bind(this);
    this.state = {
      isFavorite: false,
      isLoading: false
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.props.loggedInUser.content) {
      return;
    }
    const isFavorite = this.handleIsPhotoFavorite();
    if (this.props.isOpen && prevState.isFavorite !== isFavorite) {
      this.setState({ isFavorite })
    }
  }

  setActiveCategory(category) {
    this.props.setActivePhotoCategory(category);
    this.props.closeModalPhoto();
  }

  handleIsPhotoFavorite() {
    const { loggedInUser, photo } = this.props;
    if (!loggedInUser.content || !photo) {
      return false;
    }
    return loggedInUser.favoritePhotos.some(favoritePhoto => favoritePhoto.id === photo.id);
  }

  componentWillMount() {
    document.addEventListener('mouseup', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.handleClick, false);
  }

  handleAddPhotoToFavorites() {
    const { photo, loggedInUser, fetchFavoritePhotos } = this.props;
    if (!loggedInUser.loggedIn) {
      alert("Please login")
      return;
    }
    this.setState({isLoading: true});
    addPhotoToFavoritesRequest(loggedInUser.content.id, photo.id)
      .then(response => {
        // alert(response.data)
        this.setState({ isFavorite: true, isLoading: false })
        fetchFavoritePhotos(loggedInUser.content);
      })
      .catch(error => {
        this.setState({isLoading: false});
        console.error(error.response.data);
      })
  }

  handleRemovePhotoFromFavorites() {
    const { photo, loggedInUser, fetchFavoritePhotos } = this.props;
    if (!loggedInUser.loggedIn) {
      alert("Please login")
      return;
    }
    this.setState({isLoading: true});
    removePhotoFromFavoritesRequest(loggedInUser.content.id, photo.id)
      .then(response => {
        this.setState({isLoading: false});
        // alert(response.data)
        fetchFavoritePhotos(loggedInUser.content);
      })
      .catch(error => {
        this.setState({isLoading: true});
        console.error(error.response.data);
      })
  }

  handleClick = (e) => {
    const { closeModalPhoto, isOpen } = this.props;
    if (isOpen && !this.modalContent.contains(e.target)) {
      closeModalPhoto();
    }
  }

  render() {
    const { photo, isOpen, closeModalPhoto } = this.props;
    const { isFavorite, isLoading } = this.state;
    if (!isOpen) {
      return '';
    }
    return (
      <div
        className="modal user-photo-modal"
        role="dialog"
        aria-labelledby="user-photo-modal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content"
            ref={modalContent => this.modalContent = modalContent}
            style={{ border: 'none' }}>
            <div className="modal-body">

              <h5 style={{ left: '5px' }}>
                <Link
                  to={`/profile/${photo.user.username}`}
                  onClick={closeModalPhoto}
                  className="badge badge-dark"
                >
                  <img src={photo.user.avatarUrl} alt="" />&nbsp;
                  @{photo.user.username}
                </Link>
              </h5>

              <h5 style={{ right: '5px' }}>
                <Link
                  onClick={() => this.setActiveCategory(photo.photoCategory)}
                  to="/photos"
                  style={{ color: 'white' }}
                  className="badge badge-dark category-badge">
                  <i className="fas fa-clipboard-list" /> &nbsp;
                  {photo.photoCategory.name}
                </Link>
              </h5>
              <abbr title="Click to open comments">
                <Link
                  to={'/photo/' + photo.id}
                  onClick={closeModalPhoto}
                >
                  <img src={photo.url} alt="" />
                </Link>
              </abbr>
              <div className="modal-date-label">
                <i className="fas fa-calendar-alt" /> {photo.dateCreated}
              </div>

            </div>
            <div className="modal-footer">
              <div className="container-fluid" style={{ padding: 0 }}>
                <div className="row">
                  <div className="col-md-12">

                    {photo.title ? <h5>  <b>{photo.title}</b></h5> : 'This photo does not have a title'}
                    <div><p>{photo.description}</p></div>
                    <Link
                      to={'/photo/' + photo.id}
                      className="btn btn-outline-success"
                      onClick={closeModalPhoto}
                    >
                      <i className="fas fa-comment" />
                      Comments ({photo.commentsCount})
                    </Link>
                    
                    {isLoading
                      ? <div style={{display: 'inline-block', width: '100px', textAlign: 'center'}}>
                        <ClipLoader
                          sizeUnit={"px"}
                          size={30}
                          color={'#26262d'}
                        />
                        </div>
                    : <Fragment>
                     <Link
                        className="btn btn-outline-dark"
                        to="#"
                        hidden={isFavorite}
                        onClick={this.handleAddPhotoToFavorites}
                      >
                        <i className="fas fa-star" />
                        Favorite
                        </Link>
                     <Link
                        className="btn btn-outline-dark"
                        to="#"
                        hidden={!isFavorite}
                        onClick={this.handleRemovePhotoFromFavorites}
                      ><i className="far fa-star" /> Remove</Link>
                      </Fragment>
                    }
                    <button type="button" className="close" onClick={closeModalPhoto} aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ModalPhotoComponent;
