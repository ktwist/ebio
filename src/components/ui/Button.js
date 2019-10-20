import React from 'react';
import PropTypes from 'prop-types';

const Button = ({children, onClick, className, isDisabled}) => {
    return (
        <button
            className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center ${className ? className : ''}`}
            onClick={onClick}
            disabled={isDisabled}
        >
            {children || 'Show'}
        </button>
    );
};

Button.propTypes = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    isDisabled: PropTypes.bool,
};

Button.defaultProps = {
    onClick: null,
    className: null,
    isDisabled: false,
};

export default Button;
