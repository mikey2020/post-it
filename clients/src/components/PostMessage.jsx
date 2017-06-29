import React from 'react';

import GroupMessages from './GroupMessages.jsx';

import {connect}  from 'react-redux';

import PropTypes from 'prop-types';

//import Validations from '../validations';

import {postMessage,getGroupMessages} from '../actions/userGroupsAction';

import {addFlashMessage} from '../actions/flashMessage';

//const validate = new Validations();


class PostMessage extends React.Component {

	constructor(props){

		super(props);

		this.state = {
			post: '',
			invalid: false,
			info: {},
			posts: []
		}

		this.onChange = this.onChange.bind(this);

		this.onSubmit = this.onSubmit.bind(this);


	}

	componentDidMount(){
		this.props.getGroupMessages(this.props.groupData.id).then(

			(res) => {
				this.setState({posts: res.data.posts})


			}
		);
	}

	onChange(e){
		 this.setState({[e.target.name]: e.target.value});
	}

	onSubmit(e){
		e.preventDefault();
		//console.log(this.props.groupData.id);
		this.props.postMessage(this.props.groupData.id,this.state).then(

			(res) => {
				this.setState({info: res.data})
				this.props.addFlashMessage({
					type: 'success',
					text: res.data.message
				})
			}

		);
	}

	render() {

		const {groupData} = this.props;

		return (

			<div className="container">
				<GroupMessages name={groupData.name} newPost={this.state.post} messages={this.state.posts}/>
				
				<form onSubmit={this.onSubmit}>
		         		<input 
		         		type="text"
		         		placeholder="Type post here"
		         		className="form-control"
		         		name="post"
		         		value={this.state.post}
		         		onChange={this.onChange}/>
		         		<button className="btn btn-primary" disabled={this.state.invalid}> Post message </button>
		        </form>
			</div>

		)
	}

}

PostMessage.propTypes = {
	groupData: PropTypes.object.isRequired,
	postMessage: PropTypes.func.isRequired,
	addFlashMessage: PropTypes.func.isRequired,
	getGroupMessages: PropTypes.func.isRequired

}


const mapStateToProps = (state) => {

	return{
		groupData: state.postMessage
	}
	
}

export default connect(mapStateToProps,{postMessage,addFlashMessage,getGroupMessages})(PostMessage);