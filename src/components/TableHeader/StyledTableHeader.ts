import styled from 'styled-components';
import {ArrowSortedDown} from '@styled-icons/typicons/ArrowSortedDown';
import {ArrowSortedUp} from '@styled-icons/typicons/ArrowSortedUp';

interface SortIconProps {
    isSelected: boolean
}

export const LabelWrapper = styled.div`
width: auto;
display: flex;
flex-flow: row nowrap;
padding: 4px 8px 24px 8px;
font-size: 12px;
font-weight: 500;
color: #687182;
align-items: center;
justify-content: space-between;
border-bottom: 1px solid #E9EDF5;
text-transform:upperCase;
`;

export const SortWrapper = styled.div`
display: flex;
flex-flow: column;
color: #000000;
padding-right: 10px;
position: relative;
`;

export const SortIcon = styled.div`
position: relative;
`;

export const ArrowSortedDownIcon = styled(ArrowSortedDown)`
color: ${(props:SortIconProps) => props.isSelected ? '#000000' : '#A1A9B8'};
height: 20px;
position: absolute;
top: -2px;
`;

export const ArrowSortedUpIcon = styled(ArrowSortedUp)`
color: ${(props:SortIconProps) => props.isSelected ? '#000000' : '#A1A9B8'};
height: 20px;
position: absolute;
top: -12px;
`;