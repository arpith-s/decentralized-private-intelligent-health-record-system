import React, { Component } from 'react';
import './doc_homy.css'
import ipfs from '../ipfs'
import { MDBInput } from "mdbreact";
import {Card ,Form,DropdownButton,Dropdown,Modal, CardDeck,Button} from 'react-bootstrap';
import { Chart } from "react-google-charts";
import { Multiselect } from "multiselect-react-dropdown";
import DNavbar from './DNavbar'

import doc_labrecord from './doc_labrecord'
import Login from './Login'
import getWeb3 from "../getWeb3";
import RecordContract from "../contracts/Record.json";
import { BrowserRouter, Route } from 'react-router-dom'
import { MultiSelect } from '@progress/kendo-react-dropdowns';
const symptoms = [ "Vommiting", "Headache", "Fever", "Common cold", "Tonsils", "Cough"];

class doc_activity extends Component{


  state = {  web3: null, accounts: null, contract: null, username: null, password: null, address: null};

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
  };  
  constructor(props) {
    super(props);
    this.state = {
      patname:'',
      docaddr:'',
      add_date:'',
      disease:[],
      symptoms:[],
      medicines:[],
      plainArray: ["headache", "vommiting", "throught pain", "bodyache", "stomach pain"],
      
    };
    this.style = {
      chips: {
        background: "red"
      },
      searchBox: {
        border: "none",
        "border-bottom": "1px solid blue",
        "border-radius": "0px"
      },
      multiselectContainer: {
        color: "red"
      }
    };
    this.addItem = this.addItem.bind(this);
  }
  addItem() {
    this.selectedValues.push({ key: "Option 3", cat: "Group 1" });
  }


patname = (e) =>{
    this.setState({
      [e.target.id]:e.target.value
    })
    console.log(this.state)
   }
   
   
docaddr = (e) =>{
    this.setState({
      [e.target.id]:e.target.value
    })
    console.log(this.state)
   }   

add_date = (e) =>{
    this.setState({
      [e.target.id]:e.target.value
    })
    console.log(this.state)
   } 

disease = (e) =>{
    this.setState({
      [e.target.id]:e.target.value
    })
    console.log(this.state)
   } 

medicines = (e) =>{
    this.setState({
      [e.target.id]:e.target.value
    })
    console.log(this.state)
   } 

handlesymptoms = (e) =>{
  this.setState({
    symptoms: [e.target.value ]
});
console.log(e.target.value)
}


handleSubmit_doc_home = async (e) =>{
    e.preventDefault();
      
   const diseases=this.state.disease;
   //const diseases=disease.split(",");
  // console.log(diseases) 
    
   const medicine=this.state.medicines;
   //const medicine=medicines.split(",");
   //console.log(medicine) 
   
   const ad_date=this.state.add_date;
   const add_date=new Date(ad_date).getTime()
   const unix_time=Math.floor(add_date/1000)
   //onsole.log(unix_time)
   const symptom=this.state.symptoms.join(",")
   const body= {
      patname:this.state.patname,
      docaddr:this.state.docaddr,
      add_date:unix_time,
      disease:diseases,
      medicines:medicine ,
      symptom:symptom
    }
    console.log(body)
    //console.log(this.state.patname);
    //console.log(this.state.docaddr)
    //console.log(this.state.add_date);
    //console.log(this.state.disease);
    //console.log(this.state.medicines);
   // console.log(this.state.symptoms)
  //  console.log(body)
    //console.log(this.state.accounts[0])

    await ipfs.files.add(Buffer.from(JSON.stringify(body)))
  .then(res => {
    const hash = res[0].hash
    console.log('added data hash:', hash)
    this.setState({
      getHash:hash
    })
    return ipfs.files.cat(hash)
  })
  .then(output => {
    console.log('data : ',output)
    console.log('retrieved data:', JSON.parse(output))
  })
  await ipfs.get(this.state.getHash)
  .then(res=>{
    console.log(JSON.parse(res[0].content))
  })

    try {
     const s= await this.state.contract.methods.addRecord(this.state.patname,this.state.accounts[0],this.state.getHash).send({ from: this.state.accounts[0]})
    console.log(s);
      
    } catch (error) {
      console.log("Error ::::",error)
    }

    
  
   // console.log("Done")
    
    
   // const response = await this.state.contract.methods.getRecord(body.patname,0).call();
   // console.log(response)
}

  render(){
    const { plainArray, objectArray, selectedValues } = this.state;

  return(
    <div>
     
      <DNavbar/>
      
        <div className="entire-page">
           <Form>
  <Form.Group>
    <Form.Label>Patient Address</Form.Label>
    <Form.Control type="text" id="patname" name="patname" placeholder="Enter Patient's Address" onChange={(e) => this.patname(e)} required/>
    
  </Form.Group>

  <Form.Group>
    <Form.Label>Doctor Address</Form.Label>
    <Form.Control type="text" id="docaddr" name="docaddr" placeholder="Enter Doctor's Address" onChange={(e) => this.docaddr(e)} required/>
    
  </Form.Group>


  <Form.Group>
    <Form.Label>Admission Date</Form.Label>
    <Form.Control type="date" id="add_date" name="add_date" placeholder="Enter the date" onChange={(e) => this.add_date(e)}/>
  </Form.Group>  <Form.Group>
    
{/* <Multiselect options={plainArray} isObject={false} />   */}
<div className="example-wrapper">
                <div>
                    <div>Possible symptoms:</div>
                    <MultiSelect className="multii"
                        data={symptoms}
                        onChange={this.handlesymptoms}
                        value={this.state.value}
                    />
                </div>
            </div></Form.Group>

  <br/>
    <Form.Group>
    <Form.Label>Diaognized Diseases(Seperated by comma)</Form.Label>
    <Form.Control type="text" placeholder="Enter Diseases Names seperated by comma" id="disease" name="disease" onChange={(e) => this.disease(e)}/>
    
  </Form.Group>

  <br/>
    <Form.Group>
    <Form.Label>Please enter the prescribed medicines(Seperated by comma)</Form.Label>
    <Form.Control type="text" placeholder="Enter medicines seperated by comma" id="medicines" name="medicines" onChange={(e) => this.medicines(e)}/>
    
  </Form.Group>

  
  <br/>
  <Button variant="primary" type="submit" onClick={(e) =>this.handleSubmit_doc_home(e)}>
    Submit
  </Button>
 
</Form>
</div>
</div>
    )
}
}
export default doc_activity;
