import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { BrowserRouter as Router, Route,Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import Visit from './Visit';
import Login from './Login';

const divStyle = {
  listStyleType: "none"
};
class App extends React.Component {
  constructor() {
        super();
      }
  state = {
    posts: []
  }
  redirectToTarget = index => e => {
    const id = e.target.value;
    switch (index) {
      case 1:{
            this.props.history.push(`/hisvisit/`+id);
            break;
        }
      case 2:{
        this.props.history.push(`/diagnose/`+id);
        break;
      }
      case 3:{
        this.props.history.push(`/testlab/`+id);
        break;
      }
      case 4:{
        this.props.history.push(`/patient/`);
        break;
      }
        break;
      default:

    }
    }

  componentDidMount() {


      axios({
          method: 'get',
          url: `http://localhost:8080/${this.props.subreddit}`,
          headers: {'Authorization': sessionStorage.getItem('userData')}
          })
          .then(response => { //This is an arrow function

            const posts = response.data.map(obj => obj);
            this.setState({ posts });
              });
  }


  render() {
    if (sessionStorage.getItem('userData')== 'undefined' || sessionStorage.getItem('userData') == null) {
     return (<Redirect to={'/login'}/>)
   }
    return (
      <div>
        <h1>List patients</h1>
        <button className="buttonDialog mainBtn" onClick={this.redirectToTarget(4)}>New patient</button>

        <ul>
          {this.state.posts.map(post =>
            <div>
            <li key={post.id}>{post.name}</li>
            <ul style={divStyle}>
              <li>
                <button className="buttonDialog mainBtn" onClick={this.redirectToTarget(1)} value={post.id}>History Visit</button>
                <button className="buttonDialog mainBtn" onClick={this.redirectToTarget(2)} value={post.id}>Diagnose</button>
                <button className="buttonDialog mainBtn" onClick={this.redirectToTarget(3)} value={post.id}>Test</button>
              </li>
            </ul>

            </div>
          )}
        </ul>

      </div>

    );
  }
}

export default withRouter(App);
