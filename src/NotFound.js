import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Visit from './Visit';

const divStyle = {
  listStyleType: "none"
};
class Diagnose extends React.Component {

  state = {
    posts: []
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="text-center">
        <h1>ERROR 404 - NOT FOUND</h1>
      </div>

    );
  }
}

export default Diagnose;
