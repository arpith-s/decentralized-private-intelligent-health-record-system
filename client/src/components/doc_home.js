import React, { Component } from 'react';
import './doc_homy.css'
import ipfs from '../ipfs'
import { MDBInput } from "mdbreact";
import {Card ,CardBody, Table, DropdownButton,Dropdown,Modal, CardDeck, Button } from 'react-bootstrap';
import { Chart } from "react-google-charts";
import { Multiselect } from "multiselect-react-dropdown";
import DNavbar from './DNavbar'
import doc_activity from './doc_activity'
import doc_labrecord from './doc_labrecord'
import Login from './Login'
import getWeb3 from "../getWeb3";
import RecordContract from "../contracts/Record.json";
import { BrowserRouter, Route } from 'react-router-dom'
import { MultiSelect } from '@progress/kendo-react-dropdowns';
import { CardHeader } from '@material-ui/core';
const symptoms = [ "Vommiting", "Headache", "Fever", "Common cold", "Tonsils", "Cough"];

class doc_home extends Component{


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
      record:{

      patname:'',
      docaddr:'',
      add_date:'',
      disease:[],
      symptom:[],
      medicines:[],
      plainArray: ["headache", "vommiting", "throught pain", "bodyache", "stomach pain"],
      },
      heart_disease:{
        age:Number,
        sex:Number,
        cp:Number,
        trestbps:Number,
        chol:Number,
        fbs:Number,
        restecg:Number,
        thalach:Number,
        exang:Number,
        oldpeak:Number,
        slope:Number,
        ca:Number,
        thal:Number,
      },
      kidney_disease:{
        age:Number,
      bp:Number,
      sg:Number,
      al:Number,
      su:Number,
      rbc:Number,
      pc:Number,
      pcc:Number,
      ba:Number,
      bgr:Number,
      bu:Number,
      sc:Number,
      sod:Number,
      pot:Number,
      hemo:Number,
      pcv:Number,
      wc:Number,
      rc:Number,
      htn:Number,
      dm:Number,
      cad:Number,
      appet:Number,
      pe:Number,
      ane:Number
      },
      liver_disease:{
        age:Number,
        gender:Number,
        tb:Number,
        db:Number,
        ap:Number,
        aa:Number,
        asa:Number,
        tp:Number,
        alb:Number,
        ag:Number
      }
      
    };
  }
  handleSubmit = async (e) =>{
    e.preventDefault();
    console.log(this.state.address)
    const heart = await this.state.contract.methods.getheart(this.state.address).call()
    const liver = await this.state.contract.methods.getLiver(this.state.address).call()
    const kidney = await this.state.contract.methods.getKidney(this.state.address).call()

      if(heart.length>3){

    await ipfs.get(heart)
    .then(res=>{
     // console.log(JSON.parse(res[0].content))
      this.setState({
          heart_disease:JSON.parse(res[0].content)    
      })
    })
      }

      if(liver.length>3){
        await ipfs.get(liver)
      .then(res=>{
       // console.log(JSON.parse(res[0].content))
        this.setState({
          liver_disease:JSON.parse(res[0].content)    
        })
      })

      }
      
      if(kidney.length>3){
        await ipfs.get(kidney)
      .then(res=>{
       // console.log(JSON.parse(res[0].content))
        this.setState({
          kidney_disease:JSON.parse(res[0].content)    
        })
      })
      }
      
      const response = await this.state.contract.methods.getId(this.state.address).call()
      const responsenum = await this.state.contract.methods.getRecordCountPatient(response).call()
      const record = await this.state.contract.methods.getRecord(this.state.address,responsenum).call()
      
      if(record.length>3){
        await ipfs.get(record)
      .then(res=>{
       // console.log(JSON.parse(res[0].content))
        this.setState({
          record:JSON.parse(res[0].content)    
        })
      })
      
      }
      
      console.log(this.state)
  } 

  handleChange =(e) =>{
    
    this.setState({
      address:e.target.value
    })
    
    
  }

  render(){
    const { plainArray, objectArray, selectedValues } = this.state;

  return(
    <div>
    <BrowserRouter>
      <DNavbar/>
      <Route path='/doc_activity' component={doc_activity} />
      <Route path='/doc_labrecord' component={doc_labrecord} />
      
      </BrowserRouter>
      
    <div className="entire-page">

<Card>
  <Card.Header>Plaese enter the address</Card.Header>
  <Card.Body>
    <input type="text"  onChange={(e)=>this.handleChange(e)}></input>
    <Button className="s-btn" onClick={(e) =>this.handleSubmit(e)}>Submit</Button>
  </Card.Body>
</Card>

    <CardDeck>
            
  <br />

  <Card border="secondary" style={{ width: '18rem' }}>
    <Card.Header>Prescription of last checkup</Card.Header>
    <Card.Body>
    <Table>
        <tr>
        <td>Patient's Address:</td>
        <td>{this.state.record.patname}</td>
        </tr>
        <tr>
        <td>Doctor's Address:</td>
        <td>{this.state.record.docaddr}</td>
        </tr><tr>
        <td>Admission Date:</td>
        <td>{this.state.record.add_date}</td>
        </tr>
        <tr>
        <td>Possible Symptoms:</td>
        <td>{this.state.record.symptom}</td>
        </tr>
        <tr>
        <td>Disease Predicted:</td>
        <td>{this.state.record.disease}</td>
        </tr>
        <tr>
        <td>Possible Medicines:</td>
        <td>{this.state.record.medicines}</td>
        </tr>
      </Table>
    </Card.Body>
  </Card> 
  <br />
              </CardDeck>
{/* This is for all lab records for various disease checks */}
<Card>
  <Card.Header>Lab Reports</Card.Header>
  <Card.Body>
  <CardDeck>
  <Card border="secondary" style={{ width: '18rem' }}>
    <Card.Header>Heart disease report</Card.Header>
    <Card.Body>
    <Table>
        <tr>
        <td>age -></td>
        <td>{this.state.heart_disease.age}</td>
        </tr>
        <tr>
        <td>sex -> </td>
        <td>{this.state.heart_disease.sex}</td>
        </tr><tr>
        <td>cp -> </td>
        <td>{this.state.heart_disease.cp}</td>
        </tr>
        <tr>
        <td>trestbps -></td>
        <td>{this.state.heart_disease.trestbps}</td>
        </tr>
        <tr>
        <td>chol -> </td>
        <td>{this.state.heart_disease.chol}</td>
        </tr>
        <tr>
        <td>fbs -></td>
        <td>{this.state.heart_disease.fbs}</td>
        </tr>
        <tr>
        <td>restecg -></td>
        <td>{this.state.heart_disease.restecg}</td>
        </tr>
        <tr>
        <td>thalach ->   </td>
        <td>{this.state.heart_disease.thalach}</td>
        </tr>
        <tr>
        <td> exang ->  </td>
        <td>{this.state.heart_disease.exang}</td>
        </tr>
        <tr>
        <td>oldpeak ->    </td>
        <td>{this.state.heart_disease.oldpeak}</td>
        </tr>
        <tr>
        <td>slope ->   </td>
        <td>{this.state.heart_disease.slope}</td>
        </tr>
        <tr>
        <td>ca ->    </td>
        <td>{this.state.heart_disease.ca}</td>
        </tr>
        <tr>
        <td>thal ->   </td>
        <td>{this.state.heart_disease.thal}</td>
        <td>{}</td>
        </tr>
      </Table>
    </Card.Body>
  </Card>
  
  <br />

  <Card border="secondary" style={{ width: '18rem' }}>
    <Card.Header>Chronic kidney disease report</Card.Header>
    <Card.Body>
    <Table>
        <tr>
        <td>age -></td>
        <td>{this.state.kidney_disease.age}</td>
        </tr>
        <tr>
        <td>bp -> </td>
        <td>{this.state.kidney_disease.bp}</td>
        </tr><tr>
        <td>sg -> </td>
        <td>{this.state.kidney_disease.sg}</td>
        </tr>
        <tr>
        <td>al -></td>
        <td>{this.state.kidney_disease.al}</td>
        </tr>
        <tr>
        <td>su -> </td>
        <td>{this.state.kidney_disease.su}</td>
        </tr>
        <tr>
        <td>rbc -></td>
        <td>{this.state.kidney_disease.rbc}</td>
        </tr>
        <tr>
        <td>pc -></td>
        <td>{this.state.kidney_disease.pc}</td>
        </tr>
        <tr>
        <td>pcc ->   </td>
        <td>{this.state.kidney_disease.pcc}</td>
        </tr>
        <tr>
        <td> ba ->  </td>
        <td>{this.state.kidney_disease.ba}</td>
        </tr>
        <tr>
        <td>bgr ->    </td>
        <td>{this.state.kidney_disease.bgr}</td>
        </tr>
        <tr>
        <td>bu ->   </td>
        <td>{this.state.kidney_disease.bu}</td>
        </tr>
        <tr>
        <td>sc ->    </td>
        <td>{this.state.kidney_disease.sc}</td>
        </tr>
        <tr>
        <td>sod ->   </td>
        <td>{this.state.kidney_disease.sod}</td>
        </tr>
        <tr>
        <td>pot ->   </td>
        <td>{this.state.kidney_disease.pot}</td>
        </tr><tr>
        <td>hemo ->   </td>
        <td>{this.state.kidney_disease.hemo}</td>
        </tr><tr>
        <td>pcv ->   </td>
        <td>{this.state.kidney_disease.pcv}</td>
        </tr><tr>
        <td>wc ->   </td>
        <td>{this.state.kidney_disease.wc}</td>
        </tr><tr>
        <td>rc ->   </td>
        <td>{this.state.kidney_disease.rc}</td>
        </tr><tr>
        <td>htn ->   </td>
        <td>{this.state.kidney_disease.htn}</td>
        </tr><tr>
        <td>dm ->   </td>
        <td>{this.state.kidney_disease.dm}</td>
        </tr><tr>
        <td>cad ->   </td>
        <td>{this.state.kidney_disease.cad}</td>
        </tr><tr>
        <td>appet ->   </td>
        <td>{this.state.kidney_disease.appet}</td>
        </tr><tr>
        <td>pe ->   </td>
        <td>{this.state.kidney_disease.pe}</td>
        </tr><tr>
        <td>ane ->   </td>
        <td>{this.state.kidney_disease.ane}</td>
        </tr>
      </Table>
    </Card.Body>
  </Card>
  <br/>
  <Card border="secondary" style={{ width: '18rem' }}>
    <Card.Header>Liver disease report</Card.Header>
    <Card.Body>
    <Table>
        <tr>
        <td>age -></td>
        <td>{this.state.liver_disease.age}</td>
        </tr>
        <tr>
        <td>gender -> </td>
        <td>{this.state.liver_disease.gender}</td>
        </tr><tr>
        <td>tb -> </td>
        <td>{this.state.liver_disease.tb}</td>
        </tr>
        <tr>
        <td>db -></td>
        <td>{this.state.liver_disease.db}</td>
        </tr>
        <tr>
        <td>ap -> </td>
        <td>{this.state.liver_disease.ap}</td>
        </tr>
        <tr>
        <td>aa -></td>
        <td>{this.state.liver_disease.aa}</td>
        </tr>
        <tr>
        <td>asa -></td>
        <td>{this.state.liver_disease.asa}</td>
        </tr>
        <tr>
        <td>tp ->   </td>
        <td>{this.state.liver_disease.tp}</td>
        </tr>
        <tr>
        <td> alb ->  </td>
        <td>{this.state.liver_disease.alb}</td>
        </tr>
        <tr>
        <td>ag ->    </td>
        <td>{this.state.liver_disease.ag}</td>
        </tr>
        
      </Table>
    </Card.Body>
  </Card>
  </CardDeck>
  </Card.Body>
</Card>

    </div>
      </div>
    )
}
}
export default doc_home;
