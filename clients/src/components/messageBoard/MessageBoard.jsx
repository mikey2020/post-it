import React from 'react';

import {getGroupsUserisPartOf} from '../../actions/userGroupsAction';

import {connect} from 'react-redux';

import PropTypes from 'prop-types';

//import DisplayMessages from './DisplayMessages';

class MessageBoard extends  React.Component {

	constructor(props){
		super(props);

		this.state = {
			groupIds: []
		}

		
	}

	componentDidMount(){


		this.props.getGroupsUserisPartOf(this.props.username).then(

			res => {
				console.log(res.data)
				this.setState({groupIds: res.data});
			}

		)

	}

	render(){

		return (

			<h1> Working </h1>

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

