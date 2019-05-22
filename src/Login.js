import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {
  BrowserRouter,
  Route,
  Redirect,
  Link
} from 'react-router-dom';
import {
  withRouter
} from 'react-router';

class Login extends React.Component {
  constructor(){
      super();

      this.state = {
       username: '',
       password: '',
       redirectToReferrer: false
      };

      this.login = this.login.bind(this);
      this.onChange = this.onChange.bind(this);

    }

     onChange(e){
       this.setState({[e.target.name]:e.target.value});
      }




    componentDidMount() {

    }

  login() {
     if(this.state.username && this.state.password){
       var bodyFormData = new FormData();
       bodyFormData.set('username', this.state.username);
        bodyFormData.set('password', this.state.password);

    axios({
        method: 'post',
        url: 'http://localhost:8080/login',
        data: bodyFormData
        })
        .then(response => { //This is an arrow function
          let responseJson = response;
          if(responseJson.status == '200'){
            sessionStorage.setItem('userData',responseJson.data.Authorization);
            this.setState({redirectToReferrer: true});
              this.props.history.push('/');
          }
            }).catch(res => {
                   alert(res.status);
                 });;



    }
  }

  render() {

    return (
      <div className="main" id="Body">
       <div className="medium-5 columns left mainLogin">
       <p class="sign" align="center">Sign in</p>
       <input class="un " name="username" type="text" align="center" placeholder="Username" onChange={this.onChange}></input>
       <input class="pass" name="password" type="password" align="center" placeholder="Password"  onChange={this.onChange}></input>
       <button class="submit" type="submit" value="Login" onClick={this.login}>Login</button>
        <p class="forgot" align="center"><a href="#">Forgot Password?</a></p>
       </div>
     </div>





    );
}
}

export default withRouter(Login);
