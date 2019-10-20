import React from 'react';
import PropTypes from 'prop-types';

const Legend = ({legends}) => (
    <div 
        className="flex flex-col md:flex-row md:justify-between md:items-center py-3 self-end" 
        style={{minWidth: '100px'}}
    >
        {legends.map(({name, color}, index, arr) => (
            <div key={name} className={`flex flex-row ${index === arr.length - 1 ? '' : 'pr-2 md:pr-3'}`}>
                <div className="w-3 h-3 md:w-4 md:h-4 mr-1" style={{backgroundColor: color}} />
                <p className="md:self-end text-xs md:text-sm">{name}</p>
            </div>

        ))}
    </div>
);

Legend.propTypes = {
    legends: PropTypes.array,
};

Legend.defaultProps = {
    legends: [],
};

export default Legend;
