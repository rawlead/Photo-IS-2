import React, { Component } from 'react';
import { Layout } from '../../common';
import Favorites from './Favorites';
import Settings from './Settings';
import Uploads from './Uploads';

class MyProfileComponent extends Component {
  constructor(props) {
    super(props);
    this.openProfileTab = this.openProfileTab.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem("tabName") === "Favorites")
      document.getElementsByClassName('profileTabBtn')[1].click();
    else if (localStorage.getItem("tabName") === "Settings")
      document.getElementsByClassName('profileTabBtn')[2].click();
    else
      document.getElementsByClassName('profileTabBtn')[0].click();
  }

  openProfileTab(evt, tabName) {
    localStorage.setItem("tabName", tabName);
    let i, profileTabContent, profileTabBtn;
    profileTabContent = document.getElementsByClassName("profileTabContent");
    for (i = 0; i < profileTabContent.length; i++) {
      profileTabContent[i].style.display = "none";
    }
    profileTabBtn = document.getElementsByClassName("profileTabBtn");
    for (i = 0; i < profileTabBtn.length; i++) {
      profileTabBtn[i].className = profileTabBtn[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "flex";
    evt.currentTarget.className += " active";
  }

  render() {
    const { loggedInUser, photoCategories, fetchUploadedPhotos } = this.props;
    return (
      <Layout title="My Profile">
        <div className="" id="myProfileRoot">
          <div className="profile-tab">
            <button className="profileTabBtn" onClick={(e) => this.openProfileTab(e, 'Uploads')}>
              <i className="fas fa-images" /> UPLOADS
            </button>
            <button className="profileTabBtn" onClick={(e) => this.openProfileTab(e, 'Favorites')}>
              <i className="fas fa-star" /> FAVORITES
            </button>
            <button className="profileTabBtn" onClick={(e) => this.openProfileTab(e, 'Settings')}>
              <i className="fas fa-cog" /> SETTINGS
            </button>
          </div>

          {/* <!-- Tabs  --> */}
          <Uploads loggedInUser={loggedInUser} photoCategories={photoCategories} fetchUploadedPhotos={fetchUploadedPhotos} />
          <Favorites loggedInUser={loggedInUser} />
          <Settings loggedInUser={loggedInUser} />
        </div>
      </Layout>
    )
  }
}
export default MyProfileComponent;
