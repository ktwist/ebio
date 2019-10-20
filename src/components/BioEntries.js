import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import moment from 'moment';
import Cookies from 'universal-cookie';
import Title from './ui/Title';
import Button from './ui/Button';
import Input from './ui/Input';
import Entries from './BioEntries/Entries';
import SingleEntry from './BioEntries/SingleEntry';
import Footer from './Footer';

const cookies = new Cookies();

const BioEntries = ({history}) => {
    const [name, setName] = useState('');
    const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
    const [list, setList] = useState([]);
    const uniqueId = () => `id-${Math.random().toString(36).su0bstr(2, 16)}`;

    useEffect(() => {
        const cookie = cookies.get('list');
        if (cookie) {
           setList(cookie);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const formRef = useRef();

    const handleClick = () => {
        if (!formRef.current.reportValidity()) {
            return;
        }
        const isUnique = list.every(item => item.name !== name || !(moment(date).isSame(item.date)));
        if (isUnique) {
            const id = uniqueId();
            const updatedList = [{name, date, id}, ...list.slice(0, 9)]
            const cookie = JSON.stringify(updatedList);
            cookies.set('list', cookie);
            setList(updatedList);
            // clear inputs
            setName('');
            setDate(moment().format('YYYY-MM-DD'));
            history.push({pathname:`graph/${name}_${id}`, state: {name, date, id}});
        }
    }

    return (
        <div className="flex flex-col h-full p-4 bg-gray-100">
            <Title>
                Biorhythm
            </Title>
            <form 
                ref={formRef} 
                onSubmit={e => e.preventDefault()}
                className="flex flex-col md:flex-row justify-between items-center py-5 w-full"
            >
                <div className="flex w-full flex-col md:flex-row md:w-6/12" >
                    <Input
                        label="Name"
                        value={name}
                        className=""
                        handleInputChange={setName}
                        minLength={4}
                        required={true}
                        placeholder='Add name'
                    />
                    <Input
                        type="date"
                        label="Birthday"
                        value={date}
                        className=""
                        handleInputChange={setDate}
                    />
                </div>
                <Button
                    className="flex self-start justify-between mt-4 md:self-end md:mt-0"
                    onClick={handleClick}
                >
                    <span>Show</span>
                    <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M 8.203125 1.9511719 L 6.2460938 3.9082031 L 12.339844 10 L 6.2460938 16.091797 
                                L 8.203125 18.048828 L 14.296875 11.957031 L 16.253906 10 L 14.296875 8.0429688 
                                L 8.203125 1.9511719 z"/>
                    </svg>
                </Button>
            </form>
            <Entries>
                {list.map((item, index) => (
                    <SingleEntry key={index} item={item} />
                ))}
            </Entries>
            <Footer/>
        </div>
    );
};

BioEntries.propTypes = {
    history: PropTypes.object,
};

BioEntries.defaultProps = {
    history: {},
};

export default withRouter(BioEntries);
