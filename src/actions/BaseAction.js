
import PropTypes from 'prop-types';

class BaseActions {
    constructor(props) {

        this.service = props.service
    }

    /**
     * mapping object/ array keys if needed
     * @param {*} data Some data to handle mapping
     * @returns new data with correct keys
     */

}

BaseActions.propTypes = {
    service: PropTypes.any.isRequired,
};

export default BaseActions;