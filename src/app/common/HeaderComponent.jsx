import React, { Component, Fragment } from 'react';
import { NavLink, Link } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import API from '../../utils/API';
import { deleteCookie } from '../../utils/helpers';
import './Header.css'
import logo from '../../assets/photo-is-logo.png';

const signOutRequest = API.signOutRequest;

class HeaderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearchResultsShown: false,
      search: '',
      filteredCategories: [],
      filteredUsers: [],
    }

    this.handleSignout = this.handleSignout.bind(this);
    this.showSearchResults = this.showSearchResults.bind(this);
    this.hideSearchResults = this.hideSearchResults.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.setActiveCategory = this.setActiveCategory.bind(this);
  }

  componentWillMount() {
    document.addEventListener('mouseup', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.handleClick, false);
  }

  handleClick = (e) => {
    if (!this.searchDropdown.contains(e.target)) {
      this.hideSearchResults();
    }
  }

  setActiveCategory(category) {
    this.props.setActivePhotoCategory(category);
    this.hideSearchResults();
  }

  showSearchResults() {
    this.setState({
      isSearchResultsShown: true
    })
  }

  hideSearchResults() {
    this.setState({
      isSearchResultsShown: false
    })
  }

  handleSearch(e) {
    const { photos } = this.props;
    const searchValue = e.target.value;

    const filteredCategories = photos.photoCategories.filter(category => {
      return category.name.toLowerCase().includes(searchValue.toLowerCase()) && searchValue !== ''
    })

    this.setState({
      [e.target.name]: e.target.value,
      filteredCategories
    });
  }

  handleSignout() {
    signOutRequest()
      .then(response => {
        deleteCookie("access_token");
        window.location.replace("/login");
      });
  }



  render() {
    const { loggedInUser, toggleMobileMenu } = this.props;
    const { isSearchResultsShown, search, filteredCategories, filteredUsers } = this.state;
    return (
      <header id="topNavRoot">
        <div id="top-nav">
          {/* <!--Mobile menu button--> */}
          <Link to="#" className="icon" onClick={toggleMobileMenu}>&#9776;</Link>

          {/* <!--Main logo--> */}
          <div className="main-logo float-left">
            <NavLink to="/photos"><img src={logo} alt="" /></NavLink>
          </div>

          {loggedInUser.isLoading ?
            <div className="top-nav-link float-right">
              <ClipLoader
                sizeUnit={"px"}
                size={23}
                color={'#EEB902'}
              />
            </div>
            : (loggedInUser.content
              ? <React.Fragment>
                <Link className="top-nav-link float-right" onClick={this.handleSignout} to="#">Sign out</Link>
                <Link to="/profile" id="top-nav-avatar" className="float-right">
                  <img src={loggedInUser.content.avatarUrl} className="hvr-grow" alt="Avatar" />
                </Link>
              </React.Fragment>
              : <NavLink className="float-right top-nav-link" to="/login">Sign in / Register</NavLink>
            )
          }
          {/* <!--Search input field--> */}
          <form className="search-field">
            <input
              placeholder=" search"
              onClick={this.showSearchResults}
              onChange={this.handleSearch}
              value={search}
              type="text"
              name="search"
              id="search-input"
            />

            {/* <!--Dropdown with search results--> */}
            <div id="search-dropdown"
              ref={searchDropdown => this.searchDropdown = searchDropdown}
              style={{ zIndex: '100' }}
              className={`dropdown-content ${isSearchResultsShown && 'showSearch'}`}>

              {/* <!--If no results found--> */}
              {filteredCategories.length === 0 && filteredUsers.length === 0 && search !== ''
                ? <Link to="#">No results found.</Link>
                : null}

              {/* <!--Found users section--> */}
              {filteredUsers.length > 0
                ? <Fragment>
                  <Link style={{ textAlign: 'center' }} to="/authors">
                    <i className="fas fa-angle-double-down" />FOUND AUTHORS<i className="fas fa-angle-double-down" />
                  </Link>

                  {filteredUsers.map(user => (
                    <Link key={user.id} to={`/profile/${user.username}`}>@{user.username}</Link>
                  ))}
                </Fragment>
                : null
              }

              {filteredCategories.length > 0
                ? <Fragment>
                  <Link style={{ textAlign: 'center' }} to="/photos">
                    <i className="fas fa-angle-double-down" />FOUND CATEGORIES<i className="fas fa-angle-double-down" />
                  </Link>

                  {/* <a href="#" v-on:click="openCategory(category.name)" v-for="category in filteredCategories">{{category.name}}</a> */}
                  {filteredCategories.map(category => (
                    <Link key={category.id} onClick={() => this.setActiveCategory(category)} to="/photos">{category.name}</Link>
                  ))}
                </Fragment>
                : null
              }
            </div>
          </form>
        </div>
      </header>
    )
  }
}

export default HeaderComponent;
