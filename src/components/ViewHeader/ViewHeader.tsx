import {FC} from 'react';
// import Button from '../UI/Buttons/Button';
import {Title, ArrowBackIcon} from './StyledViewHeader';
import {useNavigate} from 'react-router-dom';

interface ViewHeader{
    title: string,
    isNeedCreateButton?: boolean,
    btnText?: string
    routePath?: string,
    isBackButtonRequired?:boolean,
    backButtonRedirectionUrl?: string
}

const ViewHeader:FC<ViewHeader> = (props) => {
    const {title, isBackButtonRequired, backButtonRedirectionUrl} = props;
    const navigate = useNavigate();

    const redirectToView = (backArrowRedirectionUrl: string):void => {
        navigate(backArrowRedirectionUrl)
    };

    return<Title>
            {isBackButtonRequired && <ArrowBackIcon 
            onClick={() => {redirectToView(backButtonRedirectionUrl? backButtonRedirectionUrl:"")}} />}
            {title}
        </Title>
};

export default ViewHeader
