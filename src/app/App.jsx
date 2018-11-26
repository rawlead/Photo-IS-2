import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';


import { ClipLoader } from 'react-spinners'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import ReactGA from 'react-ga';
import { GA_TRACKING_ID } from '../utils/constants';

import { getCookie } from '../utils/helpers';

import { userOperations } from './duck';
import { photosOperations } from './photos/duck';

import { Authors } from './authors';
import { AuthorProfile } from './profile';
import { SinglePhoto } from './singlePhoto';
import { Login, Signup } from './forms';
import { Photos } from './photos';
import { MyProfile } from './profile/myProfile';
import { About } from './about';
import { Layout } from './common';

// GOOGLE ANALYTICS INIT
ReactGA.initialize(GA_TRACKING_ID);
ReactGA.pageview(window.location.pathname + window.location.search);

class App extends Component {
  componentDidMount() {
    if (getCookie("access_token")) {
      this.props.fetchCurrentUser()
        .then((dispatchResponse) => {
          if (dispatchResponse.payload.user) {
            this.props.fetchFavoriteUsers(dispatchResponse.payload.user);
            this.props.fetchFavoritePhotos(dispatchResponse.payload.user);
            this.props.fetchUploadedPhotos(dispatchResponse.payload.user);
          }
        })
    }
    this.props.fetchAllCategories();
  }

  render() {
    const { loggedInUser } = this.props;
    return (
      <Router>
        <Fragment>
          <Switch>
            <Redirect exact from="/" to="/photos" />
            <Route path="/photos" component={Photos} />
            <Route path="/authors" component={Authors} />
            <Route path="/about" component={About} />

            <Route exact path="/profile" render={() => (
              !loggedInUser.isLoading && loggedInUser.loggedIn ? (
                <MyProfile />
              ) : (
                  <Redirect to="/login" />
                )
            )} />

            <Route exact path="/login" render={() => (
              loggedInUser.isLoading
                ? <Layout title="Please wait...">
                  <div className="spinner-centered">
                    <ClipLoader
                      sizeUnit={"px"}
                      size={75}
                      color={'#CDD3CE'}
                      loading={loggedInUser.isLoading}
                    />
                  </div>
                </Layout>
                : loggedInUser.loggedIn
                  ? <Redirect to="/profile" />
                  : <Login />
            )}
            />

            <Route exact path="/signup" render={() => (
              loggedInUser.isLoading
                ? <Layout title="Please wait...">
                  <div className="spinner-centered">
                    <ClipLoader
                      sizeUnit={"px"}
                      size={75}
                      color={'#CDD3CE'}
                      loading={loggedInUser.isLoading}
                    />
                  </div>
                </Layout>
                : loggedInUser.loggedIn
                  ? <Redirect to="/profile" />
                  : <Signup />
            )}
            />

            <Route path="/profile/:username" component={AuthorProfile} />
            <Route path="/photo/:photoId" component={SinglePhoto} />
          </Switch>
        </Fragment>
      </Router>
    );
  }
}



const mapDispatchToProps = dispatch => {
  const fetchCurrentUser = () => dispatch(userOperations.fetchCurrentUser());
  const fetchFavoriteUsers = (user) => dispatch(userOperations.fetchFavoriteUsers(user));
  const fetchFavoritePhotos = (user) => dispatch(userOperations.fetchFavoritePhotos(user));
  const fetchUploadedPhotos = (user) => dispatch(userOperations.fetchUploadedPhotos(user));
  const fetchAllCategories = () => dispatch(photosOperations.fetchAllCategories());
  return {
    fetchCurrentUser,
    fetchFavoriteUsers,
    fetchFavoritePhotos,
    fetchAllCategories,
    fetchUploadedPhotos
  };
};

const mapStateToProps = state => {
  // const { loggedInUser, favoritePhotos, isLoading, loggedIn, error } = state.userReducer;
  return {
    loggedInUser: state.userReducer
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
