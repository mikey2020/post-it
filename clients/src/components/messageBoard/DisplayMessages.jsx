import React from 'react';

import {connect} from 'react-redux';

import {getGroupMessages} from '../../actions/userGroupsAction';

import PropTypes from 'prop-types';

import GroupMessages from '../GroupMessages.jsx';

class DisplayMessages extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			post: []
		}	

	}

	componentDidMount(){
		this.props.getGroupMessages(this.props.groupId).then(

			(res) => {
				this.setState({posts: res.data.posts})
				console.log(this.state.posts);

			}
		);
	}

	
	render() {



		return (

			
		    <div className="jumbotron">
		    	
		    	<GroupMessages name={this.props.groupName} messages={this.state.posts}/>
		    
		    </div>

		)
	}

}

DisplayMessages.propTypes = {

	getGroupMessages: PropTypes.func.isRequired
}


export default connect(null,{getGroupMessages})(DisplayMessages) ;

