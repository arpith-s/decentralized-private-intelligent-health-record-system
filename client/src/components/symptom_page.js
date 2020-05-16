import React, { Component } from 'react';
import './homy.css'
import 'leaflet/dist/leaflet.css'
import {Card, CardDeck, Button} from 'react-bootstrap';
import { Chart } from "react-google-charts";
import { Multiselect } from "multiselect-react-dropdown";
import Navbar from './Navbar'
import pat_activity from './pat_activity'
import Labrecord from './Labrecord'
import Login from './Login'
import doc_login from './doc_login'
import { BrowserRouter, Route } from 'react-router-dom'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import Axios from 'axios'
import L from 'leaflet'

class symptom_page extends Component{

    goback = (e) =>{
        e.preventDefault();
      
          window.location.href='Labrecord';
      
          
      }
    constructor(props) {
        super(props);
       
        this.state = {
          location:{lat: 51.505,
            lng: -0.09,
            },
            //zoom: 1,
            haveUsersLocation:false,
            radius: '',
            message:'',
            symptoms:{
              prediction:'',
              tasks:[],
              prediction:''
            },
            sym_array:[],
          plainArray: [ "itching","skin_rash","nodal_skin_eruptions","continuous_sneezing","shivering","chills","joint_pain","stomach_pain",
          "acidity","ulcers_on_tongue","muscle_wasting","vomiting","burning_micturition","spotting_ urination","fatigue","weight_gain",
          "anxiety","cold_hands_and_feets","mood_swings","weight_loss","restlessness","lethargy","patches_in_throat","irregular_sugar_level",
          "cough","high_fever","sunken_eyes","breathlessness","sweating","dehydration","indigestion","headache","yellowish_skin",
          "dark_urine","nausea","loss_of_appetite","pain_behind_the_eyes","back_pain","constipation","abdominal_pain","diarrhoea",
          "mild_fever","yellow_urine","yellowing_of_eyes","acute_liver_failure","fluid_overload","swelling_of_stomach","swelled_lymph_nodes","malaise",
          "blurred_and_distorted_vision","phlegm","throat_irritation","redness_of_eyes","sinus_pressure",
          "runny_nose",
          "congestion",
          "chest_pain",
          "weakness_in_limbs",
          "fast_heart_rate",
          "pain_during_bowel_movements",
          "pain_in_anal_region",
          "bloody_stool",
          "irritation_in_anus",
          "neck_pain",
          "dizziness",
          "cramps",
          "bruising",
          "obesity",
          "swollen_legs",
          "swollen_blood_vessels",
          "puffy_face_and_eyes",
          "enlarged_thyroid",
          "brittle_nails",
          "swollen_extremeties",
          "excessive_hunger",
          "extra_marital_contacts",
          "drying_and_tingling_lips",
          "slurred_speech",
          "knee_pain",
          "hip_joint_pain",
          "muscle_weakness",
          "stiff_neck",
          "swelling_joints",
          "movement_stiffness",
          "spinning_movements",
          "loss_of_balance",
          "unsteadiness",
          "weakness_of_one_body_side",
          "loss_of_smell",
          "bladder_discomfort",
          "foul_smell_of urine",
          "continuous_feel_of_urine",
          "passage_of_gases",
          "internal_itching",
          "toxic_look_(typhos)",
          "depression",
          "irritability",
          "muscle_pain",
          "altered_sensorium",
          "red_spots_over_body",
          "belly_pain",
          "abnormal_menstruation",
          "dischromic _patches",
          "watering_from_eyes",
          "increased_appetite",
          "polyuria",
          "family_history",
          "mucoid_sputum",
          "rusty_sputum",
          "lack_of_concentration",
          "visual_disturbances",
          "receiving_blood_transfusion",
          "receiving_unsterile_injections",
          "coma",
          "stomach_bleeding",
          "distention_of_abdomen",
          "history_of_alcohol_consumption",
          "fluid_overload.1",
          "blood_in_sputum",
          "prominent_veins_on_calf",
          "palpitations",
          "painful_walking",
          "pus_filled_pimples",
          "blackheads",
          "scurring",
          "skin_peeling",
          "silver_like_dusting",
          "small_dents_in_nails",
          "inflammatory_nails",
          "blister",
          "red_sore_around_nose",
          "yellow_crust_ooze"],
          objectArray: [
            { key: "headache", cat: "Group 1" },
            { key: "vommiting", cat: "Group 1" },
            { key: "throught pain", cat: "Group 1" },
            { key: "bodyache", cat: "Group 2" },
            { key: "stomach pain", cat: "Group 2" },
            { key: "Option 6", cat: "Group 2" },
            { key: "Option 7", cat: "Group 2" }
          ],
          selectedValues: [
            { key: "Option 1", cat: "Group 1" },
            { key: "Option 2", cat: "Group 1" }
          ]
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
      };


handlesym = (e) =>{
  this.setState({
    sym_array:e
});
console.log(e)
console.log(this.state.sym_array)
}


      handleSubmit(e){

       
      
        const body={
          symptoms:this.state.sym_array
        
         }
         console.log(body)
         Axios.post('https://cbmh-ml.herokuapp.com/apis/realtime/', body).then(res=>{
    this.setState({
      symptoms:res.data
    })
    console.log(res.data)
    console.log(this.state.symptoms.prediction)
    console.log(this.state.symptoms.tasks)
    
  })
  
        e.preventDefault();
      }
  

      render(){
        
        const position = [this.state.location.lat, this.state.location.lng];
        const { plainArray, objectArray, selectedValues } = this.state;
        const post = this.state.outbreak ? (
          <div >
             <br></br>Prediction : {this.state.outbreak} </div>
        ) : (
          <div>Loading Please wait....</div>
        );
      return(
        <div>
            <Navbar/>
            <CardDeck className="deck">
      <Card>
<Card.Header>Possible Symptoms</Card.Header>   
 <br/>
 <Multiselect options={plainArray} isObject={false} onSelect={(e)=>{this.handlesym(e)}}/>
<br/>
<Button className="predict-bttn" onClick={(e)=> {this.handleSubmit(e)}}>Predict</Button>


</Card>
<Card >  
<Card.Header>Predicted disease and Tasks for you!</Card.Header>
<Card.Body>
 
    {this.state.symptoms.length?
  <div>    
  <p>{this.state.symptoms.prediction}</p>
  <p>{this.state.symptoms.tasks}</p>
  </div>
     :
    ( <div>    
      <p>{this.state.symptoms.prediction}</p>
      <p>{this.state.symptoms.tasks}</p>
      </div>)}
  </Card.Body>
</Card>
</CardDeck>
<Button className="go-back" onClick={(e) =>this.goback(e)}>Go Back</Button>
        </div>
    )
}
}

export default symptom_page;