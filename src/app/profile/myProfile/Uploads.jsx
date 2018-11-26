import React, { Component } from 'react';
import { PhotoList } from '../../common';
import { ClipLoader } from 'react-spinners'
import { DESCRIPTION_MAX_SIZE, TITLE_MAX_SIZE } from '../../../utils/constants';
import API from '../../../utils/API';

const uploadPhotoRequest = API.uploadPhotoRequest;

const uploadFormInitState = {
  title: '',
  description: '',
  categoryName: '',
  photo: null,
  isUploading: false,
  statusMessage: null,
}

class Uploads extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadForm: uploadFormInitState
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.createImage = this.createImage.bind(this);
    this.descriptionCharsLeft = this.descriptionCharsLeft.bind(this);
    this.titleCharsLeft = this.titleCharsLeft.bind(this);
    this.handlePhotoUpload = this.handlePhotoUpload.bind(this);
    this.handleCancelUpload = this.handleCancelUpload.bind(this);
    this.isUploadingFileTypeOfImage = this.isUploadingFileTypeOfImage.bind(this);
  }

  handleChange(e) {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    this.setState(prevState => ({
      uploadForm: {
        ...prevState.uploadForm,
        [fieldName]: fieldValue
      }
    }))
  }

  descriptionCharsLeft() {
    const { description } = this.state.uploadForm;
    return description.length + "/" + DESCRIPTION_MAX_SIZE;
  }
  titleCharsLeft() {
    const { title } = this.state.uploadForm;
    return title.length + "/" + TITLE_MAX_SIZE;
  }

  handleFileChange(e) {
    var files = e.target.files || e.dataTransfer.files;
    if (!files.length) {
      return;
    }
    this.createImage(files[0]);
  }

  createImage(file) {
    var reader = new FileReader();
    reader.onload = (e) => {
      this.setState(prevState => ({
        uploadForm: {
          ...prevState.uploadForm,
          photo: e.target.result,
        }
      }))
    };
    reader.readAsDataURL(file);
  }

  handlePhotoUpload() {
    const { uploadForm } = this.state;
    const { loggedInUser, fetchUploadedPhotos } = this.props;
    const uploadingFile = document.getElementById("photo_input_file").files[0];
    if (!uploadingFile) { return; }
    if (!this.isUploadingFileTypeOfImage(uploadingFile)) {
      alert("File should be type of image");
      return;
    }
    if (uploadForm.categoryName === '') {
      alert("Please select a category")
      return;
    }
    const data = new FormData();
    data.append("title", uploadForm.title);
    data.append("description", uploadForm.description);
    data.append("category", uploadForm.categoryName);
    data.append("photo", uploadingFile, uploadingFile.name);
    this.setState(prevState => ({
      uploadForm: {
        ...prevState.uploadForm,
        isUploading: true,
        photo: null
      }
    }));
    uploadPhotoRequest(loggedInUser.content.id, data)
      .then(response => {
        this.setState({
          uploadForm: uploadFormInitState
        });
        document.getElementById("photo_input_file").value = '';
        fetchUploadedPhotos(loggedInUser.content);
      }).catch(error => {
        this.setState(prevState => ({
          uploadForm: {
            ...prevState.uploadForm,
            isUploading: false
          }
        }));
        console.error(error);
      })
  }

  handleCancelUpload() {
    this.setState({
      uploadForm: uploadFormInitState
    })
    document.getElementById("photo_input_file").value = '';
  }

  isUploadingFileTypeOfImage(file) {
    return file.name.match(/.(jpg|jpeg|png|gif)$/i);
  }

  render() {
    const { loggedInUser, photoCategories } = this.props;
    const { uploadForm } = this.state;
    return (
      <div id="Uploads" className="profileTabContent">
        <div className="container-fluid" style={{ paddingLeft: 0 }}>
          <div className="row">
            <div className="col-md-4 offset-md-2">
              <div v-if="updateData != 'photo'">
                <h3>Welcome, {loggedInUser.content.firstName}!</h3>
                <p>On this page you can upload photos (up to ~5mb size)</p>
              </div>
              {/* PHOTO PREVIEW */}
              <div className="photoUploadContainer">
                <img
                  src={uploadForm.photo}
                  alt=""
                  className="upload-photo-preview"
                  hidden={!uploadForm.photo}
                />
                <input accept="image/*"
                  type="file"
                  className="inputFile"
                  id="photo_input_file"
                  disabled={uploadForm.isUploading}
                  onChange={this.handleFileChange}
                />
                <label htmlFor="photo_input_file" className="btn btn-dark">
                  {
                    uploadForm.isUploading
                      ? <span>Uploading... <i className="fas fa-sync fa-spin" /></span>
                      : <span><i className="fas fa-camera" /> Choose photo</span>
                  }
                </label>
                {/* <h5 style={{ textAlign: 'center' }}>
                  To upload your first photo<br />
                  <i style={{ color: '#fff' }} className="fas fa-arrow-up" />
                  please click the button above
                  <i style={{ color: '#fff' }} className="fas fa-arrow-up" />
                </h5> */}
              </div>
            </div>

            <div className="col-md-4">
              {uploadForm.photo &&
                <div className="uploadPhotoForm">
                  {/* TITLE FIELD */}
                  <div className="form-group">
                    <label style={{ color: '#CDD3CE' }} htmlFor="uploadPhotoTitle">Title</label>
                    <span className="float-right" style={{ fontSize: '0.85em' }}>
                      {this.titleCharsLeft()}
                    </span>
                    <input
                      maxLength="75"
                      placeholder="Not required"
                      className="uploadPhotoFormElement"
                      name="title"
                      onChange={this.handleChange}
                      value={uploadForm.title}
                      id="uploadPhotoTitle"
                      type="text"
                    />
                  </div>
                  {/* DESCRIPTION FIELD */}
                  <div className="form-group">
                    <label style={{ color: '#CDD3CE' }} htmlFor="uploadPhotoDescription">Description</label>
                    <span className="float-right" style={{ fontSize: '0.85em' }}>
                      {this.descriptionCharsLeft()}
                    </span>
                    <textarea
                      maxLength="150"
                      placeholder="Not required"
                      className="uploadPhotoFormElement"
                      name="description"
                      onChange={this.handleChange}
                      value={uploadForm.description}
                      id="uploadPhotoDescription"
                      rows="3"></textarea>
                  </div>

                  {/* CATEGORY FIELD */}
                  <select
                    className="uploadPhotoFormElement"
                    id="uploadPhotoCategory"
                    value={uploadForm.categoryName}
                    name="categoryName"
                    onChange={this.handleChange}
                  >
                    <option disabled value="">Select category (Required)</option>

                    {photoCategories.map(category => (
                      <option key={category.id} value={category.name}>{category.name}</option>
                    ))}
                  </select>

                  <button
                    onClick={this.handlePhotoUpload}
                    className="btn btn-success"
                    style={{ marginRight: '10px' }}
                  >
                    <i className="fas fa-chevron-circle-up" /> Upload
                </button>
                  <button
                    onClick={this.handleCancelUpload}
                    className="btn btn-danger"
                  >
                    <i className="fas fa-times" /> Cancel
                </button>
                  {/* <h6 style={{ margin: '10px 0 0 10px' }}>
                  <i style={{ color: '#2e9161' }} className="fas fa-arrow-up" /> When ready, click the
                  <span style={{ color: '#2e9161', border: '1px solid #2e9161', padding: '3px' }}>Upload</span> button
                </h6> */}
                </div>
              }
            </div>
          </div>
          <br />
          <br />
          {/* <!--USER UPLOADED PHOTOS GRID --> */}

          {
            loggedInUser.uploadedPhotos.content
              ? <PhotoList photos={loggedInUser.uploadedPhotos.content} />
              : <div className="row" >
                <div className="col" style={{ textAlign: 'center' }}>
                  <ClipLoader
                    sizeUnit={"px"}
                    size={50}
                    color={'#EEB902'}
                    style={{ textAlign: 'center' }}
                  />
                </div>
              </div>
          }
        </div>
      </div>
    )
  }
}
export default Uploads;
