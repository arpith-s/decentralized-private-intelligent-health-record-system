import React, { Component } from 'react';
import Labrecord from './Labrecord'
import Login from './Login'
import "./pat.css";
import ipfs from '../ipfs'
import {Card ,Table, DropdownButton,Dropdown,Modal, CardDeck,Form,Button} from 'react-bootstrap';
import { BrowserRouter, Route } from 'react-router-dom'
import { Multiselect } from "multiselect-react-dropdown";
import Navbar from './Navbar'
import { MultiSelect } from '@progress/kendo-react-dropdowns';
import RecordContract from "../contracts/Record.json";
import getWeb3 from "../getWeb3";
import ReactTable from 'react-table-6'

class pat_access extends Component{
    
  constructor(props) {
    super(props);
    this.state = {
      address:'None'
    }
  }
  state = {  web3: null, accounts: null, contract: null, username: null, password: null, address: null, lat:'',long:''};

  componentDidMount = async () => {
    
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
      this.setState({ web3, accounts, contract: instance });
      const response = await this.state.contract.methods.showPermission(this.state.accounts[0]).call();
      this.setState({address:response})
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
    console.log(this.state)
  };
  handleGrant= async (e)=>{
    //your code 
    e.preventDefault();
    await this.state.contract.methods.addPermission(this.state.accounts[0],this.state.address).send({ from: this.state.accounts[0] })

  
   } 
   handleReject= async (e)=>{
    //your code 
    e.preventDefault();
    await this.state.contract.methods.removePermission(this.state.accounts[0],this.state.address).send({ from: this.state.accounts[0] })

  
   } 
          
     
render(){
    return(
        <div>
            <Navbar/>
            <h4 align="center" className="h1-style">Do you want to give access to</h4>
            <h4 align="center">{this.state.address}?</h4>       
            <button className="acc" onClick={(e)=>this.handleGrant(e)}>Grant Access</button>
            <br></br>
            <br></br>
            <button className="remove" onClick={(e)=>this.handleReject(e)}>Cancel Access</button>
            
        </div>
    )
}
}
export default pat_access;