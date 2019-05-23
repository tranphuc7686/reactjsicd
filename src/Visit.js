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
  constructor(){
    super();
    this.deleteVist =this.deleteVist.bind(this);
      this.update =this.update.bind(this);
  }
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
deleteVist(e){
  const id = e.target.value;
  let self = this;
  axios({
      method: 'delete',
      url: `http://localhost:8080/visit/`+id,
      headers: {'Authorization': sessionStorage.getItem('userData')}
      })
      .then(response => { //This is an arrow function
          alert(" Delete visit success !! ");
            window.location.reload();
          });
}
getValueVisitType(type){
  if(type != 0){
    return "Test Lab";
  }
  return "Diagnose ICD";

}
update = type => e => {
  const id = e.target.value;
  if(type == 0){

  return   this.props.history.push(`/diagnoseupdate/`+id);
  }
  return this.props.history.push(`/testlabupdate/`+id);
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
      <div className="container">
        <h1>History Visit of patient</h1>
        <ul>
          {this.state.visits.map(visit =>
            <div>

            <li key={visit.id}><b>{this.getValueVisitType(visit.typeVisit)}</b> : {visit.icdName}{visit.medicalServiceName}</li>


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
<button className="buttonDialog mainBtn" onClick={this.deleteVist} value={visit.idVisit}>Delete this visit</button>
<button className="buttonDialog mainBtn" onClick={this.update(visit.typeVisit)} value={visit.idVisit}>Edit this visit</button>
            </div>
          )}
        </ul>

      </div>
    );
  }
}

export default withRouter(Visit);
