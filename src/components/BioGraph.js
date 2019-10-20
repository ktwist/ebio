import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import moment from 'moment';
import Cookies from 'universal-cookie';
import Title from './ui/Title';
import SvgGraph from './BioGraph/SvgGraph';
import SvgGrid from './BioGraph/SvgGrid';
import GraphMarkings from './BioGraph/GraphMarkings';
import SelectedColumn from './BioGraph/SelectedColumn';
import SvgCurve from './BioGraph/SvgCurve';
import Legend from './BioGraph/Legend';
import BioResult from './BioGraph/BioResult';
import {
    TABLE_COLUMN_NUMBER,
    TABLE_ROW_NUMBER,
    CURVE_TOP_POSITION,
    CURVE_BOTTOM_POSITION,
    CURVE_MIDDLE_POSITION,
    PHYSICAL, 
    EMOTIONAL, 
    INTELLECTUAL, 
    INTUITIVE,
    getTotalCycleNumber,
} from './BioGraph/Constants';

const cookies = new Cookies();

const BioGraph = ({match, location}) => {
    const users = cookies.get('list') || [];
    const {params = {}} = match;
    const user = users.find(({name, id}) => `${name}_${id}` === params.graphId) || location.state;
    const {name, date} = user || {};
    const weekDays = ['Monday', 'Tuesday', 'Wendseday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const currentDay = moment().startOf('day');
    const dateBirth = moment(date, 'YYYY-MM-DD');
    const dayOfBirth = weekDays[dateBirth.isoWeekday() - 1];
    const dayOfLife = currentDay.diff(dateBirth, 'days');
    const svgWidth = (dayOfLife + TABLE_COLUMN_NUMBER - 8) * 10;  
    const getPoints = (startPosition, amplitude, isOdd) => {
        let result = [];
        let currentPosition = startPosition;
        let isOddType = isOdd; 
        while (currentPosition <= (TABLE_COLUMN_NUMBER * 10 + 280)) {
            let height = isOddType ? CURVE_TOP_POSITION : CURVE_BOTTOM_POSITION;
            if (result.length === 0 && startPosition >= 0) {
                height = CURVE_MIDDLE_POSITION;
            } 
            result.push([currentPosition, height]);
            currentPosition = currentPosition + amplitude;
            isOddType = !isOddType; 
        }
        return result;
    }; 

    const getStartPosition = (fullSvgWidth, visibleSvgWidth, cycleNumber, duration) => {
        if (fullSvgWidth > visibleSvgWidth) {
            if ((fullSvgWidth - visibleSvgWidth) > duration) {
                const unRenderedCycles = Math.floor(cycleNumber) - (Math.ceil(visibleSvgWidth / duration) * 2);
                const startPositionOfUnrederedCycles = -(fullSvgWidth - visibleSvgWidth);
                return startPositionOfUnrederedCycles + (((unRenderedCycles - 1) * duration) + (duration * 3 / 4));
            }
            return -(fullSvgWidth - visibleSvgWidth);
        } 
        return visibleSvgWidth - fullSvgWidth;
    };

    const getInitialValueOdHeight = (fullSvgWidth, visibleSvgWidth, cycleNumber, duration) => {
        if (fullSvgWidth > visibleSvgWidth && ((fullSvgWidth - visibleSvgWidth) > duration)) {
            const unRenderedCycles = Math.floor(cycleNumber) - (Math.ceil(visibleSvgWidth / duration) * 2);
            return (unRenderedCycles * 2) % 2 === 0;
        } 
        return true;
    };

    const emotionalPoints = getPoints(
        getStartPosition(
            svgWidth, 
            TABLE_COLUMN_NUMBER * 10, 
            getTotalCycleNumber(dayOfLife + TABLE_COLUMN_NUMBER - 8, 28),
            EMOTIONAL.duration,
        ),
        EMOTIONAL.duration / 2, 
        getInitialValueOdHeight(
            svgWidth, 
            TABLE_COLUMN_NUMBER * 10, 
            getTotalCycleNumber(dayOfLife + TABLE_COLUMN_NUMBER - 8, 28),
            EMOTIONAL.duration,
        ),
    );

    const physicalPoints = getPoints(
        getStartPosition(
            svgWidth, 
            TABLE_COLUMN_NUMBER * 10, 
            getTotalCycleNumber(dayOfLife + TABLE_COLUMN_NUMBER - 8, 23),
            PHYSICAL.duration,
        ),
        PHYSICAL.duration / 2, 
        getInitialValueOdHeight(
            svgWidth, 
            TABLE_COLUMN_NUMBER * 10, 
            getTotalCycleNumber(dayOfLife + TABLE_COLUMN_NUMBER - 8, 23),
            PHYSICAL.duration,
        ),
    );

    const intellectualPoints = getPoints(
        getStartPosition(
            svgWidth, 
            TABLE_COLUMN_NUMBER * 10, 
            getTotalCycleNumber(dayOfLife + TABLE_COLUMN_NUMBER - 8, 33),
            INTELLECTUAL.duration,
        ),
        INTELLECTUAL.duration / 2, 
        getInitialValueOdHeight(
            svgWidth, 
            TABLE_COLUMN_NUMBER * 10, 
            getTotalCycleNumber(dayOfLife + TABLE_COLUMN_NUMBER - 8, 33),
            INTELLECTUAL.duration,
        ),
    );

    const intuitivePoints = getPoints(
        getStartPosition(
            svgWidth, 
            TABLE_COLUMN_NUMBER * 10, 
            getTotalCycleNumber(dayOfLife + TABLE_COLUMN_NUMBER - 8, 38),
            INTUITIVE.duration,
        ),
        INTUITIVE.duration / 2, 
        getInitialValueOdHeight(
            svgWidth, 
            TABLE_COLUMN_NUMBER * 10, 
            getTotalCycleNumber(dayOfLife + TABLE_COLUMN_NUMBER - 8, 38),
            INTUITIVE.duration,
        ),
    );

    return (
        <div className="flex flex-col h-full p-4 bg-gray-100">
            <div className="flex flex-col w-full">
                <Title>
                    <div className="flex flex-col">
                        <div className="flex justify-between w-full text-base md:text-xl font-normal">
                            <button
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                            >
                                <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M 10.324219 1.8984375 L 4.421875 7.8027344 L 2.5917969 9.6328125 L 4.7070312 11.748047 
                                            L 10.925781 17.966797 L 12.755859 16.136719 L 6.5371094 9.9179688 L 12.439453 4.0136719 
                                            L 10.324219 1.8984375 z "/>
                                </svg>
                                <Link to='/' className="flex flex-row justifyx-between items-center">
                                    <span>Back</span>
                                </Link>
                            </button>
                            <span>{moment(date).format('DD.MM.YYYY')}</span>
                        </div>
                        <div className="flex justify-between w-full">
                            <span>Biorhythm graph</span>
                            <span>{name}</span>
                        </div>
                    </div>
                </Title>
                <SvgGraph 
                    tableColumnNumber={TABLE_COLUMN_NUMBER}
                    tableRowNumber={TABLE_ROW_NUMBER}
                >
                    <SvgGrid />
                    <GraphMarkings />
                    <SelectedColumn />
                    <SvgCurve
                        curveColor={PHYSICAL.color}
                        points={physicalPoints}
                    />
                    <SvgCurve
                        curveColor={EMOTIONAL.color}  
                        points={emotionalPoints}
                    />
                    <SvgCurve
                        curveColor={INTELLECTUAL.color} 
                        points={intellectualPoints}
                    />
                    <SvgCurve
                        curveColor={INTUITIVE.color}  
                        points={intuitivePoints}
                    />
                </SvgGraph>
                <Legend 
                    legends={[PHYSICAL, EMOTIONAL, INTELLECTUAL, INTUITIVE]}
                />
            </div>
            <BioResult 
                dayOfLife={dayOfLife}
                biorhythmCircles={[PHYSICAL, EMOTIONAL, INTELLECTUAL, INTUITIVE]} 
            />
            <div className="flex flex-col text-xl my-4 px-2">
                <p>Day of birth: <span className="font-bold">{dayOfBirth}</span></p>
                <p>Day of life: <span className="font-bold">{dayOfLife}</span></p>
            </div>
        </div>
    );
};

BioGraph.propTypes = {
    match: PropTypes.object,
};

BioGraph.defaultProps = {
    match: {},
};

export default BioGraph;
