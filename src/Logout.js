import React from 'react';
import ReactDOM from 'react-dom';

class Logout extends React.Component{
  constructor() {
    super();
    this.logout = this.logout.bind(this);

  }
  logout(){

      sessionStorage.clear();
      this.props.history.push(`/login`);
  }
  componentDidMount() {
      this.logout();
  }



  render(){


    return(
        <h1></h1>
      )
  }
}

export default Logout;
