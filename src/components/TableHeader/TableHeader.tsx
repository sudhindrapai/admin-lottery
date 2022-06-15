import {FC, useMemo} from 'react';

import {LabelWrapper, SortWrapper, SortIcon, ArrowSortedDownIcon, ArrowSortedUpIcon} from './StyledTableHeader';
import {ArrowSortedDown} from '@styled-icons/typicons/ArrowSortedDown';
import {ArrowSortedUp} from '@styled-icons/typicons/ArrowSortedUp';

interface TableHeaders{
    label: string,
    isSortRequired:boolean
    isAscSorted:boolean,
    isDscSorted: boolean,
    id:string
}

interface TablehHeaderProps {
    headers:TableHeaders[],
    onToggleSort(id: string, isSortAsc: boolean):void
}

const TableHeader:FC<TablehHeaderProps> = (props) => {
    const {headers, onToggleSort} = props;

    let sortView = (isSortAsc:boolean, isDscSorted: boolean):JSX.Element => {
        return <SortIcon>
            <ArrowSortedUpIcon isSelected={isSortAsc} />
            <ArrowSortedDownIcon isSelected={isDscSorted} />
        </SortIcon>
    }

    return(<tr>
        {headers.map((headerObj) => {
            return <th>
                <LabelWrapper>
                    {headerObj.label}
                    <SortWrapper>
                        {headerObj.isSortRequired && sortView(headerObj.isAscSorted, headerObj.isDscSorted)}
                    </SortWrapper>
                    </LabelWrapper>
                </th>
        })}
    </tr>)
};

export default TableHeader