import {FC, useState, useEffect, Fragment} from 'react';

import {addPaddingZero} from '../../Utility/Utility';

interface CountdownTimerProps {
    timestamp: Date
};

const CountdownTimer:FC<CountdownTimerProps> = ({timestamp}) => {

    const [endDate, setEndDate] = useState(timestamp);
    const [days, setDay] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        setEndDate(timestamp)
       let timerInterval = setInterval(() => {
            let endDateTime = endDate.getTime();
            let nowTime = new Date().getTime();
            var distance = endDateTime - nowTime;
    
            var remainingDays = Math.floor(distance / (1000 * 60 * 60 * 24));
            var remaininghours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var remainingMinutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var remainigSeconds = Math.floor((distance % (1000 * 60)) / 1000);
    
            setDay(remainingDays);
            setHours(remaininghours);
            setMinutes(remainingMinutes);
            setSeconds(remainigSeconds);
        },1000);
        return () => {
            clearInterval(timerInterval);
        }
    });

    return <Fragment>{addPaddingZero(days)} : {addPaddingZero(hours)} : {addPaddingZero(minutes)} : {addPaddingZero(seconds)}</Fragment>
};

export default CountdownTimer