import React from "react";

//component which renders all the breeds as options in the user search input
//here I will be creating my options dynamically based on
//what props are currently passed to the parent component 
export const Option = props =>{
    if(props.options){
      let items=[];
      for (let i = 0; i < props.options.length; i++) {             
          items.push(<option key={i} value={props.options[i].name}>{props.options[i].name}</option>);        
      }
      	return (   
       <datalist id="breeds">
       {props.options.map(function(child){
        return <option value={child.name}>{child.name}</option>;
       })}
        </datalist>
        ) 
    }
    else{
     	return (
             (<datalist id="breeds"><option value="error">error loading breeds</option></datalist>)   
         ) 
	 }
};