import React from 'react';

import PropTypes from 'prop-types';

import { setCurrentGroup } from '../../actions/groupActions';

import { connect } from 'react-redux';

class Group extends React.Component {
    constructor(props){
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick(e){
        e.preventDefault();
        this.props.setCurrentGroup(this.props.group);
    }

    render() {

        return(
            <div>
              <p onClick={this.onClick} className="waves-effect waves-light btn group-btn red darken-4"> {this.props.groupname} </p>
              <br />
            </div>
        )
    }

}

Group.propTypes = {
  groupname: PropTypes.string.isRequired,
  setCurrentGroup: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired
};

export default connect(null, { setCurrentGroup })(Group);
