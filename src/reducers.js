import { combineReducers } from 'redux';
import authorsReducer from './app/authors/duck/reducers';
import userReducer from './app/duck/reducers';
import photosReducer from './app/photos/duck/reducers';
import modalPhotoReducer from './app/common/modal/duck/reducers';

const reducer = combineReducers({
  authorsReducer,
  userReducer,
  photosReducer,
  modalPhotoReducer,
});

export default reducer;
