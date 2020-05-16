import './doc_login.css'
import React, {Component} from 'react';
import getWeb3 from "../getWeb3";
import RecordContract from "../contracts/Record.json";
import { geolocated } from "react-geolocated";

class patient_login extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentView: "signUp"
    }
  }

  state = {  web3: null, accounts: null, contract: null, username: null, password: null, address: null, lat:'',long:''};

  componentDidMount = async () => {
    var lat=''
    var long=''
    navigator.geolocation.getCurrentPosition(function(position) {
    lat=position.coords.latitude;
    long=position.coords.longitude;
    });
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = RecordContract.networks[networkId];
      const instance = new web3.eth.Contract(
        RecordContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance, lat, long });
      
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };  
  handleSubmit_pat = async (e) =>{
    e.preventDefault();
    const { accounts, contract } = this.state;
    console.log(this.state)
    const body={
      username:this.state.username,
      address:this.state.address,
      password:this.state.password,
      
      lat:this.state.lat,
      long:this.state.long
    }
    console.log(this.state.lat)
    console.log(this.state.long)

    await this.state.contract.methods.addUser(body.username,body.password,body.address,'True',body.lat.toString(),body.long.toString()).send({ from: this.state.accounts[0] })
    // Get the value from the contract to prove it worked.
   const response = await this.state.contract.methods.find_user_name(body.address).call();
    console.log(response)
  
  }

   handleSubmit_pat_signin = async (e) =>{
    e.preventDefault();
      const body={
      username:this.state.username,
      address:this.state.address,
      password:this.state.password
    }
   // await this.state.contract.methods.addDoctor(body.username,body.password,body.address,'True').send({ from: this.state.accounts[0] })
    const name = await this.state.contract.methods.find_user_name(body.address).call();
    const password = await this.state.contract.methods.find_user_password(body.address).call();
    console.log(name)
    console.log(password)
    console.log(body.username)
    console.log(body.password)
    if(name==body.username && password==body.password)
    {
      console.log("Correct")
      alert("Successful")
      window.location.href="home"
    }
    else
    {
      console.log("Fail")
      alert("Wrong Password or Username")
    }
  }

   handleaddress = (e) =>{
    this.setState({
      [e.target.id]:e.target.value
    })
    console.log(this.state)
   } 

 handlepassword = (e) =>{
  this.setState({
    [e.target.id]:e.target.value
  })
 } 

 handleusername = (e) =>{
  this.setState({
    [e.target.id]:e.target.value
  })
 } 
  

  changeView = (view) => {
    this.setState({
      currentView: view
    })
  }

  currentView = () => {
    switch(this.state.currentView) {
      case "signUp":
        return (
            <div id="app">
          <form>
            <h2 className="dheading">Sign Up!</h2>
            <fieldset>
              <legend>Create Account</legend>
              <ul>
                <li>
                  <label for="username"> Patient Name:</label>
                  <input type="text" id="username" onChange={(e) => this.handleusername(e)} required/>
                </li>
                <li>
                  <label for="address">Patient Address:</label>
                  <input type="text" id="address" onChange={(e)=>this.handleaddress(e)} required/>
                </li>
                <li>
                  <label for="password">Password:</label>
                  <input type="password" id="password" onChange={(e) =>this.handlepassword(e)} required/>
                </li>
              </ul>
            </fieldset>
            <button className="dbtn" onClick={(e) => this.handleSubmit_pat(e)}>Submit</button>
            <button className="dbtn" type="button" onClick={ () => this.changeView("logIn")}>Have an Account?</button>
          </form>
          </div>
        )
        break
      case "logIn":
        return (
          <form>
            <h2 className="dheading">Welcome Back!</h2>
            <fieldset>
              <legend>Log In</legend>
              <ul>
                <li>
                  <label for="username">Username:</label>
                  <input type="text" id="username" onChange={(e) => this.handleusername(e)} required/>
                </li>
                 <li>
                  <label for="password">Address:</label>
                  <input type="text" id="address" onChange={(e)=>this.handleaddress(e)} required/>
                </li>
                <li>
                  <label for="password">Password:</label>
                  <input type="password" id="password" onChange={(e) =>this.handlepassword(e)} required/>
                </li>
               
              </ul>

            </fieldset>
            <button className="dbtn" onClick={(e) =>this.handleSubmit_pat_signin(e)}>Login</button>
            <button className="dbtn" type="button" onClick={(e) =>this.handleSubmit_pat(e)}>Create an Account</button>
          </form>
        )
        break
     
      default:
        break
    }
  }


  render() {
    return (
      <section className="sec">
        {this.currentView()}
      </section>
    )
  }
}

export default patient_login;