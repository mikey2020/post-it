import {GET_GROUP_DATA} from  '../actions/types';

export default (state = {}, action={}) => {
	switch(action.type){

		  case GET_GROUP_DATA:
		  	
		  	
	        return Object.assign({},{
	           	id: action.groupData.groupId,
				name: action.groupData.groupName
	        })
	        

	      

		  
		
		default: return state ;

	}
}

