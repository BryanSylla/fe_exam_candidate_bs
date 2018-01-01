import React, { Component } from "react";
import API from "../utils/API";
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import {Card, CardMedia, CardTitle, CardActions} from 'material-ui/Card';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Contentclear from 'material-ui/svg-icons/content/clear';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import {Option} from './Option'
import "./main.css";

const style = {
  margin: 12,
};

//main page component
class Main extends Component{

  constructor(props) {
    super(props);
	  this.state = {
    	breed:"",
    	dogData: "",
      breedNames:[],
      open:false
    	
    };

  }

  //loads all breed names before component mounts
	componentWillMount(){
     this.getBreedNames();
  }

  //handles inputs, watches and automatically updates states
	handleInputChange = event => {
    	const { name, value } = event.target;
    	this.setState({
      		[name]: value
    	});
    };

   //makes http request to get a random image of the selected dog breed 
   //shows error via a snackbar if breed is not found  
   handleFormSubmit = event => {
   		event.preventDefault();
      API.getImage(this.state.breed).then(res=>{
        if(res){
          this.setState({dogData:res});
        }
        else{
          this.handleSnackBar();
        }   
      });  
  	};
    //makes http request to get a random image of a random dog
    getRandomBreed=()=>{
      API.getRandomBreed().then(res=>this.setState({dogData:res}));
    };

    //clears all the images from app
    deleteAll=()=>{
      this.setState({dogData: API.deleteAll()});
    };

    //deletes the image of the selected dog
    deleteBreed= (id) =>{
      this.setState({dogData: API.deleteBreed(id)});
    };

    //makes http request to get all breed names from API 
    getBreedNames= () =>{
     API.getBreedNames().then(res=>this.setState({breedNames:res})).then(res=>console.log(this.state.breedNames))
    };

    //handles the state to open the snackbar
    handleSnackBar = () => {
      this.setState({
        open: true,
        breed:""
     });
    };

    //handles the state to close the snackbar
    handleRequestClose = () => {
        this.setState({
        open: false,
        });
      };

	render() {

    	return (

		<Paper zDepth={2}>
       
      <form  style={style}  onSubmit={this.handleFormSubmit}>    
            <TextField
                value={this.state.breed}
                onChange={this.handleInputChange}
                name="breed"
                placeholder="What breed would you like?"
                type="text"
                list="breeds"
               /> 
              <Option options={this.state.breedNames} /> 
              <RaisedButton raised="true" color="primary"  style={style} disabled={!(this.state.breed)}
                        onClick={this.handleFormSubmit}>
                Submit
              </RaisedButton>

              <RaisedButton raised="true" color="accent"  style={style} onClick={this.getRandomBreed} >
                Random Breed
              </RaisedButton>

      </form>
      <Divider />

              {this.state.dogData.length ? (
                  <Paper zDepth={4}>
                    <h3>Caught Breeds</h3>
                    <RaisedButton raised="true" color="primary"  style={style} 
                        onClick={this.deleteAll}  > Clear All 
                    </RaisedButton>
                        
                    <List >
                          {this.state.dogData.map(dogDataItem  => 
                              
                            <ListItem key={dogDataItem.id} >
                              <Card>
                                <CardActions>
                                  <FloatingActionButton mini={true} className="delete" style={style} onClick={() =>this.deleteBreed(dogDataItem.id)}>
                                  <Contentclear />
                                  </FloatingActionButton>
                                </CardActions>
                                <CardMedia className="img-holder">
                                <div>
                                  <img src={dogDataItem.imageURL}  alt="" />
                                </div>
                                </CardMedia>
                                <CardTitle title={dogDataItem.breed}  />  
                              </Card>
                            </ListItem>
                              )}
                    </List>
                        
                    <Divider />
                    </Paper>
				      ) :(<div>You have not searched any breeds</div>)
            }
				
      <Snackbar
          open={this.state.open}
          message="Error this breed was not found please try another"
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />      

			</Paper>
      
				);
			 }
}
export default Main;