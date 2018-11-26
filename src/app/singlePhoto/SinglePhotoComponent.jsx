import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { COMMENT_MAX_SIZE } from '../../utils/constants';
import API from '../../utils/API';
import { ClipLoader } from 'react-spinners'
import Layout from '../common/Layout';

const addPhotoToFavoritesRequest = API.addPhotoToFavoritesRequest;
const removePhotoFromFavoritesRequest = API.removePhotoFromFavoritesRequest;
const getSinglePhotoRequest = API.getSinglePhotoRequest;
const getCommentsToPhotoRequest = API.getCommentsToPhotoRequest;
const postCommentRequest = API.postCommentRequest;
const deleteCommentRequest = API.deleteCommentRequest;

class SinglePhotoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      singlePhoto: null,
      singlePhotoId: null,
      commentsObj: {
        comments: [],
        loading: true
      },
      isLoading: true,
      isFavorite: false,
      isFavoriteLoading: false,
      commentsAreHidden: false,
      commentForm: {
        isVisible: false,
        content: '',
        isOutOfRange: false,
        isPosting: false,
      },
      statusMessage: null
    }
    this.getPhotoIdFromUrl = this.getPhotoIdFromUrl.bind(this);
    this.fetchSinglePhoto = this.fetchSinglePhoto.bind(this);
    this.fetchCommentsToPhoto = this.fetchCommentsToPhoto.bind(this);
    this.handleIsPhotoFavorite = this.handleIsPhotoFavorite.bind(this);
    this.handleAddPhotoToFavorites = this.handleAddPhotoToFavorites.bind(this);
    this.handleRemovePhotoFromFavorites = this.handleRemovePhotoFromFavorites.bind(this);
    this.toggleCommentsVisibility = this.toggleCommentsVisibility.bind(this);
    this.toggleCommentsFormVisibility = this.toggleCommentsFormVisibility.bind(this);
    this.handleCommentFieldChange = this.handleCommentFieldChange.bind(this);
    this.handlePostComment = this.handlePostComment.bind(this);
    this.handleDeleteComment = this.handleDeleteComment.bind(this);
  }

  componentDidMount() {
    const { loggedInUser } = this.props;
    const singlePhotoId = this.getPhotoIdFromUrl();
    this.fetchSinglePhoto(singlePhotoId);
    this.fetchCommentsToPhoto(singlePhotoId);
    if (loggedInUser.content && loggedInUser.favoritePhotos) {
      this.handleIsPhotoFavorite(singlePhotoId, loggedInUser)
    }
    this.setState({
      singlePhotoId
    })
  }

  componentWillReceiveProps(nextProps) {
    const { singlePhotoId } = this.state;
    if (nextProps.loggedInUser.content) {
      this.handleIsPhotoFavorite(singlePhotoId, nextProps.loggedInUser);
    }
  }

  getPhotoIdFromUrl() {
    var splitted = window.location.href.split('/');
    return splitted[splitted.length - 1];
  }

  fetchSinglePhoto(photoId) {
    getSinglePhotoRequest(photoId)
      .then(response => {
        this.setState({
          singlePhoto: response.data,
          isLoading: false,
        })
      }).catch(error => {
        console.error(error.response);
        this.setState({ isLoading: false });
      })
  }


  handleIsPhotoFavorite(singlePhotoId, loggedInUser) {
    if (!singlePhotoId || !loggedInUser.content) {
      console.warn("Either one null while checking is photo favorite - user: " + loggedInUser.content + "; or singlePhotoId: " + singlePhotoId)
    }
    // eslint-disable-next-line
    const isFavorite = loggedInUser.favoritePhotos.some(favoritePhoto => favoritePhoto.id == singlePhotoId);
    this.setState({ isFavorite, isFavoriteLoading: false });
  }

  handleAddPhotoToFavorites() {
    const { loggedInUser } = this.props;
    const { singlePhoto } = this.state;
    if (!loggedInUser.loggedIn) {
      alert("Please login")
      return;
    }
    this.setState({ isFavoriteLoading: true })
    addPhotoToFavoritesRequest(loggedInUser.content.id, singlePhoto.id)
      .then(response => {
        // alert(response.data)
        this.setState({ isFavorite: true, isFavoriteLoading: false })
        // update redux store with new favorite photos
        this.props.fetchFavoritePhotos(loggedInUser.content);
      })
      .catch(error => {
        this.setState({ isFavoriteLoading: false })
        console.error(error.response.data);
      })
  }


  handleRemovePhotoFromFavorites() {
    const { loggedInUser } = this.props;
    const { singlePhoto } = this.state;
    if (!loggedInUser.loggedIn) {
      alert("Please login")
      return;
    }
    this.setState({ isFavoriteLoading: true })
    removePhotoFromFavoritesRequest(loggedInUser.content.id, singlePhoto.id)
      .then(response => {
        // alert(response.data)
        this.setState({ isFavorite: false, isFavoriteLoading: false })
        // update redux store with new favorite photos
        this.props.fetchFavoritePhotos(loggedInUser.content);
      })
      .catch(error => {
        this.setState({ isFavoriteLoading: false })
        console.error(error.response.data);
      })
  }

  fetchCommentsToPhoto(photoId) {
    this.setState({
      commentsObj: {
        loading: true,
        comments: []
      }
    })
    getCommentsToPhotoRequest(photoId)
      .then(response => {
        console.log('comments fetched')
        this.setState({
          commentsObj: {
            comments: response.data.reverse(),
            loading: false
          }
        })
        console.log(response.data);
      }).catch(error => {
        console.log('comments fetching error')

        this.setState({
          commentsObj: {
            comments: [],
            loading: false
          }
        })
        console.error(error.response);
      })
  }


  toggleCommentsVisibility() {
    this.setState((prevState) => ({
      commentsAreHidden: !prevState.commentsAreHidden
    }));
  }

  toggleCommentsFormVisibility() {
    this.setState((prevState) => ({
      commentForm: {
        ...prevState.commentForm,
        isVisible: !prevState.commentForm.isVisible,
      }
    }));
  }

  handleCommentFieldChange(e) {
    const content = e.target.value;
    this.setState(prevState => ({
      commentForm: {
        ...prevState.commentForm,
        content,
        isOutOfRange: content.length >= COMMENT_MAX_SIZE
      },
    }));
  }

  handlePostComment() {
    const { loggedInUser } = this.props;
    const { singlePhotoId } = this.state;
    const { content } = this.state.commentForm;
    if (!loggedInUser.loggedIn) {
      alert('Please log in');
      return;
    }
    if (content.length === 0) {
      return
    }
    this.setState(prevState => ({
      commentForm: {
        ...prevState.commentForm,
        isPosting: true,
      }
    }))
    postCommentRequest(singlePhotoId, content)
      .then(response => {
        this.setState({
          commentsObj: {
            content: response.data,
            loading: true
          },
          commentForm: {
            isVisible: false,
            content: '',
            isOutOfRange: false,
            isPosting: false
          }
        })
        this.fetchCommentsToPhoto(singlePhotoId);
      }).catch(error => {
        console.error(error);
      })
  }

  handleDeleteComment(userId, commentId) {
    const { loggedInUser } = this.props;
    const { singlePhotoId } = this.state;
    if (loggedInUser.content.id !== userId) {
      return;
    }
    this.setState(prevState => ({
      commentsObj: {
        ...prevState.commentsObj,
        loading: true
      }
    }))
    deleteCommentRequest(userId, commentId)
      .then(response => {
        this.fetchCommentsToPhoto(singlePhotoId);

      }).catch(error => {
        console.log(error);
        this.setState(prevState => ({
          commentsObj: {
            ...prevState.commentsObj,
            loading: false
          }
        }))
      })
  }

  render() {
    const {
      singlePhoto,
      commentsObj,
      isLoading,
      isFavorite,
      commentForm,
      statusMessage,
      commentsAreHidden,
      isFavoriteLoading
    } = this.state;

    const { setActivePhotoCategory, loggedInUser } = this.props;
    const toggleCommentsVisibility = this.toggleCommentsVisibility;
    const toggleCommentsFormVisibility = this.toggleCommentsFormVisibility;

    if (isLoading) {
      return (
        <Layout title="Loading photo...">
          <div className="spinner-centered">
            <ClipLoader
              sizeUnit={"px"}
              size={75}
              color={'#CDD3CE'}
              loading={isLoading}
            />
          </div>
        </Layout>
      )
    }

    return (
      <Layout title={`PhotoIS - ${singlePhoto.user.username}'s photo`}>
        <section id="photoRoot" className="container-fluid">
          <div className="row">
            <div className="photo-container-wrapper col-md-12">
              <div className="photo-container">
                {/* TITLE, DESCRIPTION & PHOTO */}
                <div className="photo-header">
                  <h3><b>{singlePhoto.title}</b></h3>
                  <h6>{singlePhoto.description}</h6>
                </div>
                <div className="photo-body" >
                  <a href={singlePhoto.url}>
                    <img src={singlePhoto.url} alt={singlePhoto.title} />
                  </a>
                
                {/* FOOTER */}
                <div className="photo-footer">
                  <Link to={'/profile/' + singlePhoto.user.username}><b>@{singlePhoto.user.username} </b></Link>
                  | <Link
                    onClick={() => setActivePhotoCategory(singlePhoto.photoCategory)}
                    to="/photos"
                  >
                    {singlePhoto.photoCategory.name}
                  </Link>
                  {/* SHOW SPINNER IF isFavorite IS FETCHING, OTHERWISE SHOW ADD OR REMOVE BUTTONS */}
                  {isFavoriteLoading
                    ?
                    <Fragment>
                      &nbsp; |&nbsp;
                      <ClipLoader
                        sizeUnit={"px"}
                        size={10}
                        color={'#CDD3CE'}
                      />
                    </Fragment>
                    : (
                      loggedInUser.content ?
                        <Fragment>
                          &nbsp; |&nbsp;
                        <span onClick={this.handleAddPhotoToFavorites} hidden={isFavorite} className="favorite-add">
                            <i className="far fa-star" />
                            add
                        </span>
                          <span onClick={this.handleRemovePhotoFromFavorites} hidden={!isFavorite} className="favorite-remove">
                            <i className="fas fa-star" style={{ color: '#EEB902' }} />
                            remove
                        </span>
                        </Fragment>
                        : ''
                    )
                  }
                  <span style={{ fontStyle: 'italic' }} className="float-right">
                    <i className="far fa-calendar-alt" />&nbsp;
                    {singlePhoto.dateCreated}
                  </span>
                  <span className="float-right" style={{ marginRight: '12px', marginLeft: '12px' }}>
                    <i className="far fa-star" />&nbsp;
                    {singlePhoto.favoritesCount}
                  </span>
                  <span className="float-right">
                    <i className="far fa-comment" />&nbsp;
                    {singlePhoto.commentsCount}
                  </span>
                  <button
                    className="submit-btn show-comments-btn"
                    onClick={toggleCommentsVisibility}
                    hidden={!commentsAreHidden}
                  >
                    <i className="fas fa-eye" />&nbsp;
                    Show comments
                  </button>
</div>
                  {/* COMMENTS */}
                  <div className="comments-container" hidden={commentsAreHidden}>
                    <div className="comments-body">
                      {!commentsObj.loading
                        ?

                        <ul>
                          <li hidden={commentsObj.comments.length !== 0}>No comments yet . . .</li>
                          {/* <li onClick="commentContent += '@' + comment.user.username + ' '"> */}
                          {commentsObj.comments.map(comment => (
                            <li key={comment.id}>
                              <Link to={'/profile/' + comment.user.username}>
                                <b>@{comment.user.username}</b>
                              </Link>
                              <span style={{ fontSize: '0.8em', color: '#a2a8a3', fontStyle: 'italic' }}> {comment.dateCreated}</span>
                              <br />
                              {loggedInUser.content &&
                                <span
                                  style={{ color: 'red', cursor: 'pointer' }}
                                  onClick={() => this.handleDeleteComment(comment.user.id, comment.id)}
                                  hidden={loggedInUser.content.id !== comment.user.id}
                                >
                                  X&nbsp;
                          </span>
                              }
                              {comment.content}
                            </li>
                          ))}

                        </ul>

                        : <div className="text-center" style={{ marginTop: 50 }}>
                          <ClipLoader
                            sizeUnit={"px"}
                            size={40}
                            color={'#CDD3CE'}
                          />
                        </div>

                      }
                    </div>


                    <div className="comments-header">
                      <div className="alert alert-warning" hidden={!statusMessage} role="alert">
                        <span>{statusMessage}</span>
                      </div>


                      <button
                        style={{ marginTop: '2px' }}
                        className="submit-btn"
                        hidden={commentForm.isVisible}
                        disabled={commentsObj.loading}
                        onClick={toggleCommentsFormVisibility}
                      >
                        <i className="fas fa-comment" />&nbsp;
                        Leave a comment
                  </button>

                      <button
                        style={{ marginTop: '2px' }}
                        className="submit-btn"
                        hidden={commentsAreHidden}
                        onClick={toggleCommentsVisibility}
                      >
                        <i className="fas fa-eye-slash" />&nbsp;
                        Hide comments
                  </button>



                      <div className="comment-input-section" hidden={!commentForm.isVisible}>
                        <span
                          className={`length-counter ${commentForm.isOutOfRange ? 'text-danger' : ''}`}

                        >
                          {`${commentForm.content.length} / ${COMMENT_MAX_SIZE}`}
                        </span>
                        <textarea
                          onChange={this.handleCommentFieldChange}
                          value={commentForm.content}
                          autoFocus
                          maxLength="150"
                          type="text"
                          rows="3"
                          id="comment-textarea"
                        />
                        <button
                          onClick={this.handlePostComment}
                          disabled={
                            commentForm.isOutOfRange
                            || commentForm.isPosting
                            || loggedInUser.isLoading
                            || commentForm.content.length === 0}
                          className="btn btn-success"
                        >
                          {commentForm.isPosting || loggedInUser.isLoading
                            ? <ClipLoader
                              sizeUnit={"px"}
                              size={15}
                              color={'#CDD3CE'}
                            />
                            : (
                              <Fragment>
                                <i className="fas fa-chevron-circle-up" /> Send
                      </Fragment>
                            )
                          }
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={toggleCommentsFormVisibility}
                          style={{ marginTop: '5px' }}
                        >
                          <i className="fas fa-times" />&nbsp;
                          Cancel
                    </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          {/* <!--blurred background image--> */}
          <img src={singlePhoto.url} className="blurred-background" alt={singlePhoto.title} />
        </section>
      </Layout>
    )
  }
}

export default SinglePhotoComponent;
