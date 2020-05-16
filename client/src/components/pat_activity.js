import React, { Component } from 'react';
import Labrecord from './Labrecord'
import Login from './Login'
import "./main.css";
import ipfs from '../ipfs'
import {Card ,Table, DropdownButton,Dropdown,Modal, CardDeck,Form,Button} from 'react-bootstrap';
import { BrowserRouter, Route } from 'react-router-dom'
import { Multiselect } from "multiselect-react-dropdown";
import Navbar from './Navbar'
import { MultiSelect } from '@progress/kendo-react-dropdowns';
import RecordContract from "../contracts/Record.json";
import getWeb3 from "../getWeb3";
import ReactTable from 'react-table-6'

import axios from 'axios'
class pat_activity extends Component{
   

  constructor(props) {
    super(props);

    this.state = {  web3: null, accounts: null, contract: null, username: null, password: null, address: null,records:[],outbreak:null }; 
  
  }
//records_list=this.state.records



  
  
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
      this.setState({ web3, accounts, contract: instance }, this.runExample);
      console.log(this.state)
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }

    
  };  



  // handle_table = ({records_list}) => {
  //   const record = this.state.records.length ? (
  //     records_list.map(record => 
  //       {
  //         return(
  //           <p>{record.symptom}</p>
  //         )
  //       })
  //   ):(
  //     <p>Loading</p>
  //   )
  //     }








  runExample = async () => {
    const { accounts, contract } = this.state;


  
   console.log(this.state.accounts[0])

    // Get the value from the contract to prove it worked.
   const response = await contract.methods.getId(accounts[0]).call()
    const responsenum = await contract.methods.getRecordCountPatient(response).call()
    for(var i=1;i<=responsenum;i++)
    {
      const record = await contract.methods.getRecord(accounts[0],i).call()
      console.log(record)
       await ipfs.get(record)
      .then(res=>{
        console.log(JSON.parse(res[0].content))
        this.state.records.push(JSON.parse(res[0].content))
      })
    
    }
    
    console.log(response)
  console.log(responsenum)
  console.log(this.state.records)
  this.forceUpdate();

  // for(var i=0;i<responsenum-1;i++){
  //   console.log(this.state.records[i].symptom)
  // }  
 
    // Update state with the result.
    //this.setState({ storageValue: response });
  };
 




    render(){
      
      const  posts  = this.state.records
      const postList = posts.length ? (
        posts.map(post => {
          var date= new Date(post.add_date*1000);
         
           

            // Will display time in 10:30:23 format
            var formattedTime = date.getUTCDate()+'/'+date.getUTCMonth()+'/'+date.getUTCFullYear();

           
          return (
          
            
            
            
            
            <div className="post card" key={post.id}>
              <div className="card-content">
                <span className="card-title">Date : {formattedTime}</span>
                <p>Medicine : {post.medicines}</p>
                <p>Symptoms : {post.symptom}</p>
                <p>Disease : {post.disease}</p>
              </div>
            </div>
          
          )
        })
      ) : (
        <div >Loading</div>
      );
  
      return (
        <div>
           
                <Navbar/>
           
          <div className="container">
            <h4 className="center">Home</h4>
            <br/><br/><br/>
            {postList}
          </div>
        </div>
      )
    }
}


export default pat_activity;