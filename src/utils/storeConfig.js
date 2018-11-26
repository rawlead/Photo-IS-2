import { createStore, compose, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import reducers from '../reducers'; // root reducer
import reducer from '../reducers';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => {
  const store = createStore(
    reducer,
    composeEnhancer(applyMiddleware(thunk)),
  );

  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
      module.hot.accept('../reducers', () => {
        store.replaceReducer(reducers);
      })
    }
  }
  return store;
};

export default configureStore;
