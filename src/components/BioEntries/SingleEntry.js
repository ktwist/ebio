import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import moment from 'moment';
import Button from '../ui/Button';

const SingleEntry = ({item, history}) => (
    <div className="flex flex-row w-full justify-between items-center py-2 border-b-2">
        <div className="flex flex-row">
            <div className="font-bold w-20 mr-2 md:w-32 md:mr-5">{item.name}</div>
            <div>{moment(item.date).format('DD.MM.YYYY')}</div>
        </div>
        <Button 
            className="flex self-end"
            onClick={() => history.push(`/graph/${item.name}_${item.id}`)}
        >
            <span>Show</span>
            <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M 8.203125 1.9511719 L 6.2460938 3.9082031 L 12.339844 10 L 6.2460938 16.091797 
                        L 8.203125 18.048828 L 14.296875 11.957031 L 16.253906 10 L 14.296875 8.0429688 
                        L 8.203125 1.9511719 z"/>
            </svg>
        </Button>
    </div>
);

SingleEntry.propTypes = {
    item: PropTypes.object,
    history: PropTypes.object,
};

SingleEntry.defaultProps = {
    item: null,
    history: null,
}

export default withRouter(SingleEntry);
