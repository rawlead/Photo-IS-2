import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import API from '../../utils/API'
import { setCookie } from '../../utils/helpers'
import { Layout } from '../common/index';

const userSignupRequest = API.userSignupRequest;
const userLoginRequest = API.userLoginRequest;

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
      passwordConfirm: '',
      statusMessage: null,
      isLoading: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleLogin(username, password) {
    const params = new URLSearchParams();
    params.append('grant_type', 'password');
    params.append('username', username);
    params.append('password', password);

    userLoginRequest(params)
      .then(response => {
        setCookie("access_token", response.data.access_token);
        this.setState({isLoading: true})
        document.location.replace("/profile");
      })
  }

  handleSignup(e) {
    e.preventDefault();

    const {
      firstName,
      lastName,
      email,
      username,
      password,
      passwordConfirm,
    } = this.state;

    const params = {
      "firstName": firstName,
      "lastName": lastName,
      "email": email,
      "username": username,
      "password": password,
      "passwordConfirm": passwordConfirm
    }

    this.setState({isLoading: true})

    userSignupRequest(params)
      .then(result => {
        console.log('User has been created');
        this.handleLogin(username, password);

      }).catch(error => {
        this.setState({
          statusMessage: error.response.data,
          isLoading: false
        })
        setTimeout(() => {
          this.setState({
            statusMessage: null,
          })
        }, 3000);
      })
  }

  render() {
    const {
      firstName,
      lastName,
      email,
      username,
      password,
      passwordConfirm,
      statusMessage,
      isLoading
    } = this.state;
    return (
      <Layout>
        <div className="container-fluid" id="signupRoot">
          <div className="row hor-sep-60"></div>
          <div className="row">
            <div className="col-md-5 col-xl-3 offset-md-2">
              <form className="signForm">
                <h2>Create account</h2>
                <Link to="/login">Or sign in</Link>
                <br />

                {/* FIRST NAME */}
                <div className="form-group">
                  <input
                    onChange={this.handleChange}
                    value={firstName}
                    className="data-input form-control"
                    maxLength="20"
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    autoFocus
                  />
                  <label
                    className="form-control-placeholder"
                    htmlFor="firstName"
                  >
                    First name
                    </label>
                </div>

                {/* LAST NAME */}
                <div className="form-group">
                  <input
                    onChange={this.handleChange}
                    value={lastName}
                    className="data-input form-control"
                    maxLength="20"
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                  />
                  <label
                    className="form-control-placeholder"
                    htmlFor="lastName"
                  >
                    Last name
                  </label>
                </div>

                {/* EMAIL */}
                <div className="form-group">
                  <input
                    onChange={this.handleChange}
                    value={email}
                    className="data-input form-control"
                    maxLength="50"
                    type="text"
                    id="email"
                    name="email"
                    required
                  />
                  <label
                    className="form-control-placeholder"
                    htmlFor="email"
                  >
                    Email
                  </label>
                </div>

                {/* USERNAME */}
                <div className="form-group">
                  <input
                    onChange={this.handleChange}
                    value={username}
                    className="data-input form-control"
                    maxLength="20"
                    type="text"
                    id="username"
                    name="username"
                    required
                  />
                  <label
                    className="form-control-placeholder"
                    htmlFor="username"
                  >
                    Username
                   </label>
                </div>

                {/* PASSWORD */}
                <div className="form-group">
                  <input
                    onChange={this.handleChange}
                    value={password}
                    className="data-input form-control"
                    maxLength="30"
                    type="password"
                    id="password"
                    name="password"
                    required
                  />
                  <label
                    className="form-control-placeholder"
                    htmlFor="password"
                  >
                    Password
                  </label>
                </div>

                {/* PASSWORD CONFIRM */}
                <div className="form-group">
                  <input
                    onChange={this.handleChange}
                    value={passwordConfirm}
                    className="data-input form-control"
                    maxLength="30"
                    type="password"
                    id="passwordConfirm"
                    name="passwordConfirm"
                    required
                  />
                  <label
                    className="form-control-placeholder"
                    htmlFor="passwordConfirm"
                  >
                    Confirm password
                  </label>
                </div>

                 {statusMessage &&
                <div className="alert alert-warning" role="alert">{statusMessage}</div>}

               {isLoading
                ? <div className="text-center">
                    <ClipLoader
                      sizeUnit={"px"}
                      size={50}
                      color={'#26262d'}
                    />
                  </div>
                : <button 
                    onClick={this.handleSignup} 
                    type="submit" 
                    className="submit-btn"
                    >
                    SUBMIT
                    </button>
               }
              </form>

             
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default Signup;
