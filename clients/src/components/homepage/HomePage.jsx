import React from 'react' ;

import CreateGroup from './CreateGroup.jsx';

import UserGroups from './UserGroups.jsx';

import {connect}  from 'react-redux';

import PropTypes from 'prop-types';

import {getUserGroups,setUserGroups} from '../../actions/userGroupsAction';

//import isEmpty from 'lodash/isEmpty';

class HomePage extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			groups: []
		}
	}


	componentDidMount() {  
		if(this.props.loggedIn === false){
			this.context.router.push('/signin');
		}

		else{
			//this.setState({groups: this.props.groups}),
			this.context.router.push('/home')
		}    	
  	}

  

	render(){
		
		const {username,getUserGroups,setUserGroups,groups} = this.props;

		return (
			<div className="container">
				{username && <h1> Welcome {username} </h1>}
				<CreateGroup/>
				<UserGroups 
				username={username} 
				getUserGroups={getUserGroups} 
				setUserGroups={setUserGroups} 
				groups={groups}
				key={groups.id}/>
			</div>
		)
	}
}

HomePage.propTypes = {

	username: PropTypes.string,
	getUserGroups: PropTypes.func.isRequired,
	groups: PropTypes.array
}

HomePage.contextTypes = {
	router: PropTypes.object.isRequired
}

const mapStateToProps = state => {

	return{
		username: state.auth.user.name,
		loggedIn: state.auth.isAuthenticated,
		groups: state.groupActions
	}
}

export default connect(mapStateToProps,{getUserGroups,setUserGroups})(HomePage);