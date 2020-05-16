import React, { Component } from 'react';
import Labrecord from './Labrecord'
import Login from './Login'
import {Card ,Button} from 'react-bootstrap';
import {Input,Label} from 'reactstrap'
import { BrowserRouter, Route } from 'react-router-dom'
import Axios from 'axios'
import DNavbar from './DNavbar'
import getWeb3 from "../getWeb3";
import RecordContract from "../contracts/Record.json";
import ipfs from '../ipfs'
class liver_disease extends Component{
  

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
          age:Number,
          gender:Number,
          tb:Number,
          db:Number,
          ap:Number,
          aa:Number,
          asa:Number,
          tp:Number,
          alb:Number,
          ag:Number,
          p_address:'',
          answer:{
            prediction:'',
            probability:''
          }
        };
      }
      handleChange =(e) =>{
        console.log(e.target.value)
        this.setState({
          [e.target.id]:e.target.value
        })
        
      }

      goback = (e) =>{
        e.preventDefault();
      
          window.location.href='doc_labrecord';
      
          
      }


      onsubmit = async (e)=>{
        const body={
            age:this.state.age,
            gender:this.state.gender,
            tb:this.state.tb,
            db:this.state.db,
            ap:this.state.ap,
            aa:this.state.aa,
            asa:this.state.asa,
            tp:this.state.tp,
            alb:this.state.alb,
            ag:this.state.ag
        }
        await Axios.post('https://cbmh-ml.herokuapp.com/apis/liverdisease/', body).then(res=>{
          this.setState({
            answer:res.data
          })

          body.answer=res.data
            console.log(res);
            console.log(res.data)
          })
          
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
    
  console.log(this.state.p_address)
      try {
       const s= await this.state.contract.methods.addLiver(this.state.p_address,this.state.getHash).send({ from: this.state.accounts[0]})
      console.log(s);
        
      } catch (error) {
        console.log("Error ::::",error)
      }

        console.log(this.state)
      }



render(){    
    return(
      <div> 
      <div> 
          <DNavbar/>
          <div className="heart">
          <Card>
            <Card.Header><b>Liver disease Check</b></Card.Header>
            <Card.Body>
            <div class="form-group row">
  <h6 class="col-sm-2 col-form-label">Patient's Address :</h6>
  <div class="col-sm-10">
  <input type="text" id="p_address"  onChange={(e)=>this.handleChange(e)}/>
  </div>
  </div>      
  <div class="form-group row">
  <h6 class="col-sm-2 col-form-label">Patient's Age :</h6>
  <div class="col-sm-10">
  <input type="text" id="age"  onChange={(e)=>this.handleChange(e)}/>
  </div>
  <div class="col-sm-10">
  <h6>Patient's sex:</h6>
  <label><input type="radio" name="gender" id="gender" value="1" onChange={(e)=>this.handleChange(e)}/>Male</label><br/>
  <label><input  type="radio" name="gender" id="gender"  value="0" onChange={(e)=>this.handleChange(e)}/>female</label>
  </div>
  </div>

  <div class="form-group row">
  <h6 class="col-sm-2 col-form-label">Total Bilirubin:</h6>
  <div class="col-sm-10">
  <input type="Number" id="tb" onChange={(e)=>this.handleChange(e)}/>
  </div>
  </div>

  <div class="form-group row">
  <h6 class="col-sm-2 col-form-label">Direct Bilirubin:</h6>
  <div class="col-sm-10">
  <input type="text" id="db"  onChange={(e)=>this.handleChange(e)}/>
  </div>
  </div>     

  <div class="form-group row">
  <h6 class="col-sm-2 col-form-label">Alkaline Phosphotase:</h6>
  <div class="col-sm-10">
  <input type="text" id="ap"  onChange={(e)=>this.handleChange(e)}/>
  </div>
  </div>    
           
  <div class="form-group row">
  <h6 class="col-sm-2 col-form-label">Alamine Aminotransferace:</h6>
  <div class="col-sm-10">
  <input type="text" id="aa"  onChange={(e)=>this.handleChange(e)}/>
  </div>
  </div>          
           
  <div class="form-group row">
  <h6 class="col-sm-2 col-form-label">Aspartate Aminotransferace:</h6>
  <div class="col-sm-10">
  <input type="text" id="asa" onChange={(e)=>this.handleChange(e)}/>
  </div>
  </div>          
            
  <div class="form-group row">
  <h6 class="col-sm-2 col-form-label">Total Proteins:</h6>
  <div class="col-sm-10">
  <input type="number" id="tp"  min="0" max="2" onChange={(e)=>this.handleChange(e)}/>
  </div>
  </div>          
           
  <div class="form-group row">
  <h6 class="col-sm-2 col-form-label">Albumin:</h6>
  <div class="col-sm-10">
  <input type="number" id="alb"  min="0" max="2" onChange={(e)=>this.handleChange(e)}/>
  </div>
  </div>          
           
  <div class="form-group row">
  <h6 class="col-sm-2 col-form-label">Albumin and Globulin Ratio:</h6>
  <div class="col-sm-10">
  <input type="text" id="ag" onChange={(e)=>this.handleChange(e)}/>
  </div>
  </div>          
  
   
            <Button className="predict-bttn" onClick={(e)=>this.onsubmit(e)}>Check it</Button>
            <Button className="predict-bttn" onClick={(e) =>this.goback(e)}>Go Back</Button>
            </Card.Body>
          </Card>

<Card>
<Card.Header>Prediction and probablity</Card.Header>
<Card.Body>

  { <div>    
    <h6>It is...{this.state.answer.prediction}</h6>
    <h6>The Probability is...{this.state.answer.probability}</h6>
    </div>}
</Card.Body>
</Card>

 
          </div>
          </div>
      </div>
    )
}
    }
export default liver_disease;
