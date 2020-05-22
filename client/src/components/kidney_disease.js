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
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
class kidney_disease extends Component{


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
      ane:Number,
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


  onsubmit = async (e) =>{
    const body={
      age:this.state.age,
      bp:this.state.bp,
      sg:this.state.sg,
      al:this.state.al,
      su:this.state.su,
      rbc:this.state.rbc,
      pc:this.state.pc,
      pcc:this.state.pcc,
      ba:this.state.ba,
      bgr:this.state.bgr,
      bu:this.state.bu,
      sc:this.state.sc,
      sod:this.state.sod,
      pot:this.state.pot,
      hemo:this.state.hemo,
      pcv:this.state.pcv,
      wc:this.state.wc,
      rc:this.state.rc,
      htn:this.state.htn,
      dm:this.state.dm,
      cad:this.state.cad,
      appet:this.state.appet,
      pe:this.state.pe,
      ane:this.state.ane,
    }
    await Axios.post('https://cbmh-ml.herokuapp.com/apis/kidneydisease/', body).then(res=>{
        this.setState({
            answer:res.data
          })
          body.answer=res.data;  
    console.log(res);
        console.log(res.data)
        console.log(this.state.answer)
      })

        console.log("ANSWER ",body)
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
       const s= await this.state.contract.methods.addKidney(this.state.p_address,this.state.getHash).send({ from: this.state.accounts[0]})
      console.log(s);
        
      } catch (error) {
        console.log("Error ::::",error)
      }


    
  }



