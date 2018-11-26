import React, { Component } from 'react';
import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';
import './PhotoList.css'
import placeholderImg from '../../assets/placeholder-image.png';

class PhotoListComponent extends Component {
  componentDidMount() {
      // init Masonry
      var grid = document.querySelector('.masonry-grid');
      var msnry = new Masonry(grid, {
        itemSelector: '.masonry-grid-item',
        columnWidth: '.masonry-grid-sizer',
        percentPosition: true
      });
      imagesLoaded(grid).on('progress', function () {
        // layout Masonry after each image loads
        msnry.layout();
      });
  }

  componentDidUpdate() {
    // init Masonry
    var grid = document.querySelector('.masonry-grid');
    var msnry = new Masonry(grid, {
      itemSelector: '.masonry-grid-item',
      columnWidth: '.masonry-grid-sizer',
      percentPosition: true
    });
    imagesLoaded(grid).on('progress', function () {
      // layout Masonry after each image loads
      msnry.layout();
    });
  }

  render() {
    const { photos, openModalPhoto } = this.props;
    return (
      <div className="masonry-grid row">
        <div className="masonry-grid-sizer col-sm-6 col-md-4 col-lg-3 "></div>
        {photos.map(photo => (
          <div 
          key={photo.id} 
          className="masonry-grid-item col-sm-6 col-md-4 col-lg-3"
          onClick={() => openModalPhoto(photo)}
          style={{backgroundImage: `url('${placeholderImg}')`}}
          >
          <div className="middle">
              <h5><b>@{photo.user.username}</b></h5>
            </div>
            <img src={photo.url} alt="masonry-item"/>
        </div>
        ))}
      </div>
    )
  }
}
export default PhotoListComponent;
