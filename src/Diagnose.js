import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Visit from './Visit';

const divStyle = {
  display: "inline-flex"
};
class Diagnose extends React.Component {
  constructor(){
      super();

      this.state = {
        posts: [],
        listIcd:[],
        icdSelected:'',
        problems:''
      };

      this.cancel = this.cancel.bind(this);
        this.handleDatalistChange = this.handleDatalistChange.bind(this);
  this.onChange = this.onChange.bind(this);
  this.submitVisit = this.submitVisit.bind(this);
    }



  componentDidMount() {
    //get list ICD
    axios({
        method: 'get',
        url: `http://149.56.14.30:8080/icd`,
        headers: {'Authorization': sessionStorage.getItem('userData')}
        })
        .then(response => { //This is an arrow function

          const posts = response.data.map(obj => obj);
          this.setState({ posts });
            });
  }
  cancel(){
    var value = this.state.problems;
    this.props.history.push('/');

  }
  handleDatalistChange(e) {
      e.preventDefault();
      this.setState({icdSelected : e.target.value});
    }
    submitVisit(){
      if(this.state.problems == "" || this.state.icdSelected==""){
        alert("Some Input is Empty !!");
        return;
      }
      var problems = this.state.problems;
      var diagnosis_id = this.state.icdSelected;
      var patient_id = this.props.match.params.id;
      let current_datetime = new Date()
      let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate()

      axios({
         method: 'post',
         url: 'http://149.56.14.30:8080/visit',
         headers: {'Authorization': sessionStorage.getItem('userData')},
         data: {
           'diagnosis_id' : diagnosis_id,
           'problems': problems,
           'patient_id' : patient_id
         }
         })
         .then(response => { //This is an arrow function
           alert("Create new visit success !! ")
           this.props.history.push('/');
             })
        .catch(res => {
               alert(res.status);
             });
    }
    onChange(e){
      this.setState({[e.target.name]:e.target.value});
     }

  render() {
    return (
      <div className="mainPatient">
        <input type="hidden" name="date" id="todayDate"></input>
        <input type="hidden" name="time" id="todayTime"></input>
        <div className="">
        <div>
              <label><b>Choose a Idc from this list : </b>
              <input className="un" list="browsers" name="myBrowser" onChange={this.handleDatalistChange} /></label>
              <datalist id="browsers" >
              {this.state.posts.map(e =>
                  <option value={e.id}>{e.diseaseName}</option>
              )}

              </datalist>

        </div>
        <label>Problems : </label><br></br>
        <input class="pass" type="text" name="problems" placeholder="Problems"  onChange={this.onChange}></input>

        </div>
        <div>
          <ul>
            {this.state.listIcd.map(e=><li>{e}</li>)}
          </ul>

        </div>
        <div className="text-center">

        <button className="buttonDialog " type="button" onClick={this.submitVisit} >Submit</button>
        <button className="buttonDialog " type="button" onClick={this.cancel} >Cancel</button>
            </div>


      </div>



    );
  }
}

export default Diagnose;
