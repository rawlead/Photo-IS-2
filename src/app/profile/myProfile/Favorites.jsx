import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Favorites extends Component {
  render() {
    const { loggedInUser } = this.props;
    return (
      <div id="Favorites" className="profileTabContent">
      <div className="container-fluid" style={{padding: 0}}>
        <div className="row">
        <div className="col-md-7 col-7 offset-md-2 col-xl-8 favorites-photos-col" style={{ paddingLeft: 0 }}>
          {/* <!--FAVORITES--> */}
          <div className="favorite-photos favorite-column">
            <p><b><i className="fas fa-star"></i> PHOTOS</b></p>
            <Link style={{ color: '#fff', textDecoration: 'underline' }} to={"/photos"}>
              Click here to discover photos</Link>
            <ul>
              {loggedInUser.favoritePhotos.map(photo => (
                <li key={photo.id}>
                  <Link to={'/photo/' + photo.id}>
                    <img style={{ cursor: 'pointer' }} src={photo.url} alt={photo.title} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-md-3 col-3 col-xl-2" style={{ padding: 0 }}>
          <div className="favorite-users favorite-column">
            <p><b><i className="fas fa-star"></i> AUTHORS</b></p>
            <Link style={{ color: '#fff', textDecoration: 'underline' }} to={"/authors"}>
              Click here to discover authors</Link>
            <ul>
              {loggedInUser.favoriteUsers.map(favoriteUser => (
                <li key={favoriteUser.id}>
                  <Link to={'/profile/' + favoriteUser.username}>
                    <img src={favoriteUser.avatarUrl} alt={favoriteUser.username} />
                    @{favoriteUser.username}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        </div>
        </div>
      </div>
    )
  }
}

export default Favorites;
