import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMembersOfGroup } from '../../actions/userActions';

class Members extends React.Component {
    constructor(props){
        super(props); 
    }

  componentDidMount(){
    this.props.getMembersOfGroup(this.props.groupId).then((data) => {
        console.log('iiinworkignssss', data);
    });
  }
  /**
   * @param {object} prevProps - previous props
   * @returns {void}
   */
  componentDidUpdate(prevProps) {
    if (this.props.groupId !== prevProps.groupId) {
      const { groupId } = this.props;
      this.props.getMembersOfGroup(groupId).then((data) => {
         console.log(' i already have afresking group ID', groupId);
         console.log('am geettted called', data);
      });
    }
  }
  /**
   *
   * @returns {component} - renders a React component
   */
  render() {
    const allMembers = this.props.members.map(member =>
        <li key={member.id}> {member.username} </li>
      );
        return (

            <div>
              <ul id="dropdown1" className="dropdown-content">
                { this.props.members.length > 0 && <ul className="">{allMembers}</ul> }
              </ul>
            </div>
        )
    }
}

Members.propTypes = {
  members: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  groupId: PropTypes.number.isRequired,
  getMembersOfGroup: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    members: state.members,
    groupId: state.currentGroup.id
  };
};

export default connect(mapStateToProps, { getMembersOfGroup })(Members);
