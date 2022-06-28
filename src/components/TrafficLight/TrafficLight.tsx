import {FC} from 'react';
import {Nutral, RedDot, OrangeDot, GreenDot} from './StyledTrafficLight';

interface TrafficLightProps{
    maxAmount: number,
    compareAmount: number
}

const TrafficLight:FC<TrafficLightProps> = ({maxAmount, compareAmount}) => {
    let Inidicator = <Nutral />;
    if (maxAmount !== 0) {
        let halfAmount = maxAmount/2;
        console.log(halfAmount < compareAmount, halfAmount,compareAmount)
        console.log(halfAmount < compareAmount, halfAmount ,compareAmount)
        if (compareAmount < halfAmount) {
            Inidicator = <RedDot />;
        } else if (compareAmount > halfAmount && compareAmount < maxAmount) {
            Inidicator = <OrangeDot />;
        } else if (compareAmount >= maxAmount) {
            Inidicator = <GreenDot />
        }
        
    }
    return Inidicator
};

export default TrafficLight