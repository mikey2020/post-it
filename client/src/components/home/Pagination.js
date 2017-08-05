import React from 'react';
import PropTypes from 'prop-types';

class Pagination extends React.Component {
    render(){
         const pagesNavigation = this.props.pages.map(page => 
            <li className="waves-effect"><a href="#!">{page}</a></li>
         );
       return (
           <div className="my-pagination">
            <ul className="pagination">
                <li className="disabled"><a href="#!"><i className="material-icons">chevron_left</i></a></li>
                {pagesNavigation}
                <li className="waves-effect"><a href="#!"><i className="material-icons">chevron_right</i></a></li>
            </ul>
           </div>
        )
    }
    
}

Pagination.propTypes = {
    pages: PropTypes.array.isRequired
}

export default Pagination;
