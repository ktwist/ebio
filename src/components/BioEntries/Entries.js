import React from 'react';
import Title from '../ui/Title';

const Entries = ({children}) => {
    return (
        <div className="my-8" style={{flex: '1 0 auto'}}>
            <Title className="text-2xl py-3">Last 10 Entries</Title>
            {children}
        </div>
    );
};

export default Entries;
