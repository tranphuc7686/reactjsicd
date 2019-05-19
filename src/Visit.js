import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {
  BrowserRouter,
  Route
} from 'react-router-dom';
import {
  withRouter
} from 'react-router';


const divStyle = {
  listStyleType: "none"
};
class Visit extends React.Component {

  state = {
    visits: []
  }

  componentDidMount() {
    const id = this.props.match.params.id;


      axios({
          method: 'get',
          url: `http://localhost:8080/find/visit/`+id,
          headers: {'Authorization': sessionStorage.getItem('userData')}
          })
          .then(response => { //This is an arrow function

            const visits = response.data.map(obj => obj);
            this.setState({ visits });
              });

  }

  render() {
    if(this.state.visits.length <= 0){
      return(
        <div className="text-center">
          <h1>History Visit of patient</h1>
            <h4>Patient dont have visit history</h4>


        </div>
      );
    }
    return (
      <div>
        <h1>History Visit of patient</h1>
        <ul>
          {this.state.visits.map(visit =>
            <div>
            <li key={visit.id}>{visit.icdName}</li>
            <ul style={divStyle}>
              <li>
                Problems :  {visit.problems}
              </li>
              <li>
                Date : {new Date(visit.date).toLocaleDateString()}
              </li>
              <li>
                Time : {visit.time}
              </li>
            </ul>

            </div>
          )}
        </ul>

      </div>
    );
  }
}

export default withRouter(Visit);
