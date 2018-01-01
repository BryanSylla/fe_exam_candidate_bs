import axios from "axios";
	//initiating local variables
	let breedList=[];
	let i=0;

export default {

	//gets the image of the selected breed
	//adds the image to the list of images and returns the list 
	getImage: function(breed){
		i+=1;
		return axios.get('https://dog.ceo/api/breed/'+breed+'/images/random')
		.then(res=>{
			if(res.data.message==="Breed not found")
				return false;
				else{
					breedList.unshift({breed:breed, imageURL:res.data.message, id:i});
					return breedList;
				}
		})
		.catch(function (error) {
    		console.log(error);
  			});
	},
	//gets the image of a random breed
	//adds the image to the list of images and returns the list
	getRandomBreed: function(){
		i+=1;
		return axios.get("https://dog.ceo/api/breeds/image/random")
		.then(res=>this.parseRandomImage(res.data.message))
		.then(res=>{ breedList.unshift(res)})
		.then(res=>{return breedList})
		.catch(function (error) {
    		console.log(error);
  			});

	},

	//grabs the breed name from the random breed 
	//returns random breed object
	parseRandomImage: function(url){
		let breedName= url.split("/")[5];
		return {breed:breedName, imageURL:url, id:i};
	},

	//deletes an image based on the selected id
	deleteBreed: function(id){
		for(let j=0;j<breedList.length;j++){
			if(id===breedList[j].id){
				return breedList.splice(j,1)===[]? []:breedList;
			}
		}
	},

	//deletes all images from list
	deleteAll: function(){
		i=0;
		return breedList=[];

	},

	//grabs list of breed names from API 
	//returns an array of objects with breed names
	getBreedNames: function(){
		return axios.get("https://dog.ceo/api/breeds/list")
		.then(res=>{
			let newArray=[];
			for (let k=0;k< res.data.message.length;k++)
				newArray.push({name:res.data.message[k]});
			return newArray;
		})
		.catch(function (error) {
    		console.log(error);
  			});
		
	}
};