import React from 'react';

import PropTypes from 'prop-types';

import User from './User';

class AllUsers extends React.Component {
  
	render(){
      
    const allResults = this.props.users.map(user =>
        < User key={user.id} username={user.username} addUserToGroup={this.props.addUserToGroup}/>
    );
        
       
		return (
            <div>

                <ul>{allResults}</ul>

			</div>
		)
	}
}

AllUsers.propTypes = {
    users: PropTypes.array.isRequired,
    addUserToGroup: PropTypes.func.isRequired
}


export default AllUsers;
