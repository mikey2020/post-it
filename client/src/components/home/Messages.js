import React from 'react';

import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import Validations from '../../../validations';

import { postMessage, getGroupMessages } from '../../actions/messageActions';

import Message from './Message';

const validate = new Validations();

class Messages extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			message: '',
			errors: {},
		}

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {
		const { group } = this.props;
		console.log('grou[p id ', group.id);
		this.props.getGroupMessages(group.id);
	}

	componentDidUpdate(prevProps) {
		if (this.props.messages.length !== prevProps.messages.length) {
			const { group } = this.props;
			this.props.getGroupMessages(group.id);
		} else if(this.props.group.id !== prevProps.group.id) {
			const { group } = this.props;
			this.props.getGroupMessages(group.id);
		}
    }

	isValid(){
		const {errors, isValid} = validate.input(this.state);

		if(!isValid){
			this.setState({errors, isLoading: true});
		}

		return isValid;
	}

	onChange(e){
		this.setState({[e.target.name]: e.target.value });

		if(this.isValid()){
			this.setState({errors: {}, isLoading: false});
		}
	}

	onSubmit(e){
		e.preventDefault();

		if(this.isValid()){
			this.setState({errors: {}, isLoading: false});

			this.props.postMessage(this.state, this.props.group.id);
		}
	}


    render(){
		const allMessages = this.props.messages.map((message) =>
		 <Message key={message.id} content={message.content} />
        );

        return (
          <div className="row">
					<div> 
						<nav className="col s12 m12 l12 right-column-header grey lighten-5">
						<div className="nav-wrapper">
							<div className="row">
								<a href="#!" className="col s7 m7 l7" id="group-name">{this.props.group.name}</a>
								<a href="#modal3" className="col s3 m3 l3 waves-effect waves-light btn add-user-icon red darken-4">Add User</a>
							</div>
						</div>
					</nav>
					</div>

				    <ul>{allMessages}</ul>

					<div className="row">
						<form className="col s12 m12 l12 form-group" onSubmit={this.onSubmit}>
							<textarea name="message" onChange={this.onChange} className="form-control" rows="5" id="comment" value={this.state.message} ></textarea>
                            <br/>
								<div className="col s5 m4 l3">
									 <button className="btn waves-effect waves-light red darken-4" type="submit" name="action">Post
										<i className="material-icons right">send</i>
									</button>
								</div>
						</form>
					</div>
					
			</div>	
        )
    }
}

Messages.propTypes = {
	messages: PropTypes.array.isRequired,
	group: PropTypes.object.isRequired,
	postMessage: PropTypes.func.isRequired,
	getGroupMessages: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
   return {
	   messages: state.Messages,
	   group: state.currentGroup
   }
}


export default connect(mapStateToProps, { postMessage, getGroupMessages })(Messages);
