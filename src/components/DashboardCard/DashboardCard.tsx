import {FC, memo} from 'react';
import {CardWrapper,Label,Count} from './StyledDashboardCard';
import {convertCamelCaseToReadableWord} from '../../Utility/Utility'
interface DashboardCardProps {
    label:string,
    count:string,
    isNeedToShowDollarSign: boolean
}

const DashboardCard:FC<DashboardCardProps> = (props) => {
    const {count, label, isNeedToShowDollarSign} = props;
    return <CardWrapper>
        <Count>
           {isNeedToShowDollarSign && "$"} {count}
        </Count>
        <Label>
            {convertCamelCaseToReadableWord(label)}
        </Label>
    </CardWrapper>
}

export default memo(DashboardCard)
