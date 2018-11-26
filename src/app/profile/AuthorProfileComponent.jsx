import React, { Component, Fragment } from 'react';
import { ClipLoader, PulseLoader } from 'react-spinners';
import { Layout, PhotoList, LoadMore } from '../common';
import API from '../../utils/API';
import { PHOTOS_LIST_SIZE } from '../../utils/constants';

const getUserByUsernameRequest = API.getUserByUsernameRequest;
const addUserToFavoritesRequest = API.addUserToFavoritesRequest;
const removeUserFromFavoritesRequest = API.removeUserFromFavoritesRequest;
const getPhotosByUsernameRequest = API.getPhotosByUsernameRequest;

class AuthorProfileComponent extends Component {
  constructor(props) {
    super(props);
    this.getUsernameFromUrl = this.getUsernameFromUrl.bind(this);
    this.fetchUserByUsername = this.fetchUserByUsername.bind(this);
    this.loadPhotosByUsername = this.loadPhotosByUsername.bind(this);
    this.handleIsUserFavorite = this.handleIsUserFavorite.bind(this);
    this.handleAddUserToFavorites = this.handleAddUserToFavorites.bind(this);
    this.handleRemoveUserFromFavorites = this.handleRemoveUserFromFavorites.bind(this);
    this.handleLoadMorePhotos = this.handleLoadMorePhotos.bind(this);

    this.state = {
      userProfile: [],
      userPhotos: [],
      userLoading: true,
      isFavorite: false,
      isHandlingOperation: false,
      page: 0,
      size: 10,
      totalElements: 0,
      totalPages: 0,
      isLast: true,
      photosLoading: true
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const isFavorite = this.handleIsUserFavorite();
    if (prevState.isFavorite !== isFavorite) {
      this.setState({ isFavorite })
    }
  }

  handleIsUserFavorite() {
    const { loggedInUser } = this.props;
    const { userProfile } = this.state;
    if (!loggedInUser.content || !userProfile) {
      return false;
    }
    return loggedInUser.favoriteUsers.some(favoriteUser => favoriteUser.id === userProfile.id);
  }

  handleAddUserToFavorites() {
    const { loggedInUser } = this.props;
    const { userProfile } = this.state;
    this.setState({ isHandlingOperation: true })
    addUserToFavoritesRequest(loggedInUser.content.id, userProfile.id)
      .then(response => {
        // alert(response.data)
        this.setState({ 
          isFavorite: true,
          isHandlingOperation: false
        })
        this.props.fetchFavoriteUsers(loggedInUser.content);
      })
      .catch(error => {
        console.error(error.response.data)
        this.setState({
          isHandlingOperation: false
        })
      })
  }

  handleRemoveUserFromFavorites() {
    const { loggedInUser } = this.props;
    const { userProfile } = this.state;
    this.setState({ isHandlingOperation: true })
    removeUserFromFavoritesRequest(loggedInUser.content.id, userProfile.id)
      .then(response => {
        // alert(response.data)
        this.setState({ 
          isFavorite: false,
          isHandlingOperation: false
        })
        this.props.fetchFavoriteUsers(loggedInUser.content);
      })
      .catch(error => {
        console.error(error.response.data)
        this.setState({ isHandlingOperation: false })
      })
  }

  componentWillMount() {
    const username = this.getUsernameFromUrl();
    this.fetchUserByUsername(username);
    this.loadPhotosByUsername(username);
  }

  fetchUserByUsername(username, callback) {
    this.setState({ userLoading: true })
    getUserByUsernameRequest(username)
      .then(response => {
        this.setState({
          userProfile: response.data,
          userLoading: false
        })
        callback(response.data.id)
      })
      .catch(error => {
        this.setState({
          userLoading: false
        })
        console.log(error);
      })
  }

  loadPhotosByUsername(username, page = 0, size = PHOTOS_LIST_SIZE) {
    const { userPhotos } = this.state;
    const userPhotosCopy = userPhotos.slice();
    this.setState({photosLoading: true})

    getPhotosByUsernameRequest(username, page, size)
      .then(response => {
        this.setState({
          userPhotos: userPhotosCopy.concat(response.data.content),
          page: response.data.page,
          size: response.data.size,
          totalElements: response.data.totalElements,
          totalPages: response.data.totalPages,
          isLast: response.data.last,
          photosLoading: false
        })
      }).catch(error => {
    this.setState({photosLoading: true})
        console.error(error.response)
      })
  }

  handleLoadMorePhotos() {
    const { page, userProfile } = this.state;
    this.loadPhotosByUsername(userProfile.username, page + 1)
  }

  getUsernameFromUrl() {
    var splitted = window.location.href.split('/');
    return splitted[splitted.length - 1];
  }

  render() {
    const { userProfile, userLoading, photosLoading, isFavorite, userPhotos, isLast, isHandlingOperation } = this.state;
    const { loggedInUser } = this.props;
    return (
      <Layout title="Profile">
        <div id="profileRoot">
          <div className="container-fluid" style={{paddingLeft: 0}}>

            <div className="row author-header">
              {userLoading ?
                <Fragment>
                  <div className="col-md-2 offset-md-3">
                    <ClipLoader
                      sizeUnit={"px"}
                      size={150}
                      color={'#EEB902'}
                      style={{ textAlign: 'center' }}
                    />
                  </div>
                  <div className="col-md-2">
                    <br />
                    <br />
                    <br />
                    <PulseLoader
                      sizeUnit={"px"}
                      size={15}
                      color={'#EEB902'}
                    />
                  </div>
                </Fragment>
                : (<Fragment>
                  <div className="col-md-7 offset-md-3">
                    <div className="author-profile-avatar animated rotateIn hvr-glow">
                      <img src={userProfile.avatarUrl} className="hvr-grow" alt="" />
                    </div>
                    <div className="author-profile-description">
                      <h1><b>{userProfile.firstName}</b></h1>
                      <h1><b>{userProfile.lastName}</b></h1>
                      <h1>@{userProfile.username}</h1>

                      {loggedInUser.content && userProfile.id !== loggedInUser.content.id &&
                        (!isFavorite
                          ? <button
                              onClick={this.handleAddUserToFavorites}
                              className="submit-btn"
                              disabled={isHandlingOperation}
                            >
                              {isHandlingOperation
                              ? <ClipLoader
                                  sizeUnit={"px"}
                                  size={20}
                                  color={'#CDD3CE'}
                                />
                              : <Fragment>
                                  <i className="fas fa-star" />&nbsp;
                                    Add to favorites
                                </Fragment>
                              }
                            </button>
                          : <button
                              onClick={this.handleRemoveUserFromFavorites}
                              className="submit-btn"
                              disabled={isHandlingOperation}
                            >
                            {isHandlingOperation
                              ? <ClipLoader
                                  sizeUnit={"px"}
                                  size={15}
                                  color={'#CDD3CE'}
                                />
                              : <Fragment>
                                  <i style={{ color: '#EEB902' }} className="far fa-star" />&nbsp;
                                    Remove from favorites
                                </Fragment>
                              }
                            </button>
                        )
                      }

                    </div>
                  </div>
                  <div className="col-md-2">
                    <p style={{ fontSize: '0.75em' }}>{userProfile.registrationDate}</p>
                    <h6><b>Photos: {userPhotos ? userPhotos.length : ''}</b></h6>
                      {/* <button
                        style={{ width: '100px', position: 'absolute', right: '10px', bottom: '0' }}
                        onClick={() => alert('delete')}
                        className="btn submit-btn">
                        DELETE
                  </button> */}
                  </div>
                </Fragment>)
              }
            </div>

          {userPhotos.length !== 0
            ? <PhotoList photos={userPhotos} />
            : ''}
            </div>

          <LoadMore isLoading={photosLoading} isLast={isLast} handleLoadMore={this.handleLoadMorePhotos} />
        </div>
      </Layout>
    )
  }
}

export default AuthorProfileComponent;
