import React, { Component, Fragment } from 'react';
import { ClipLoader } from 'react-spinners';
import { Layout, LoadMore, PhotoList } from '../common'
import { PHOTOS_LIST_SIZE } from '../../utils/constants';

class PhotosComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredPhotos: [],
    }
    this.loadPhotoList = this.loadPhotoList.bind(this);
    this.openCategoriesNav = this.openCategoriesNav.bind(this);
    this.closeCategoriesNav = this.closeCategoriesNav.bind(this);
    this.handleLoadMore = this.handleLoadMore.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.activePhotoCategory !== this.props.activePhotoCategory) {
      this.setActiveCategory(this.props.activePhotoCategory);
    }
  }

  componentDidMount() {
    if (this.props.photos.content.length === 0) {
      this.loadPhotoList();
    }
    this.setState({
      filteredPhotos: this.props.photos.content
    })
    this.setActiveCategory(this.props.activePhotoCategory);
  }

  handleLoadMore() {
    const { photos } = this.props;
    this.loadPhotoList(photos.page + 1);
  }

  setActiveCategory(category) {
    const { photos } = this.props;
    this.props.setActivePhotoCategory(category);
    this.closeCategoriesNav();
    if (category === null) {
      this.setState({
        filteredPhotos: photos.content
      })
      return;
    }
    // eslint-disable-next-line
    const filteredPhotos = photos.content.filter(photo => photo.photoCategory.id == category.id);
    this.setState({
      filteredPhotos: filteredPhotos,
    })
  }

  async loadPhotoList(page = 0, size = PHOTOS_LIST_SIZE) {
    const { fetchPhotos, photos } = this.props;
    const response = await fetchPhotos(page, size);
    if (response) {
      this.setState({
        filteredPhotos: photos.content
      })
      this.setActiveCategory(null);
    }
  }

  openCategoriesNav() {
    const catNav = document.getElementById("categories-nav");
    if (catNav.style.width === "185px") {
      this.closeCategoriesNav();
      return;
    }
    catNav.style.width = "185px";
  }

  closeCategoriesNav() {
    document.getElementById("categories-nav").style.width = "0";
  }

  render() {
    const { filteredPhotos } = this.state;
    const { activePhotoCategory, photoCategories, photos } = this.props;
    return (
      <Layout title="Photos">
        <div id="photosRoot">
          <div id="categories-nav" className="categories">
            <div className="close-categories-btn"><p onClick={this.closeCategoriesNav}><i
              className="fas fa-times"></i></p>
            </div>
            <p
              style={{ textDdecoration: 'underline' }}
              onClick={() => this.setActiveCategory(null)}
              className={activePhotoCategory === null ? 'active' : ''}
            >
              All categories
            </p>
            <hr />
            {
              photoCategories.map(category => (
                <p
                  key={category.id}
                  onClick={() => this.setActiveCategory(category)}
                  className={category === activePhotoCategory ? 'active' : ''}
                  href="#">
                  {category.name}
                </p>
              ))
            }
          </div>

          <div id="select-category-btn" onClick={this.openCategoriesNav}>
            <i style={{ color: '#EEB902' }}
              className="fas fa-bars" />&nbsp;
            <Fragment>
              {photos.isLoading
                ? <ClipLoader
                  sizeUnit={"px"}
                  size={10}
                  color={'#CDD3CE'}
                /> : filteredPhotos.length} photos listed in&nbsp;
              <span style={{ color: '#EEB902' }}>
                {activePhotoCategory ? activePhotoCategory.name + ' category' : 'All categories'}
              </span>
              &nbsp;(&nbsp;
              {filteredPhotos.length === 0 && photos.isLoading
                ? <ClipLoader
                  sizeUnit={"px"}
                  size={10}
                  color={'#CDD3CE'}
                /> : photos.totalElements}
              &nbsp;
               photos total ) </Fragment>
          </div>
          <div className="container-fluid" style={{ paddingLeft: 0 }}>
            <PhotoList photos={filteredPhotos} />
          </div>
          <br />
          <LoadMore isLoading={photos.isLoading} isHidden={activePhotoCategory !== null} isLast={photos.isLast} handleLoadMore={this.handleLoadMore} />
        </div>
      </Layout>
    )
  }
}

export default PhotosComponent;
