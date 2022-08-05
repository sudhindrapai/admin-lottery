import {FC} from 'react';
import { BarChart } from '../../components/Graphs/BarChart/BarChart';
import {LineGraph} from '../../components/Graphs/LineGraph/LineGraph';
import {PieGraph} from '../../components/Graphs/PieChart/PieChart'

import {GraphList, GraphWrapper} from './StyledDashboard'
const Dashboard:FC = () => {
    
    return <>
    <h4>
        Dashboard
    </h4>
    <GraphList>
        <GraphWrapper>
        <BarChart />
        </GraphWrapper>
        <GraphWrapper>
        <LineGraph />
        </GraphWrapper>
        <GraphWrapper>
        <PieGraph />
        </GraphWrapper>
        </GraphList>
        </>
};

export default Dashboard