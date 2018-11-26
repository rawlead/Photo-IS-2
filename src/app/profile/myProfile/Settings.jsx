import React, { Component } from 'react';
import API from '../../../utils/API';

const updateAvatarRequest = API.updateAvatarRequest;
const updatePasswordRequest = API.updatePasswordRequest;
const updateEmailRequest = API.updateEmailRequest;

const formsInitialState = {
  emailForm: {
    isVisible: false,
    isUpdating: false,
    newEmail: '',
    newEmailConfirm: '',
  },
  passwordForm: {
    isVisible: false,
    isUpdating: false,
    oldPassword: '',
    newPassword: '',
    newPasswordConfirm: '',
  },
  avatarForm: {
    isUpdating: false,
    newAvatar: '',
  }
}

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailForm: formsInitialState.emailForm,
      passwordForm: formsInitialState.passwordForm,
      avatarForm: formsInitialState.avatarForm
    }
    this.handleUpdateAvatar = this.handleUpdateAvatar.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.createImage = this.createImage.bind(this);
    this.toggleEmailFormVisibility = this.toggleEmailFormVisibility.bind(this);
    this.togglePasswordFormVisibility = this.togglePasswordFormVisibility.bind(this);
    this.handleEmailFormChange = this.handleEmailFormChange.bind(this);
    this.handlePasswordFormChange = this.handlePasswordFormChange.bind(this);
    this.handleUpdateEmail = this.handleUpdateEmail.bind(this);
    this.handleUpdatePassword = this.handleUpdatePassword.bind(this);
  }

  handleUpdateAvatar() {
    const { loggedInUser } = this.props;
    const uploadingFile = document.getElementById("avatar_input_file").files[0];
    if (!this.isUploadingFileTypeOfImage(uploadingFile)) {
      alert("File should be type of image");
      return;
    }
    var formData = new FormData();
    formData.append("avatarImage", uploadingFile);

    this.setState(prevState => ({
      avatarForm: {
        ...prevState.avatarForm,
        isUpdating: true
      }
    }));
    updateAvatarRequest(loggedInUser.content.id, formData)
      .then(response => {
        this.setState(prevState => ({
          avatarForm: {
            ...prevState.avatarForm,
            isUpdating: false
          }
        }));
        // alert('updated');
      }
      ).catch(error => {
        console.error(error);
        this.setState(prevState => ({
          avatarForm: {
            ...prevState.avatarForm,
            isUpdating: false
          }
        }));
      })
  }

  toggleEmailFormVisibility() {
    this.setState(prevState => ({
      emailForm: {
        ...prevState.emailForm,
        isVisible: !prevState.emailForm.isVisible
      },
      passwordForm: {
        ...prevState.passwordForm,
        isVisible: false
      },
    }))
  }

  togglePasswordFormVisibility() {
    this.setState(prevState => ({
      passwordForm: {
        ...prevState.passwordForm,
        isVisible: !prevState.passwordForm.isVisible
      },
      emailForm: {
        ...prevState.emailForm,
        isVisible: false
      }
    }))
  }

  handleEmailFormChange(e) {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    this.setState(prevState => ({
      emailForm: {
        ...prevState.emailForm,
        [fieldName]: fieldValue
      }
    }))
  }
  handlePasswordFormChange(e) {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    this.setState(prevState => ({
      passwordForm: {
        ...prevState.passwordForm,
        [fieldName]: fieldValue
      }
    }))
  }

  handleFileChange(e) {
    var files = e.target.files || e.dataTransfer.files;
    if (!files.length) {
      return;
    }
    this.createImage(files[0]);
    this.handleUpdateAvatar()
  }

  createImage(file) {
    var reader = new FileReader();
    reader.onload = (e) => {
      this.setState(prevState => ({
        avatarForm: {
          ...prevState.avatarForm,
          newAvatar: e.target.result,
        }
      }))
    };
    reader.readAsDataURL(file);
  }

  isUploadingFileTypeOfImage(file) {
    return file.name.match(/.(jpg|jpeg|png|gif)$/i);
  }

  handleUpdateEmail(e) {
    e.preventDefault();
    const { loggedInUser } = this.props;
    const { newEmail, newEmailConfirm } = this.state.emailForm;
    this.setState(prevState => ({
      emailForm: {
        ...prevState.emailForm,
        isUpdating: true
      }
    }))
    updateEmailRequest(loggedInUser.content.id, newEmail, newEmailConfirm)
      .then(response => {
        this.setState(prevState => ({
          emailForm: {
            ...prevState.emailForm,
            isUpdating: false
          }
        }))
        alert(response.data);
        this.toggleEmailFormVisibility();
      }).catch(error => {
        this.setState(prevState => ({
          emailForm: {
            ...prevState.emailForm,
            isUpdating: false
          }
        }))
        alert(error.response.data)
      });
  }

  handleUpdatePassword(e) {
    e.preventDefault();
    const { loggedInUser } = this.props;
    const { oldPassword, newPassword, newPasswordConfirm } = this.state.passwordForm;
    this.setState(prevState => ({
      passwordForm: {
        ...prevState.passwordForm,
        isUpdating: true
      }
    }))
    updatePasswordRequest(loggedInUser.content.id, oldPassword, newPassword, newPasswordConfirm)
      .then(response => {
        this.setState(prevState => ({
          passwordForm: {
            ...prevState.passwordForm,
            isUpdating: false
          }
        }))
        alert(response.data);
        this.togglePasswordFormVisibility();
      }).catch(error => {
        this.setState(prevState => ({
          passwordForm: {
            ...prevState.passwordForm,
            isUpdating: false
          }
        }))
        alert(error.response.data)
      });
  }

  render() {
    const { loggedInUser } = this.props;
    const { avatarForm, emailForm, passwordForm } = this.state;
    return (
      <div id="Settings" className="profileTabContent">
        <div className="container-fluid">
          <div className="row">
            {/* <!--   SETTING  --> */}
            <div className="col-md-5 offset-md-2 col-6">
              <h3>Welcome, firstname!</h3>
              <p>On this page you can:</p>
              <ol>
                <li>Change your profile picture.</li>
                <li>Change your email</li>
                <li>Change your password</li>
              </ol>

              <p>Date of registration: {loggedInUser.content.registrationDate}</p>
              <p>Email: {loggedInUser.content.email}</p>
              <h5>
                <a className="badge badge-dark" onClick={this.toggleEmailFormVisibility} href="#!" style={{ marginRight: '10px' }}>Change email</a>
                <a className="badge badge-dark" onClick={this.togglePasswordFormVisibility} href="#!">Change password</a>
              </h5>
            </div>
            {/* <!--  avatar form--> */}
            <div className="col-md-3 col-avatar col-5" style={{ maxWidth: '280px' }}>
              <div className="avatarContainer">
                <img src={avatarForm.newAvatar || loggedInUser.content.avatarUrl} alt="Avatar" className="profile-tab-avatar" />
                <div className="avatar-middle-overlay">
                  <input
                    accept="image/*"
                    type="file"
                    disabled={avatarForm.isUpdating}
                    className="inputFile"
                    id="avatar_input_file"
                    onChange={this.handleFileChange}
                  />
                  <label htmlFor="avatar_input_file" className="btn btn-dark">
                    {
                      avatarForm.isUpdating
                        ? <span>Uploading... <i className="fas fa-sync fa-spin" /></span>
                        : <span><i className="fas fa-camera" /> Update</span>
                    }
                  </label>
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                {/* <h6 v-if="hasError" class="alert alert-warning" role="alert">{{statusMessage}}</h6>
                <h6 v-else="" class="alert alert-success" role="alert">{{statusMessage}} <i
                        class="fas fa-sync fa-spin"></i></h6> */}
              </div>
            </div>
          </div>
          <div className="row">
          <div className="col-12 offset-md-2 col-md-5 col-lg-4">
            {/* <!--change email form--> */}
            <form className="profile-settings-form" hidden={!emailForm.isVisible}>
              <input
                name="newEmail"
                onChange={this.handleEmailFormChange}
                value={emailForm.newEmail}
                type="email"
                required
                placeholder="Enter new email"
              />
              <input
                name="newEmailConfirm"
                onChange={this.handleEmailFormChange}
                value={emailForm.newEmailConfirm}
                type="email"
                required
                placeholder="Confirm new email"
              />
              <button
                onClick={this.handleUpdateEmail}
                disabled={emailForm.isUpdating}
                className="btn btn-success"
                style={{ marginRight: '10px' }}
                type="submit"
              >
                {
                  emailForm.isUpdating
                    ? <span>Updating email... <i className="fas fa-sync fa-spin" /></span>
                    : <span><i className="fas fa-chevron-circle-up"></i> Submit</span>
                }
              </button>
              <button onClick={this.toggleEmailFormVisibility} type="button" className="btn btn-danger">
                <i className="fas fa-times"></i> Cancel
                </button>
            </form>
          </div>
          </div>
          <div className="row">
          <div className="col-12 offset-md-2 col-md-5 col-lg-4">
            {/* <!-- change password form--> */}
            <form className="profile-settings-form" hidden={!passwordForm.isVisible}>
              <input
                name="oldPassword"
                onChange={this.handlePasswordFormChange}
                value={passwordForm.oldPassword}
                type="password"
                required
                placeholder="Enter old password"
              />
              <input
                name="newPassword"
                onChange={this.handlePasswordFormChange}
                value={passwordForm.newPassword}
                type="password"
                required
                placeholder="Enter new password"
              />
              <input
                name="newPasswordConfirm"
                onChange={this.handlePasswordFormChange}
                value={passwordForm.newPasswordConfirm}
                type="password"
                required
                placeholder="Confirm new password"
              />
              <button
                onClick={this.handleUpdatePassword}
                disabled={passwordForm.isUpdating}
                className="btn btn-success"
                style={{ marginRight: '10px' }}
              >
                {
                  passwordForm.isUpdating
                    ? <span>Updating password... <i className="fas fa-sync fa-spin" /></span>
                    : <span><i className="fas fa-chevron-circle-up"></i> Submit</span>
                }
              </button>
              <button onClick={this.togglePasswordFormVisibility} type="button" className="btn btn-danger">
                <i className="fas fa-times"></i> Cancel
                </button>
            </form>
            {/* <div v-if="hasError" className="alert alert-warning" role="alert">{{statusMessage}}</div>
            <div v-else="" class="alert alert-success" role="alert">{{statusMessage}}</div> */}
          </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Settings;
