import React from 'react' ;

import {getUserGroups,setUserGroups} from '../../actions/userGroupsAction.js';

import {connect} from 'react-redux';

import PropTypes from 'prop-types';

import Group from './Group.jsx';


class UserGroups extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			groups: []
		}
	}

    componentDidMount() {
    	this.props.getUserGroups(this.props.username).then(
    		(res) => {
    			this.props.setUserGroups(res.data)
    		}

    	);

    	
  	}

	render(){

		const allGroups = this.props.groups.map(group => <Group key={group.id} groupName={group.name}/> );

		return (
			<div>
				{allGroups}
			</div>
		)
	}
}



UserGroups.propTypes = {

	getUserGroups: PropTypes.func,

	setUserGroups: PropTypes.func.isRequired

}



export default UserGroups;