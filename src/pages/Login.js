import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../css/login.css";

import { Formik } from "formik";
import * as EmailValidator from "email-validator"; // used when validating with a self-implemented approach
import * as Yup from "yup"; // used when validating with a pre-built solution
import axios from 'axios';
import {Redirect} from 'react-router-dom';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isValidUsername: true,
      isValidPassword: true,
      isToken: '',
    };
  }

  handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  onLogin() {
    console.log(this.state.username + 'afaf');
  }

  Login = async (e) => {
    e.preventDefault();
    //console.log(this.state.username);
    //console.log(this.state.password);
    axios.post('https://qlsc.maysoft.io/server/api/auth/login', {
      'username': this.state.username,
      'password': this.state.password
    }).then(response => {
      //console.log(response.data.data.token_type);
      //console.log(response.data.data.token_type + ' ' + response.data.data.access_token);
      this.setState({ isToken: response.data.data.token_type + ' ' + response.data.data.access_token }, () => { localStorage.setItem('my-key', this.state.isToken); });
      // Code Test
      //this.props.setToken(response.data.data.token_type + ' ' + response.data.data.access_token);
      // Code Test
      console.log(this.state.isToken);

      //localStorage.setItem('my-key', this.state.isToken);
      //console.log(response.data);
      window.location.href = '/Home';
      //this.props.history.push('/Home');
    }).catch(error => {
      console.log(error);
    })
  };

  render() {
    return (
      <div className="global-container">
        <div className="card login-form">
          <div className="card-body">
            <div className="row justify-content-center align-items-center text-center p-2">
              <div className="pt-1 pb-1">
                <img src={require('../assets/logo_01.png')} />
              </div>
            </div>
            <div className="card-text">
              <form onSubmit={(e) => this.Login(e)}>
                {/* to error: add class "has-danger" */}
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Tên đăng nhập</label>
                  <input type="text" name="username" required className="form-control form-control-sm" id="InputUsername" onChange={(e) => this.handleInput(e)}
                    value={this.state.username} />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Mật khẩu</label>
                  <input type="password" name="password" required className="form-control form-control-sm" id="InputPassword" onChange={(e) => this.handleInput(e)}
                    value={this.state.password} />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Đăng nhập</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;