import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Visit from './Visit';

const divStyle = {
  display: "inline-flex"
};
class TestLabUpdate extends React.Component {
  constructor(){
      super();

      this.state = {
        posts: [],
        listIcd:[],
        icdSelected:'',
        datetime:''
      };

      this.cancel = this.cancel.bind(this);
        this.handleDatalistChange = this.handleDatalistChange.bind(this);
  this.onChange = this.onChange.bind(this);
  this.submitTestlab = this.submitTestlab.bind(this);
    }



  componentDidMount() {
    //get list ICD
    axios({
        method: 'get',
        url: `http://149.56.14.30:8080/medicalServives`,
        headers: {'Authorization': sessionStorage.getItem('userData')}
        })
        .then(response => { //This is an arrow function

          const posts = response.data.map(obj => obj);
          this.setState({ posts });
            });
  }
  cancel(){
    this.props.history.push('/');

  }
  handleDatalistChange(e) {
      e.preventDefault();
      this.setState({icdSelected : e.target.value});
    }
    submitTestlab(){
      if(this.state.datetime == "" || this.state.icdSelected==""){
        alert("Some Input is Empty !!");
        return;
      }
      var medicalservice_id = this.state.icdSelected;
      var patient_id = this.props.match.params.id;
      var idVisit = this.props.match.params.id;
      let current_datetime = new Date(this.state.datetime);
      let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate();
      let formatted_time = current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds();
      let date = formatted_date;
      let time =  formatted_time;

      axios({
         method: 'put',
         url: 'http://149.56.14.30:8080/medicalServive',
         headers: {'Authorization': sessionStorage.getItem('userData')},
         data: {
           'date':date,
           'time':time,
           'medicalservice_id': medicalservice_id,
           'patient_id' : patient_id,
           'idVisit' :idVisit

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
              <label><b>Choose a Medical Servives from this list : </b>
              <input className="un" list="browsers" value={this.state.medicalservice_id} name="myBrowser" onChange={this.handleDatalistChange} /></label>
              <datalist id="browsers" >
              {this.state.posts.map(e =>
                  <option value={e.id}>{e.name}</option>
              )}

              </datalist>

        </div>
        <label>Date Time : </label><br></br>
        <input class="pass" type="datetime-local" name="datetime" placeholder="Date Time"  onChange={this.onChange}></input>

        </div>
        <div>
          <ul>
            {this.state.listIcd.map(e=><li>{e}</li>)}
          </ul>

        </div>
        <div className="text-center">

        <button className="buttonDialog " type="button" onClick={this.submitTestlab} >Submit</button>
        <button className="buttonDialog " type="button" onClick={this.cancel} >Cancel</button>
            </div>


      </div>



    );
  }
}

export default TestLabUpdate;
