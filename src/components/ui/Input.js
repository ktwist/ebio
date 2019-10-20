import React from 'react';
import PropTypes from 'prop-types';

const Input = ({type, label, value, handleInputChange, minLength, placeholder, required}) => {
    const handleChange = e => {
        handleInputChange(e.target.value)
    }

    return (
        <div className="flex flex-col w-full first: mb-2 md:mb-0 md:first: pr-5">
            {label && <label>{label}</label>}
            <input 
                type={type}
                className="bg-gray-200 w-full appearance-none border-2 border-gray-200 rounded text-xs 
                            py-2 px-4 text-gray-700 leading-tight focus:outline-none 
                            focus:bg-white focus:border-grey-800"
                onChange={handleChange}
                value={value}
                required={required}
                minLength={minLength}
                placeholder={placeholder}
            />
        </div>
    )
};

Input.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    handleChange: PropTypes.func,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    minLength: PropTypes.number,
    required: PropTypes.bool,
};

Input.defaultProps = {
    label: null,
    value: null,
    handleChange: null,
    type: 'text',
    placeholder: '',
    minLength: null,
    required: false,
};

export default Input;
