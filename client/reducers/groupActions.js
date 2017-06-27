import {SET_USER_GROUPS,GET_GROUP_DATA} from  '../actions/types';
import shortid from 'shortid';
import findIndex from 'lodash/findIndex';



export default (state = [], action={}) => {
	switch(action.type){

		  case SET_USER_GROUPS:
		  	
		  	
		  	
		    return action.groups.map((group) => {

	          return Object.assign({}, {
	           	id: group.id,
				name: group.name,
				creator: group.creator
	          })
	        

	       })


		  
		
		default: return state ;

	}
}

