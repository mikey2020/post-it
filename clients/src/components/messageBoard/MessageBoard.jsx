import React from 'react';

import {getGroupsUserisPartOf} from '../../actions/userGroupsAction';

import {connect} from 'react-redux';

import PropTypes from 'prop-types';

import DisplayMessages from './DisplayMessages.jsx';

class MessageBoard extends  React.Component {

	constructor(props){
		super(props);

		this.state = {
			groupData: []
		}

		
	}

	componentDidMount(){


		this.props.getGroupsUserisPartOf(this.props.username).then(

			res => {
				/*console.log(res.data);
				let data = [];
				for(let count = 0; res.data.length > count ; count++){
					data.push(res.data[count].groupId);
				}
				console.log(data);*/
				this.setState({groupData: res.data});
				console.log(this.state.groupData)
			}

		)

	}

	render(){

		const messageBoard = this.state.groupData.map(group => 

			<div key={group.groupId}>
				<DisplayMessages  groupName={group.groupName} groupId={group.groupId}  />
			</div>
		); 

		return (

			<div>
				working
			</div>

		)
	}
}



MessageBoard.propTypes = {

	getGroupsUserisPartOf: PropTypes.func.isRequired,
	username: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {

	return {
		username: state.auth.user.name
	}
	
}


export default connect(mapStateToProps,{getGroupsUserisPartOf})(MessageBoard);