render(){    
return(
    <div> 
    <div> 
        <DNavbar/>
        <div className="heart">
        <Card>
          <Card.Header><b>Kidney disease Check</b></Card.Header>
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
</div>


<div class="form-group row">
<h6 class="col-sm-2 col-form-label">Blood pressure:</h6>
<div class="col-sm-10">
<input type="number" id="bp" onChange={(e)=>this.handleChange(e)}/>
</div>
</div>

<div class="form-group row">
<h6 class="col-sm-2 col-form-label">Specific gravity:</h6>
<div class="col-sm-10">
<input type="text" id="sg"  onChange={(e)=>this.handleChange(e)}/>
</div>
</div>     

<div class="form-group row">
<h6 class="col-sm-2 col-form-label">Albumin:</h6>
<div class="col-sm-10">
<input type="text" id="al"  onChange={(e)=>this.handleChange(e)}/>
</div>
</div>    
         
<div class="form-group row">
<h6 class="col-sm-2 col-form-label">Sugar:</h6>
<div class="col-sm-10">
<input type="text" id="su"  onChange={(e)=>this.handleChange(e)}/>
</div>
</div>          
         
<div class="form-group row">
<h6 class="col-sm-2 col-form-label">Red blood cells:</h6>
<div class="col-sm-10">
<input type="text" id="rbc" onChange={(e)=>this.handleChange(e)}/>
</div>
</div>          
          
<div class="form-group row">
<h6 class="col-sm-2 col-form-label">Pus cell:</h6>
<div class="col-sm-10">
<input type="number" id="pc" onChange={(e)=>this.handleChange(e)}/>
</div>
</div>          
         
<div class="form-group row">
<h6 class="col-sm-2 col-form-label">Puss cell clumps:</h6>
<input type="number" id="pcc" onChange={(e)=>this.handleChange(e)}/>
<div class="col-sm-10">
</div>
</div>          
         
<div class="form-group row">
<h6 class="col-sm-2 col-form-label">Bacteria:</h6>
<div class="col-sm-10">
<input type="text" id="ba" onChange={(e)=>this.handleChange(e)}/>
</div>
</div>          

<div class="form-group row">
<h6 class="col-sm-2 col-form-label">Blood glucose random:</h6>
<div class="col-sm-10">
<input type="text" id="bgr" onChange={(e)=>this.handleChange(e)}/>
</div>
</div>          
 
<div class="form-group row">
<h6 class="col-sm-2 col-form-label">Blood urea:</h6>
<div class="col-sm-10">
<input type="text" id="bu" onChange={(e)=>this.handleChange(e)}/>
</div>
</div> 

 <div class="form-group row">
<h6 class="col-sm-2 col-form-label">Serum creatintive:</h6>
<div class="col-sm-10">
<input type="text" id="sc" onChange={(e)=>this.handleChange(e)}/>
</div>
</div>         

<div class="form-group row">
<h6 class="col-sm-2 col-form-label">Sodium:</h6>
<div class="col-sm-10">
<input type="text" id="sod" onChange={(e)=>this.handleChange(e)}/>
</div>
</div>         
<div class="form-group row">
<h6 class="col-sm-2 col-form-label">Potassium:</h6>
<div class="col-sm-10">
<input type="text" id="pot" onChange={(e)=>this.handleChange(e)}/>
</div>
</div>         
<div class="form-group row">
<h6 class="col-sm-2 col-form-label">Hemoglobin:</h6>
<div class="col-sm-10">
<input type="text" id="hemo" onChange={(e)=>this.handleChange(e)}/>
</div>
</div>         
<div class="form-group row">
<h6 class="col-sm-2 col-form-label">packed cell volume:</h6>
<div class="col-sm-10">
<input type="text" id="pcv" onChange={(e)=>this.handleChange(e)}/>
</div>
</div>         
<div class="form-group row">
<h6 class="col-sm-2 col-form-label">white blood cell count:</h6>
<div class="col-sm-10">
<input type="text" id="wc" onChange={(e)=>this.handleChange(e)}/>
</div>
</div>         
<div class="form-group row">
<h6 class="col-sm-2 col-form-label">red blood cell count:</h6>
<div class="col-sm-10">
<input type="text" id="rc" onChange={(e)=>this.handleChange(e)}/>
</div>
</div>         
<div class="form-group row">
<h6 class="col-sm-2 col-form-label">hypertension:</h6>
<div class="col-sm-10">
<RadioGroup  id="htn" onChange={(e)=>this.handleChange(e)}>
        <FormControlLabel value="1" control={<Radio />} label="Yes" />
        <FormControlLabel value="0" control={<Radio />} label="No"/>
        </RadioGroup>
    
</div>
</div>         
<div class="form-group row">
<h6 class="col-sm-2 col-form-label">diabetes mellitus:</h6>
<div class="col-sm-10">
<RadioGroup  id="dm" onChange={(e)=>this.handleChange(e)}>
        <FormControlLabel value="1" control={<Radio />} label="Yes" />
        <FormControlLabel value="0" control={<Radio />} label="No"/>
        </RadioGroup>
    
</div>
</div>         
<div class="form-group row">
<h6 class="col-sm-2 col-form-label">Coronary artery disease:</h6>
<div class="col-sm-10">
<RadioGroup id="cad" onChange={(e)=>this.handleChange(e)}>
        <FormControlLabel value="1" control={<Radio />} label="Yes" />
        <FormControlLabel value="0" control={<Radio />} label="No"/>
        </RadioGroup>
    
</div>
</div>         
<div class="form-group row">
<h6 class="col-sm-2 col-form-label">Appetite:</h6>
<div class="col-sm-10">
<RadioGroup id="appet" onChange={(e)=>this.handleChange(e)}>
        <FormControlLabel value="1" control={<Radio />} label="Yes" />
        <FormControlLabel value="0" control={<Radio />} label="No"/>
        </RadioGroup>
    
</div>
</div>         
<div class="form-group row">
<h6 class="col-sm-2 col-form-label">Pedal edema:</h6>
<div class="col-sm-10">
<RadioGroup id="pe" onChange={(e)=>this.handleChange(e)}>
        <FormControlLabel value="1" control={<Radio />} label="Yes" />
        <FormControlLabel value="0" control={<Radio />} label="No"/>
        </RadioGroup>
    
</div>
</div>         
<div class="form-group row">
<h6 class="col-sm-2 col-form-label">Anemia:</h6>
<div class="col-sm-10">
<RadioGroup id="ane" onChange={(e)=>this.handleChange(e)}>
        <FormControlLabel value="1" control={<Radio />} label="Yes" />
        <FormControlLabel value="0" control={<Radio />} label="No"/>
        </RadioGroup>
    
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
export default kidney_disease;
