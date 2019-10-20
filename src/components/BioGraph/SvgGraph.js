import React, {useRef} from 'react';
import PropTypes from 'prop-types';

const SvgGraph = ({width, height, tableColumnNumber, tableRowNumber, children}) => {
    const graphRef = useRef();
    const childrenWithProps = React.Children.map(children, child => {
        return React.cloneElement(child, {height, width, tableColumnNumber, tableRowNumber})
    });

    return (
        <svg
            ref={graphRef}
            viewBox={`0 0 ${width} ${height}`}
            className="mt-6 md:mt-12"
        >
            {childrenWithProps}
        </svg>
    );
};

SvgGraph.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    tableColumnNumber: PropTypes.number,
    tableRowNumber: PropTypes.number,
};

SvgGraph.defaultProps = {
    width: 280,
    height: 60,
    tableColumnNumber: null,
    tableRowNumber: null,
};

export default SvgGraph;
