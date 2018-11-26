import Actions from './actions';
import API from '../../utils/API';

const fetchCurrentUserBegin = Actions.fetchCurrentUserBegin;
const fetchCurrentUserSuccess = Actions.fetchCurrentUserSuccess;
const fetchCurrentUserFailure = Actions.fetchCurrentUserFailure;
const fetchFavoritePhotosSuccess = Actions.fetchFavoritePhotosSuccess;
const fetchFavoriteUsersSuccess = Actions.fetchFavoriteUsersSuccess;
const fetchUploadedPhotosSuccess = Actions.fetchUploadedPhotosSuccess;

const getCurrentUserRequest = API.getCurrentUserRequest;
const getFavoritePhotosRequest = API.getFavoritePhotosRequest;
const getFavoriteUsersRequest = API.getFavoriteUsersRequest;
const getPhotosByUsernameRequest = API.getPhotosByUsernameRequest;

// const fetchCurrentUser = () => {
//   return dispatch => {
//     dispatch(fetchCurrentUserBegin())
//     return getCurrentUserRequest()
//       .then(userResponse => {
//         getFavoritePhotos(userResponse.data, (favoritePhotosResponse) => {
//           getFavoriteUsers(userResponse.data, (favoriteUsersResponse) => {
//             dispatch(fetchCurrentUserSuccess({
//               user: userResponse.data,
//               favoritePhotos: favoritePhotosResponse.data,
//               favoriteUsers: favoriteUsersResponse.data
//             }))
//           })
//         })
//       })
//       .catch(error => {
//         eturn dispatch(fetchCurrentUserFailure('Failed to load resource: Could not connect to the server.'))r
//       });
//   }
// }

const fetchCurrentUser = () => {
  return dispatch => {
    dispatch(fetchCurrentUserBegin())
    return getCurrentUserRequest()
      .then(userResponse => {
        return dispatch(fetchCurrentUserSuccess(userResponse.data))
      }).catch(error => {
        return dispatch(fetchCurrentUserFailure('Failed to load resource: Could not connect to the server.'))
      })
  }
}


const fetchFavoritePhotos = (user) => {
  return dispatch => {
    getFavoritePhotosRequest(user.id)
      .then(favoritePhotosResponse => {
        dispatch(fetchFavoritePhotosSuccess(favoritePhotosResponse.data));
      })
  }
}
const fetchFavoriteUsers = (user) => {
  return dispatch => {
    getFavoriteUsersRequest(user.id)
      .then(favoriteUsersResponse => {
        dispatch(fetchFavoriteUsersSuccess(favoriteUsersResponse.data));
      })
  }
}

const fetchUploadedPhotos = (user) => {
  return dispatch => {
    getPhotosByUsernameRequest(user.username, 0, 100)
      .then(photosResponse => {
        console.log(photosResponse.data.content)
        dispatch(fetchUploadedPhotosSuccess(photosResponse.data));
      })
  }
}

export default {
  fetchCurrentUser,
  fetchFavoritePhotos,
  fetchFavoriteUsers,
  fetchUploadedPhotos
}
