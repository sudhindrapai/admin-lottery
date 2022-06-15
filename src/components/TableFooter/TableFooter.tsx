import {FC} from 'react';
import {Wrapper, RecordsCount, Pagination, ChevronWrapper, PageNumber, ChevronRightIcon, ChevronLeftIcon} from './StyledTableFooter'

interface TableFooterProps{
    totalCount:number
    currentPageNumber:number
    updatePageNumber(pageNumber:number):void
}

const TableFooter:FC<TableFooterProps> = (props) => {
    const {totalCount, currentPageNumber, updatePageNumber} = props;

    const getLastRecordCount = (currentPageNumber:number) => {
        if (currentPageNumber === 1) {
            return totalCount > 10 ? 10 : totalCount
        } else {
            let endCount = (currentPageNumber*10);
            return totalCount > endCount ? endCount : totalCount
        }
    };

    let startRecordCount = 0;
    let endRecordCount = 0;

    if (currentPageNumber === 1) {
        startRecordCount = 1;
    } else {
        startRecordCount = (currentPageNumber * 10) - 10;
    }

    endRecordCount = getLastRecordCount(currentPageNumber);


    const onChangePageNumber = (isIncrease:boolean) => {
        let startPageNumber = 1,
            maxPageNumber = Math.ceil(totalCount/10),
            updatedPageNumber = currentPageNumber;
        
        if (startPageNumber === updatedPageNumber && isIncrease === false) {
            // below case is if current page number is 1 and user clicks on decrease page count
            updatedPageNumber = 1;
        } else if (maxPageNumber === updatedPageNumber && isIncrease === true) {
            // below case if if current page number is last page and user clicks on increase page count
            updatedPageNumber = currentPageNumber;
        } else {
            updatedPageNumber = isIncrease ? updatedPageNumber + 1 : updatedPageNumber - 1;
            updatePageNumber(updatedPageNumber);
        }
    };

    return <Wrapper>
        <RecordsCount>
            {startRecordCount} - {endRecordCount} of {totalCount}
        </RecordsCount>
        <Pagination>
            <ChevronWrapper onClick={() => {onChangePageNumber(false)}}>
                <ChevronLeftIcon />
            </ChevronWrapper>
            <PageNumber>
                {currentPageNumber}/ {Math.ceil(totalCount/10)}
            </PageNumber>
            <ChevronWrapper onClick={() => {onChangePageNumber(true)}}>
                <ChevronRightIcon />
            </ChevronWrapper>
        </Pagination>
    </Wrapper>
};

export default TableFooter