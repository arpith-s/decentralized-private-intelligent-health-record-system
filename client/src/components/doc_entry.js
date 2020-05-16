import React, { Component } from 'react';
import Labrecord from './Labrecord'
import Login from './Login'
import "./dc.css";
import ipfs from '../ipfs'
import {Card ,Table, DropdownButton,Dropdown,Modal, CardDeck,Form,Button} from 'react-bootstrap';
import { BrowserRouter, Route } from 'react-router-dom'
import { Multiselect } from "multiselect-react-dropdown";
import Navbar from './Navbar'
import { MultiSelect } from '@progress/kendo-react-dropdowns';
import RecordContract from "../contracts/Record.json";
import getWeb3 from "../getWeb3";
import ReactTable from 'react-table-6'

class doc_entry extends Component{

  constructor(props) {
    super(props);
    this.state = {
      address:'',
      verify:true
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
      
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
    console.log(this.state)
  };
    
    handleSubmit_doc = (e) =>{
        e.preventDefault();
      
          window.location.href='doc_home';
      
          
      }

     handleSubmit= async (e)=>{
       //your code 
       console.log(this.state.address)
       e.preventDefault();
       await this.state.contract.methods.askPermission(this.state.address,this.state.accounts[0]).send({ from: this.state.accounts[0] })
   
     
      } 

      handleChange =(e) =>{
        console.log(e.target.value)
        this.setState({
          address:e.target.value
        })
        console.log(this.state.address)
        
      }
      

      handlecheck = async (e) =>{

        const val = await this.state.contract.methods.gotPermission(this.state.address,this.state.accounts[0]).call();

        if(val==true){
        alert("You have access now!")
        window.location.href='doc_home';
      
        e.preventDefault();
        
      }
        else{
          alert("Sorry!! No Acess")
        }

      }
      
    



render(){
    return(
        <div>
            
   <h4 align="center" className="h6-design"><b> Please enter the patient's address</b></h4>
   <div className="inp-design">
   <input type="text"  onChange={(e)=>this.handleChange(e)}></input></div>
  <Button className="btn-design1" onClick={(e)=>this.handleSubmit(e)}>Submit</Button>
  <br/><br/>
  <Button className="btn-design2" onClick={(e)=>this.handlecheck(e)}>Check</Button>

        </div>
    )
}
}
export default doc_entry;