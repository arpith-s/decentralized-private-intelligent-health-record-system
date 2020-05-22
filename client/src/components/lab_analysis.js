import React, { Component } from 'react';
import {Card, CardDeck, Button} from 'react-bootstrap';
import './lba.css'
import { Chart } from "react-google-charts";
import { Multiselect } from "multiselect-react-dropdown";
import Navbar from './Navbar'
import pat_activity from './pat_activity'
import Labrecord from './Labrecord'
import Login from './Login'
import doc_login from './doc_login'
import { BrowserRouter, Route } from 'react-router-dom'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import axios from 'axios'
import L from 'leaflet'
import ipfs from '../ipfs'
import getWeb3 from "../getWeb3";
import RecordContract from "../contracts/Record.json";
class lab_analysis extends Component{
    
    state = {  web3: null, accounts: null, contract: null, username: null, password: null, address: null};

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


  runExample = async () => {
    const { accounts, contract } = this.state;
   console.log(this.state.accounts[0])

    // Get the value from the contract to prove it worked.
   const Kidney = await contract.methods.getKidney(accounts[0]).call()
    const Liver = await contract.methods.getLiver(accounts[0]).call()
    const Heart = await contract.methods.getheart(accounts[0]).call()
    
    if(Kidney.length>3){
        await ipfs.get(Kidney)
      .then(res=>{
        console.log(JSON.parse(res[0].content))
        this.setState({
            kidney_disease:{
                test_result:JSON.parse(res[0].content).answer.prediction,
                Probablity:JSON.parse(res[0].content).answer.probability

            }
        })
        console.log(this.state)
        //this.state.push(JSON.parse(res[0].content))
      })
    }
       if(Liver.length>3){
        await ipfs.get(Liver)
      .then(res=>{
        console.log(JSON.parse(res[0].content))
        this.setState({
            liver_disease:{
                test_result:JSON.parse(res[0].content).answer.prediction,
                Probablity:JSON.parse(res[0].content).answer.probability

            }
        })
        //this.state.push(JSON.parse(res[0].content))
      })
       }
      
       if(Heart.length>3){
        await ipfs.get(Heart)
      .then(res=>{
        console.log(JSON.parse(res[0].content))
        this.setState({
            heart_disease:{
                test_result:JSON.parse(res[0].content).answer.prediction,
                Probablity:JSON.parse(res[0].content).answer.probability

            }
        })
        //this.state.push(JSON.parse(res[0].content))
      })
       }
      
  }
    

    constructor(props) {
        super(props);
        this.state = {
            heart_disease:{
                test_result:'Loading',
                Probablity:Number,

            },
            kidney_disease:{
                test_result:'Loading',
                
                Probablity:Number
            },
            liver_disease:{
                test_result:'Loading',
                Probablity:Number
            }

          }
        };
    
    
    
    
    
    goback = (e) =>{
        e.preventDefault();
      
          window.location.href='Labrecord';
      
          
      }
render(){
    return(
        <div>
            <Navbar/>
                <CardDeck className="lba">
                    <Card>
                        <Card.Header>
                            Heart Disease
                        </Card.Header>
                        <Card.Body>
                        <b>Test results:</b> {this.state.heart_disease.test_result}
                        <br></br>
                        <b>Probablity:</b>{this.state.heart_disease.Probablity}
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Header>
                            Kidney Disease
                        </Card.Header>
                        <Card.Body>
                        <b>Test results:</b>{this.state.kidney_disease.test_result}
                        <br></br>
                        <b>Probablity:</b>{this.state.kidney_disease.Probablity}
                        </Card.Body>
                    </Card><Card>
                        <Card.Header>
                            Liver disease
                        </Card.Header>
                        <Card.Body>
                        <b>Test results:</b> {this.state.liver_disease.test_result} 
                        <br></br>
                        <b>Probablity:</b>{this.state.liver_disease.Probablity}
                        </Card.Body>
                    
                    </Card>
                
                </CardDeck>
               <br></br>
               <br></br>
               
                <Button className="go-back" onClick={(e) =>this.goback(e)}>Go Back</Button>
        </div>
    )
};
}

export default lab_analysis;