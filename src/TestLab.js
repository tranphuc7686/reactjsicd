import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Visit from './Visit';

const divStyle = {
  display: "inline-flex"
};
class Testlab extends React.Component {
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
        url: `http://localhost:8080/medicalServives`,
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
      var medicalservice_id = this.state.icdSelected;
      var patient_id = this.props.match.params.id;
      let date = this.state.datetime;
      let time =  this.state.datetime;
    
      axios({
         method: 'post',
         url: 'http://localhost:8080/visit',
         headers: {'Authorization': sessionStorage.getItem('userData')},
         data: {
           'date':date,
           'time':time,
           'medicalservice_id': medicalservice_id,
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
        <label ><b>Name of Patient : </b></label>
        <label id="namePatient"><b>Bệnh nhân</b></label>
        <div className="">
        <div>
              <label><b>Choose a Medical Servives from this list : </b>
              <input className="un" list="browsers" name="myBrowser" onChange={this.handleDatalistChange} /></label>
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

export default Testlab;
