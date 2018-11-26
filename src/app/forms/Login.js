import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { Layout } from '../common/index';
import API from '../../utils/API';
import { setCookie } from '../../utils/helpers';

const userLoginRequest = API.userLoginRequest;

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      statusMessage: null,
      isLoading: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleLogin(e) {
    e.preventDefault();
    const { username, password } = this.state;

    if (username.length === 0 || password.length === 0) {
      this.setState({
        statusMessage: 'Please fill all fields'
      })
      setTimeout(() => {
        this.setState({
          statusMessage: null,
        })
      }, 3000)
      return;
    }

    this.setState({isLoading: true})

    var params = new URLSearchParams();
    params.append('grant_type', 'password');
    params.append('username', username);
    params.append('password', password);

    userLoginRequest(params)
      .then(response => {
        setCookie("access_token", response.data.access_token);
        document.location.replace("/profile");
        this.setState({isLoading: false})
      }).catch(error => {
        this.setState({
          isLoading: false,
          statusMessage: 'Wrong username or password'
        })
        setTimeout(() => {
          this.setState({
            statusMessage: null,
          })
        }, 3000)
      })
  }

  render() {
    const { username, password, statusMessage, isLoading } = this.state;
    return (
      <Layout>
        <div className="container-fluid" id="signInRoot">
          <div className="row">
            <div className="col-md-5 col-xl-3 offset-md-2">
              <form className="signForm">
                <h2>Sign in</h2>
                <Link to="/signup">Or create account</Link><br />
                <div className="form-group">
                  <input
                    className="data-input form-control"
                    onChange={this.handleChange}
                    name="username"
                    type="text"
                    maxLength="20"
                    required
                    autoFocus
                    value={username}
                    id="username"
                  />
                  <label
                    className="form-control-placeholder"
                    htmlFor="username"
                  >
                    Username
                  </label>
                </div>
                <div className="form-group">
                  <input
                    className="data-input form-control"
                    onChange={this.handleChange}
                    name="password"
                    type="password"
                    maxLength="30"
                    required
                    value={password}
                    id="password" />
                  <label
                    className="form-control-placeholder"
                    htmlFor="password"
                  >
                    Password
                  </label>
                </div>
                {isLoading
                ? <div className="text-center">
                    <ClipLoader
                      sizeUnit={"px"}
                      size={50}
                      color={'#26262d'}
                    />
                  </div>
                : <button
                    hidden={isLoading}
                    disabled={isLoading}
                    className="submit-btn"
                    type="submit"
                    onClick={this.handleLogin}
                  >
                    Submit
                  </button>
                }
              </form>
              {statusMessage &&
                <div className="alert alert-warning" role="alert">{statusMessage}</div>}
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default Login;
