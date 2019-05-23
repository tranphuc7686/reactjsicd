import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';


class Patient extends React.Component {
  constructor(){
      super();

      this.state = {
       name: '',
       anddress: '',
       brithdate: '',
       gender: '1'
      };

      this.onChange = this.onChange.bind(this);
        this.submit = this.submit.bind(this);


    }

     onChange(e){
       this.setState({[e.target.name]:e.target.value});
      }

submit(){
  if(this.state.name == "" || this.state.birthdate==""|| this.state.gender ==""|| this.state.anddress==""){
    alert("Some Input is Empty !!");
    return;
  }
axios({
   method: 'post',
   url: 'http://149.56.14.30:8080/patient',
   headers: {'Authorization': sessionStorage.getItem('userData')},
   data: {
     'name': this.state.name,
     'birthdate': this.state.birthdate,
     'gender': this.state.gender,
     'address': this.state.anddress
   }
   })
   .then(response => { //This is an arrow function
     alert("Create new patient success !! ")
     this.props.history.push('/');
       });
}


    componentDidMount() {

    }


  render() {

    return (
      <div className="mainPatient" >
        <div>
        <label>Name : </label>
        <input class="pass" name="name" type="text"  placeholder="Name"  onChange={this.onChange}></input>

        <label>Anddress : </label>
        <input class="pass" type="text" name="anddress"  placeholder="Anddress"  onChange={this.onChange}></input>

        <label>Birthdate : </label><br></br>
        <input class="pass" type="date" name="birthdate" placeholder="Birthdate"  onChange={this.onChange}></input>
  <br></br>
        <label>Gender : </label>
        <select onChange={this.onChange} name="gender"className="custom-select">
    <option value="1">Male</option>
    <option value="2">Female</option>
  </select>
        <button className="buttonDialog"  type="submit" value="Login" onClick={this.submit}>Submit</button>

        </div>
      </div>





    );
}
}

export default Patient;
